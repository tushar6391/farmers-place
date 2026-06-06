from django.urls import path
from .views import RegisterFarmerView
from .views import RegisterFarmerView, LoginFarmerView, FarmerProfileView

urlpatterns = [
    path('register/', RegisterFarmerView.as_view(), name='register-farmer'),
    path('login/', LoginFarmerView.as_view(), name='login-farmer'),
    path('<int:farmer_id>/profile/', FarmerProfileView.as_view(), name='farmer-profile'),
]