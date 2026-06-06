from django.urls import path
from .views import FertilizerSuggestionView

urlpatterns = [
    path('suggest/', FertilizerSuggestionView.as_view(), name='fertilizer-suggest'),
]