from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Farmer
from .serializers import FarmerSerializer
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

class RegisterFarmerView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = FarmerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Farmer registered successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginFarmerView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            farmer = Farmer.objects.get(email=email)
        except Farmer.DoesNotExist:
            return Response(
                {'error': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        print(f"Input password: {password}")
        print(f"Stored hash: {farmer.password}")
        print(f"Match: {check_password(password, farmer.password)}")
        if check_password(password, farmer.password):
            # Manual token generation without Django auth user
            refresh = RefreshToken()
            refresh['farmer_id'] = farmer.id
            refresh['email'] = farmer.email

            return Response({
                'message': 'Login successful',
                'farmer_id': farmer.id,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )

class FarmerProfileView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, farmer_id):
        try:
            farmer = Farmer.objects.get(id=farmer_id)
        except Farmer.DoesNotExist:
            return Response(
                {'error': 'Farmer not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = FarmerSerializer(farmer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, farmer_id):
        try:
            farmer = Farmer.objects.get(id=farmer_id)
        except Farmer.DoesNotExist:
            return Response(
                {'error': 'Farmer not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = FarmerSerializer(farmer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Profile updated successfully'},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        