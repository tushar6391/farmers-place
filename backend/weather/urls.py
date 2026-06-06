from django.urls import path
from .views import CurrentWeatherView

urlpatterns = [
    path('<str:location>/', CurrentWeatherView.as_view(), name='current-weather'),
]