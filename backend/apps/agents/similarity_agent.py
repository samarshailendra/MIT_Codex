from backend.apps.agents.agent_interfaces import FunctionalAgent, GradingTaskData
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class SimilarityScoringAgent(FunctionalAgent):
    def __init__(self):
        self.bert_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.vectorizer = TfidfVectorizer()

    def run(self, task: GradingTaskData) -> GradingTaskData:
        student_answer = task.answer_text
        ideal_answer = task.reference_answer

        # Compute BERT similarity
        bert_embeddings = self.bert_model.encode([student_answer, ideal_answer], convert_to_tensor=True)
        bert_sim = util.pytorch_cos_sim(bert_embeddings[0], bert_embeddings[1]).item()

        # Compute cosine similarity
        tfidf_matrix = self.vectorizer.fit_transform([student_answer, ideal_answer])
        cosine_sim = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]

        task.similarity_score = (bert_sim + cosine_sim) / 2
        task.similarity_bert = round(bert_sim, 4)
        task.similarity_cosine = round(cosine_sim, 4)

        # Fail early if similarity is too low
        if bert_sim < 0.2 or cosine_sim < 0.2:
            task.rationale = "Submission appears unrelated to the expected subject."
            task.grade = 0
            task.extra_context["grading_skipped"] = True

        return task
