from django.db import models
from farmers.models import Farmer

class WeatherLog(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    location = models.CharField(max_length=100, blank=True, null=True)
    temperature = models.FloatField(blank=True, null=True)
    humidity = models.FloatField(blank=True, null=True)
    rainfall = models.FloatField(blank=True, null=True)
    logged_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Weather - {self.location}"