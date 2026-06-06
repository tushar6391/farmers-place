from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from soil.models import SoilRecord
from .models import FertilizerRecommendation
from .serializers import FertilizerSerializer

# Simple rule-based fertilizer logic
def get_fertilizer_suggestion(nitrogen, phosphorus, potassium):
    if nitrogen < 50:
        return ('Urea', '50kg per acre')
    elif phosphorus < 30:
        return ('Single Super Phosphate', '40kg per acre')
    elif potassium < 30:
        return ('Muriate of Potash', '30kg per acre')
    else:
        return ('NPK 10-26-26', '35kg per acre')


class FertilizerSuggestionView(APIView):
    def post(self, request):
        soil_record_id = request.data.get('soil_record_id')

        try:
            soil = SoilRecord.objects.get(id=soil_record_id)
        except SoilRecord.DoesNotExist:
            return Response(
                {'error': 'Soil record not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        fertilizer_name, quantity = get_fertilizer_suggestion(
            soil.nitrogen,
            soil.phosphorus,
            soil.potassium
        )

        recommendation = FertilizerRecommendation.objects.create(
            soil_record=soil,
            fertilizer_name=fertilizer_name,
            quantity=quantity
        )

        serializer = FertilizerSerializer(recommendation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)