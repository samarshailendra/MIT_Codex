import os
import json
from backend.core.file_loader import (
    save_temp_file, split_pdf_by_question,
    extract_questions_from_pdf, extract_rubric_sections
)
from backend.apps.agents.agent_interfaces import FunctionalAgent, GradingTaskData
from backend.apps.agents.llm_grader_agent import LLMGraderAgent


class GradingAgent(FunctionalAgent):
    def __init__(self):
        self.llm_agent = LLMGraderAgent()

    def run(self, task: GradingTaskData) -> GradingTaskData:
        solution_path = save_temp_file(task.extra_context["solutionFile"], suffix=".pdf")
        sample_path = save_temp_file(task.extra_context["sampleFile"], suffix=".pdf")
        assignment_path = save_temp_file(task.extra_context["assignmentFile"], suffix=".pdf")
        rubric_path = save_temp_file(task.extra_context["rubricsFile"], suffix=".pdf")

        solution_chunks = split_pdf_by_question(solution_path, prefix="student")
        sample_chunks = split_pdf_by_question(sample_path, prefix="sample")

        assignment_questions = extract_questions_from_pdf(assignment_path)
        rubric_entries = extract_rubric_sections(rubric_path)

        total_score = 0
        task_results = {}

        grade_all = task.extra_context.get("grade_all", True)

        for i, (student_pdf, sample_pdf) in enumerate(zip(solution_chunks, sample_chunks), start=1):
            question_id = f"Q{i}"
            print(f"🔍 Grading {question_id}")

            assignment_qtext = assignment_questions.get(question_id, "")
            rubric_qtext = rubric_entries.get(question_id, "")

            if grade_all or i == 2:
                with open(student_pdf, "rb") as sf, open(sample_pdf, "rb") as smf:
                    sub_task = GradingTaskData(
                        student_id=task.student_id,
                        question_id=question_id,
                        answer_text="",
                        reference_answer=None,
                        rubric=None,
                        extra_context={
                            "solutionFile": sf,
                            "sampleFile": smf,
                            "assignment_question": assignment_qtext.strip(),
                            "rubric_text": rubric_qtext.strip(),
                            "grader_name": task.extra_context.get("grader_name", "Anonymous")
                        }
                    )
                    sub_result = self.llm_agent.run(sub_task)

                parsed = self._parse_llm_json(sub_result.rationale)
                score_info = parsed.get("tasks", {}).get(question_id, [10, 0, "No valid JSON returned"])
            else:
                score_info = [10, 9, f"⚠️ Mock result for {question_id}."]

            total_score += score_info[1]
            task_results[question_id] = score_info

        task.rationale = json.dumps({
            "tasks": task_results,
            "total_score": total_score
        }, indent=2)
        task.grade = total_score
        return task

    def _parse_llm_json(self, output_str):
        try:
            start = output_str.find("{")
            end = output_str.rfind("}") + 1
            return json.loads(output_str[start:end])
        except Exception as e:
            print(f"❌ Failed to parse JSON: {e}")
            return {}
