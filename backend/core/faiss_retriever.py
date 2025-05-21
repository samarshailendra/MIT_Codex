import os
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain.document_loaders import PyMuPDFLoader

from backend.core.file_loader import save_temp_file


def load_pdf_and_split(path: str, chunk_size=1000, overlap=200):
    """Loads and splits PDF into semantically coherent chunks."""
    loader = PyMuPDFLoader(path)
    raw_docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\n\n", "\n", ".", " ", ""],
    )
    split_docs = splitter.split_documents(raw_docs)
    return split_docs


def embed_documents(split_docs, model_name="text-embedding-3-large"):
    """Embeds documents using the specified OpenAI embedding model."""
    embeddings = OpenAIEmbeddings(model=model_name)
    return FAISS.from_documents(split_docs, embeddings)


def build_retriever(vectorstore, k=30, score_threshold=None):
    """Configures FAISS retriever with score filtering."""
    return vectorstore.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"k": k, "score_threshold": score_threshold}
    )


def create_faiss_retriever(uploaded_file, is_pdf=True, k=30, score_threshold=0.2):
    """
    Saves file, processes it, and returns a configured retriever.
    """
    suffix = ".pdf"
    path = save_temp_file(uploaded_file, suffix=suffix)

    try:
        split_docs = load_pdf_and_split(path)
        vectorstore = embed_documents(split_docs)
        retriever = build_retriever(vectorstore, k=k, score_threshold=score_threshold)
        return retriever
    finally:
        os.remove(path)
