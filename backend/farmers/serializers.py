from rest_framework import serializers
from .models import Farmer

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = ['id', 'full_name', 'email', 'password', 'phone', 'location']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        from django.contrib.auth.hashers import make_password
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)