# backend/apps/agents/test_agent.py

from backend.apps.agents.agent_interfaces import FunctionalAgent
from backend.apps.agents.agent_interfaces import GradingTaskData

class TestAgent(FunctionalAgent):
    """
    A dummy agent to simulate full flow: receives input, returns mock grading.
    """

    def run(self, task: GradingTaskData) -> GradingTaskData:
        print("🔍 [TestAgent] Received:", GradingTaskData)
        # Instead of returning GradingTaskData, just mimic final output
        return task
