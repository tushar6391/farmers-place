from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SoilRecord
from .serializers import SoilRecordSerializer

class SubmitSoilDataView(APIView):
    def post(self, request):
        serializer = SoilRecordSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SoilHistoryView(APIView):
    def get(self, request, farmer_id):
        records = SoilRecord.objects.filter(farmer_id=farmer_id)
        serializer = SoilRecordSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)