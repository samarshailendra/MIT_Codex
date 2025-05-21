from backend.apps.agents.agent_interfaces import InputAgent, GradingTaskData
from backend.core.file_loader import load_pdf_content_as_string

class DefaultInputAgent(InputAgent):
    def run(self, input_data: dict) -> GradingTaskData:
        # Load required textual content from PDFs
        student_answer = load_pdf_content_as_string(input_data["solutionFile"])
        reference_answer = load_pdf_content_as_string(input_data["sampleFile"])
        
        # Validate all required files are present
        required_keys = ["solutionFile", "sampleFile", "rubricsFile", "assignmentFile"]
        for key in required_keys:
            if key not in input_data:
                raise ValueError(f"Missing required file: {key}")

        return GradingTaskData(
            student_id="auto_generated_id",
            question_id="q_all",
            answer_text=student_answer,
            reference_answer=reference_answer,
            rubric=None,
            extra_context={
                "solutionFile": input_data["solutionFile"],
                "sampleFile": input_data["sampleFile"],
                "rubricsFile": input_data["rubricsFile"],
                "assignmentFile": input_data["assignmentFile"],
                "grader_name": input_data.get("grader_name", "Anonymous"),
            }
        )
