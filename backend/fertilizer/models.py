from django.db import models
from soil.models import SoilRecord

class FertilizerRecommendation(models.Model):
    soil_record = models.ForeignKey(SoilRecord, on_delete=models.CASCADE)
    fertilizer_name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50, blank=True, null=True)
    suggested_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fertilizer_name