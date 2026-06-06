from django.urls import path
from .views import CropPredictionView

urlpatterns = [
    path('predict-crop/', CropPredictionView.as_view(), name='predict-crop'),
]