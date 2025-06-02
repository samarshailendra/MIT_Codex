# 🧠 Autograder Backend

This is the backend for an agentic autograding system built with Django, LangChain, OpenAI, and FAISS. It allows automated grading of student submissions based on similarity to ideal answers and evaluation rubrics.

---

## 🚀 Features

- Upload assignments, sample answers, rubrics, and student submissions
- Uses LLM agents to assess and grade submissions
- Built with modular apps: `api`, `grading`, `agents`, `pipelines`
- Tracks grader info, similarity metrics, and LLM-generated feedback
- Built-in HTML interface for form upload and grading results
- Easy to extend for REST APIs, frontend, or CI/CD workflows

---

## 🛠️ Installation & Setup (Backend)

Clone and run the backend in 6 steps:

```bash
# 1. Clone the repo and go to backend
git clone https://github.com/yourusername/autograder-backend.git
cd autograder-backend/backend

# 2. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install all required dependencies
pip install -r requirements.txt

# 4. Apply database migrations
python manage.py makemigrations grading
python manage.py migrate

# 5. (Optional) Create an admin user
python manage.py createsuperuser

# 6. Run the server from the root folder on port 8080
cd ..
PYTHONPATH=$(pwd) python backend/manage.py runserver 8080

