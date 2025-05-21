from django.db import models

class Grading(models.Model):
    description = models.TextField()
    grader_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    similarity_bert = models.FloatField(null=True, blank=True)
    similarity_cosine = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.grader_name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"