from rest_framework import serializers
from .models import FertilizerRecommendation

class FertilizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FertilizerRecommendation
        fields = ['id', 'soil_record', 'fertilizer_name', 'quantity', 'suggested_at']
        extra_kwargs = {
            'suggested_at': {'read_only': True}
        }