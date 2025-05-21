import os
from typing import Dict, List, Any
import tempfile
from django.conf import settings
from langchain.document_loaders import PyMuPDFLoader
from langchain.vectorstores import FAISS
from langchain_openai.embeddings import OpenAIEmbeddings
import fitz  # PyMuPDF
import re


def save_temp_file(uploaded_file, suffix=".pdf") -> str:
    """
    Handles both Django UploadedFile and raw file objects like open("file.pdf", "rb")
    """
    with tempfile.NamedTemporaryFile(delete=False, dir=settings.MEDIA_ROOT, suffix=suffix) as temp_file:
        if hasattr(uploaded_file, "chunks"):
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)
        else:
            temp_file.write(uploaded_file.read())
    return temp_file.name

def load_pdf_content_as_string(uploaded_file) -> str:
    """
    Extracts and returns all text from a PDF as a single string.
    """
    path = save_temp_file(uploaded_file, suffix=".pdf")
    try:
        docs = PyMuPDFLoader(path).load()
    finally:
        os.remove(path)
    return " ".join([doc.page_content for doc in docs])

def split_pdf_by_question(pdf_path, output_dir=None, prefix="question", pattern=r'Question\s+\d+'):

    if output_dir is None:
        output_dir = tempfile.mkdtemp()

    os.makedirs(output_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    question_markers = []

    for i, page in enumerate(doc):
        text = page.get_text()
        for match in re.finditer(pattern, text):
            question_markers.append((i, match.start()))

    # Edge case: Only one match or no match
    if not question_markers:
        return [pdf_path]

    question_markers.append((len(doc), float("inf")))

    output_paths = []
    for idx in range(len(question_markers) - 1):
        start_page, _ = question_markers[idx]
        end_page, _ = question_markers[idx + 1]

        new_doc = fitz.open()
        for page_num in range(start_page, end_page):
            new_doc.insert_pdf(doc, from_page=page_num, to_page=page_num)
        out_path = os.path.join(output_dir, f"{prefix}_Q{idx+1}.pdf")
        new_doc.save(out_path)
        output_paths.append(out_path)

    return output_paths



def extract_questions_from_pdf(pdf_path: str) -> Dict[str, str]:
    with fitz.open(pdf_path) as doc:
        full_text = "\n".join(page.get_text() for page in doc)

    full_text = re.sub(r"Question[:_]*\s*(\d+)", r"Question_\1:", full_text)
    pattern = r"(Question_\d+:.*?)(?=Question_\d+:|\Z)"
    matches = re.findall(pattern, full_text, re.DOTALL)

    questions = {}
    for block in matches:
        match = re.match(r"(Question_\d+):", block)
        if match:
            q_number = match.group(1)
            question_text = block.strip()
            questions[q_number] = question_text

    return questions

def extract_rubric_sections(pdf_path: str) -> Dict[str, str]:
    """
    Extracts rubric guidelines from a rubric-style PDF and returns a dictionary:
    {
        'Q1': 'rubric text for question 1',
        'Q2': 'rubric text for question 2',
        ...
        'Q11': 'rubric text for references'
    }
    """
    # Load PDF and extract text
    with fitz.open(pdf_path) as doc:
        full_text = "\n".join(page.get_text() for page in doc)

    # Normalize "References" to look like a numbered question
    full_text = re.sub(r"\n\s*References\s*", "\n11\n", full_text)

    # Split on lines that are only numbers (e.g. question numbers)
    pattern = re.split(r"\n\s*(\d{1,2})\s*\n", full_text)

    rubrics: Dict[str, str] = {}
    for i in range(1, len(pattern), 2):
        qnum = pattern[i].strip()
        rtext = pattern[i + 1].strip() if i + 1 < len(pattern) else ""
        rubrics[f"Q{qnum}"] = rtext

    # Sort the output dictionary by question number
    rubrics_sorted = {k: rubrics[k] for k in sorted(rubrics, key=lambda x: int(x[1:]))}
    return rubrics_sorted