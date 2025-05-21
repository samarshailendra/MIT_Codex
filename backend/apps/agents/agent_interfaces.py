from abc import ABC, abstractmethod

class GradingTaskData:
    """
    Shared object passed between agents in the pipeline.
    Holds all relevant grading state.
    """
    def __init__(
        self,
        student_id,
        question_id,
        answer_text,
        reference_answer=None,
        rubric=None,
        extra_context=None
    ):
        self.student_id = student_id
        self.question_id = question_id
        self.answer_text = answer_text
        self.reference_answer = reference_answer
        self.rubric = rubric
        self.similarity_score = None
        self.similarity_bert = None              
        self.similarity_cosine = None            
        self.grade = None
        self.rationale = None
        self.bias_flag = None
        self.extra_context = extra_context or {}

    def to_dict(self):
        """Convert to full dictionary including internal fields."""
        def safe_value(v):
            if isinstance(v, bytes):
                return v.decode("utf-8", errors="replace")
            elif hasattr(v, 'name'):
                return f"<file: {v.name}>"
            elif hasattr(v, '__str__'):
                return str(v)
            return v

        return {
            "student_id": self.student_id,
            "question_id": self.question_id,
            "answer_text": self.answer_text,
            "reference_answer": self.reference_answer,
            "rubric": self.rubric,
            "similarity_score": self.similarity_score,
            "similarity_bert": self.similarity_bert,
            "similarity_cosine": self.similarity_cosine,
            "grade": self.grade,
            "rationale": self.rationale,
            "bias_flag": self.bias_flag,
            "extra_context": {
                k: safe_value(v)
                    for k, v in self.extra_context.items()
                }
    }

    def to_public_dict(self):
        """Return frontend-safe dictionary output."""
        return {
            "student_id": self.student_id,
            "question_id": self.question_id,
            "grade": self.grade,
            "rationale": self.rationale,
            "similarity_score": round(self.similarity_score or 0, 2),
            "bias_flag": self.bias_flag
        }

    @classmethod
    def from_dict(cls, data: dict):
        """Reconstruct a GradingTaskData from a dictionary."""
        task = cls(
            student_id=data.get("student_id"),
            question_id=data.get("question_id"),
            answer_text=data.get("answer_text"),
            reference_answer=data.get("reference_answer"),
            rubric=data.get("rubric"),
            extra_context=data.get("extra_context", {})
        )
        task.similarity_score = data.get("similarity_score")
        task.similarity_bert = data.get("similarity_bert")        
        task.similarity_cosine = data.get("similarity_cosine")    
        task.grade = data.get("grade")
        task.rationale = data.get("rationale")
        task.bias_flag = data.get("bias_flag")
        return task


# Agent interfaces

class InputAgent(ABC):
    """Agent that takes raw input dict and returns GradingTaskData"""
    @abstractmethod
    def run(self, input_data: dict) -> GradingTaskData:
        pass


class FunctionalAgent(ABC):
    """Standard processing agents"""
    @abstractmethod
    def run(self, task: GradingTaskData) -> GradingTaskData:
        pass


class OutputAgent(ABC):
    """Agent that converts GradingTaskData into full internal dictionary"""
    @abstractmethod
    def run(self, task: GradingTaskData) -> dict:
        pass


class PublicOutputAgent(ABC):
    """Agent that converts GradingTaskData into a frontend-safe public dictionary"""
    @abstractmethod
    def run(self, task: GradingTaskData) -> dict:
        pass
