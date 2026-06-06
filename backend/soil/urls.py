from django.urls import path
from .views import SubmitSoilDataView, SoilHistoryView

urlpatterns = [
    path('submit/', SubmitSoilDataView.as_view(), name='submit-soil'),
    path('<int:farmer_id>/history/', SoilHistoryView.as_view(), name='soil-history'),
]