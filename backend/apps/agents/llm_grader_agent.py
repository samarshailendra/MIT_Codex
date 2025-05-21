import os
import json
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langchain.tools.retriever import create_retriever_tool
from langchain.agents import create_tool_calling_agent, AgentExecutor
from sentence_transformers import SentenceTransformer
from backend.core.faiss_retriever import create_faiss_retriever
from backend.apps.agents.agent_interfaces import FunctionalAgent, GradingTaskData


class LLMGraderAgent(FunctionalAgent):
    def __init__(self):
        self.embeddings_model = OpenAIEmbeddings(model="text-embedding-3-large")
        self.bert_model = SentenceTransformer("all-MiniLM-L6-v2")
        self.llm = ChatOpenAI(model="gpt-4.1-mini", temperature=0.5)
        self.base_system_prompt = self._build_base_prompt()

    def _build_base_prompt(self):
        return """
System Role: Auto Grading System

Purpose: You are a strict, rubric-based grading assistant.

Available Tools:
- Sample_answer: the ideal solution for this question.
- requires_grading: the student's submission for this question.

You are also given:
- The assignment question.
- The grading rubric for this question.

Grading Instructions:
1. Use the `Sample_answer` tool to fetch and understand the **ideal model answer**.
   - 📘 You MUST call this tool FIRST before grading.
   - Carefully study what a correct and complete response looks like.
   - Use this to **interpret the rubric** more effectively.

2. Use the `requires_grading` tool to retrieve the student’s submission.

3. Compare the student’s answer against the rubric:
   - ✅ Award marks ONLY for criteria explicitly listed.
   - ❌ Do NOT invent or infer your own criteria.
   - Apply deductions exactly as written in the rubric.

Scoring and Output:
- Return this exact JSON format:

{{
  "tasks": {{
    "Q{{question_id}}": [{{max_marks}}, {{awarded_marks}}, "feedback based on rubric"]
  }},
  "total_score": {{awarded_marks}}
}}

- Feedback must reference each rubric point directly.
- ❌ Do NOT include anything outside this JSON block.
"""

    def _extract_json_from_output(self, output_str):
        try:
            start = output_str.find("{")
            end = output_str.rfind("}") + 1
            return json.loads(output_str[start:end])
        except Exception as e:
            print(f"❌ Failed to parse JSON: {e}")
            return {}

    def run(self, task: GradingTaskData) -> GradingTaskData:
        assignment_text = task.extra_context.get("assignment_question", "")
        rubric_text = task.extra_context.get("rubric_text", "")
        question_id = task.question_id.lstrip("Qq")

        # Inject dynamic question_id into system prompt
        formatted_system = self.base_system_prompt.replace("{{question_id}}", question_id)
        prompt = ChatPromptTemplate.from_messages([
            ("system", formatted_system),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder("agent_scratchpad"),
        ])

        # Create tools
        sample_tool = create_retriever_tool(
            create_faiss_retriever(task.extra_context["sampleFile"], is_pdf=True),
            "Sample_answer",
            "The model solution to this question"
        )
        submission_tool = create_retriever_tool(
            create_faiss_retriever(task.extra_context["solutionFile"], is_pdf=True),
            "requires_grading",
            "The student's submission to be evaluated"
        )

        tools = [sample_tool, submission_tool]
        agent = create_tool_calling_agent(self.llm, tools, prompt)
        executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

        input_prompt = (
            f"Assignment Question:\n{assignment_text}\n\n"
            f"Rubric:\n{rubric_text}\n\n"
            f"Grade the student’s answer according to this rubric. Output JSON only."
        )

        response = executor.invoke({
            "input": input_prompt,
            "chat_history": [],
            "agent_scratchpad": "",
        })

        output = response.get("output", "")
        task.rationale = output
        task.parsed_result = self._extract_json_from_output(output)
        return task
