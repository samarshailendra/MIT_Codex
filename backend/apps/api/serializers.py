from rest_framework import serializers
from backend.apps.grading.models import Grading

class GradingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grading
        fields = "__all__"


class GradingRequestSerializer(serializers.Serializer):
    fields = serializers.DictField(child=serializers.CharField())
    files = serializers.DictField(child=serializers.FileField(), required=False)