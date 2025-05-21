# backend/apps/api/viewsets.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import PermissionDenied, ValidationError
from backend.apps.pipelines.service import run_workflow, available_workflows
from backend.apps.pipelines.service import grade_submission
from django.http import HttpResponse
from rest_framework.decorators import api_view

class GradingAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Handles file + form data

    def post(self, request):
        # Extract form fields and uploaded files
        fields = {key: value for key, value in request.POST.items()}
        files = {key: value for key, value in request.FILES.items()}

        combined_data = {
            "fields": fields,
            "files": files
        }

        # Allow frontend to specify the workflow
        workflow = fields.get("workflow", "test_workflow")
        print(f"⚙️ Running workflow: {workflow}")  # ✅ Log workflow name

        available = available_workflows()
        print(f"✅ Available workflows: {available}")

        if workflow not in available_workflows():
            raise PermissionDenied(f"Workflow '{workflow}' is not available.")

        try:
            # Agents handle validation and formatting; view just returns result
            result = grade_submission(combined_data)
            return Response(result, status=status.HTTP_200_OK)

        except ValidationError as ve:
            return Response({
                "status": "error",
                "errors": ve.detail
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "status": "error",
                "message": "Workflow execution failed.",
                "detail": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Optional: Keep for status check
def home(request):
    return HttpResponse("✅ Autograder backend is running.")




@api_view(["GET"])
def list_workflows(request):
    return Response({
        "status": "success",
        "workflows": available_workflows()
    })
