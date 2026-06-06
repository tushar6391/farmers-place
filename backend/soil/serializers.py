from rest_framework import serializers
from .models import SoilRecord

class SoilRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilRecord
        fields = ['id', 'farmer', 'nitrogen', 'phosphorus', 'potassium', 'ph', 'recorded_at']
        extra_kwargs = {
            'recorded_at': {'read_only': True}
        }