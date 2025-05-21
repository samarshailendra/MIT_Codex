from django.urls import path
from django.contrib import admin
from backend.apps.api.viewsets import GradingAPIView, home, list_workflows

urlpatterns = [
    path('', home),  # Health check
    path('admin/', admin.site.urls),

    # API endpoint for grading
    path('api/grade/', GradingAPIView.as_view(), name='api_grade'),

    # Endpoind to get available workflows
    path('api/workflows/', list_workflows, name='api_workflows'),    
]
