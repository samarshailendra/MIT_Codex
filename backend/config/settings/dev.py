from .base import *

DEBUG = True

INSTALLED_APPS += [
    'corsheaders',
]

MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')

CORS_ALLOW_ALL_ORIGINS = True  # Only for development!

ALLOWED_HOSTS = ["10.10.60.40", "localhost", "127.0.0.1"]


print("✅ Using DEV settings")
