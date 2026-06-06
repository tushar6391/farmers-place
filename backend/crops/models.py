from django.db import models

class Crop(models.Model):
    name = models.CharField(max_length=100)
    season = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name