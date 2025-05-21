#!/usr/bin/env python
import os
import sys
import dotenv

dotenv.load_dotenv()  # Loads .env


python_path = os.getenv("PYTHONPATH")
if python_path:
    sys.path.insert(0, os.path.abspath(python_path))

# No sys.path.append needed — we'll trust PYTHONPATH to be set correctly
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    os.getenv("DJANGO_SETTINGS_MODULE", "backend.config.settings.dev")
)

print("✅ PYTHONPATH =", os.getenv("PYTHONPATH"))
print("✅ sys.path =", sys.path)
print("✅ DJANGO_SETTINGS_MODULE =", os.getenv("DJANGO_SETTINGS_MODULE"))


if __name__ == "__main__":
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Couldn't import Django. Are you in a virtual environment?") from exc
    execute_from_command_line(sys.argv)
