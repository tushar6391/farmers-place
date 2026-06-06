from django.db import models
from farmers.models import Farmer

class SoilRecord(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    nitrogen = models.FloatField()
    phosphorus = models.FloatField()
    potassium = models.FloatField()
    ph = models.FloatField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Soil Record - {self.farmer.full_name}"