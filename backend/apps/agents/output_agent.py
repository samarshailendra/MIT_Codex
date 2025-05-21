from backend.apps.agents.agent_interfaces import OutputAgent, PublicOutputAgent, GradingTaskData

class FinalInternalOutputAgent(OutputAgent):
    def run(self, task: GradingTaskData) -> dict:
        return {
            "description": task.rationale,
            "grader_name": task.extra_context.get("grader_name", "Anonymous"),
            "similarity_bert": task.similarity_bert,
            "similarity_cosine": task.similarity_cosine,
        }

class FinalPublicOutputAgent(PublicOutputAgent):
    def run(self, task: GradingTaskData) -> dict:
        return {
            "student_id": task.student_id,
            "question_id": task.question_id,
            "grade": task.grade,
            "rationale": task.rationale,
            "similarity_score": round(task.similarity_score or 0, 2),
            "bias_flag": task.bias_flag
        }

class TestOutputAgent(PublicOutputAgent):
    def run(self, task: GradingTaskData) -> dict:
        return task.to_dict()