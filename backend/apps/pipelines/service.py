from typing import Dict, List, Any

from backend.apps.agents.input_agent import DefaultInputAgent
from backend.apps.agents.grading_agent import GradingAgent  
from backend.apps.agents.output_agent import FinalInternalOutputAgent, FinalPublicOutputAgent, TestOutputAgent
from backend.apps.agents.similarity_agent import SimilarityScoringAgent

from backend.apps.agents.agent_interfaces import (
    GradingTaskData,
    InputAgent,
    FunctionalAgent,
    OutputAgent,
    PublicOutputAgent
)
from backend.apps.agents.test_agent import TestAgent

# -------------------------------------------------------------------
# STEP 1: Define your hard-coded workflows here
# -------------------------------------------------------------------
_workflows: Dict[str, List[Any]] = {
    "internal_review": [
        DefaultInputAgent(),
        SimilarityScoringAgent(),
        GradingAgent(),
        FinalInternalOutputAgent(),
    ],
    "student_view": [
        DefaultInputAgent(),
        SimilarityScoringAgent(),
        GradingAgent(),
        FinalPublicOutputAgent(),
    ],
    "test_view": [
        DefaultInputAgent(),
        TestAgent(),
        TestOutputAgent(),
    ]
}


class PipelineError(Exception):
    """Custom exception for pipeline issues."""
    pass


# -------------------------------------------------------------------
# STEP 2: Run a single workflow by name
# -------------------------------------------------------------------
def run_workflow(name: str, raw_input: dict) -> dict:
    """
    Executes exactly one named workflow.
    Raises PipelineError if the workflow does not exist.
    """
    if name not in _workflows:
        raise PipelineError(f"Unknown workflow: {name}")

    pipeline = _workflows[name]
    first = pipeline[0]
    if not isinstance(first, InputAgent):
        raise PipelineError(f"Workflow '{name}' must start with an InputAgent")

    task: GradingTaskData = first.run(raw_input)

    for agent in pipeline[1:]:
        if isinstance(agent, FunctionalAgent):
            task = agent.run(task)

            # 🚨 Skip rest of pipeline if grading was flagged to be skipped
            if task.extra_context.get("grading_skipped", False):
                return {
                    "grading_skipped": True,
                    "rationale": task.rationale,
                    "similarity_bert": task.extra_context.get("similarity_bert"),
                    "similarity_cosine": task.extra_context.get("similarity_cosine")
                }

        elif isinstance(agent, (OutputAgent, PublicOutputAgent)):
            return agent.run(task)
        else:
            raise PipelineError(
                f"Unsupported agent type '{type(agent).__name__}' in workflow '{name}'"
            )

    return task.to_public_dict()


# -------------------------------------------------------------------
# STEP 3: Run all workflows at once (optional)
# -------------------------------------------------------------------
def run_workflows(raw_input: dict) -> Dict[str, dict]:
    results: Dict[str, dict] = {}
    for name in _workflows:
        results[name] = run_workflow(name, raw_input)
    return results


# -------------------------------------------------------------------
# STEP 4: List available workflows
# -------------------------------------------------------------------
def available_workflows() -> List[str]:
    return list(_workflows.keys())


# -------------------------------------------------------------------
# Optional: Entry point for viewsets. Here it is reducdant by calling the run_workflow directly inside the viewset and handing over data preparation to InputAgent.
# -------------------------------------------------------------------
def grade_submission(raw_input: dict) -> dict:
    """
    Args:
        raw_input (dict): Must contain 'files' and 'fields' keys from frontend
    """
    try:
        files = raw_input["files"]
        fields = raw_input["fields"]

        grader_name = fields.get("graderName", "Anonymous")
        workflow_name = fields.get("workflow", "internal_review")

        clean_input = {
            "grader_name": grader_name,
            "solutionFile": files["solutionFile"],
            "sampleFile": files["sampleFile"],
            "assignmentFile": files["assignmentFile"],
            "rubricsFile": files["rubricsFile"],
        }

        return run_workflow(workflow_name, clean_input)

    except KeyError as e:
        return {"error": f"Missing required file: {str(e)}"}
    except PipelineError as e:
        return {"error": str(e)}
