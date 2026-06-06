from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import joblib
import numpy as np
import os
from datetime import datetime
from core.mongodb import prediction_logs

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, 'ml_models', 'crop_model.pkl')
model = joblib.load(model_path)

class CropPredictionView(APIView):
    def post(self, request):
        try:
            data = request.data
            features = np.array([[
                data['nitrogen'],
                data['phosphorus'],
                data['potassium'],
                data['temperature'],
                data['humidity'],
                data['ph'],
                data['rainfall']
            ]])

            prediction = model.predict(features)
            crop = prediction[0]

            # Save to MongoDB
            prediction_logs.insert_one({
                'farmer_id': data.get('farmer_id'),
                'input': {
                    'nitrogen': data['nitrogen'],
                    'phosphorus': data['phosphorus'],
                    'potassium': data['potassium'],
                    'temperature': data['temperature'],
                    'humidity': data['humidity'],
                    'ph': data['ph'],
                    'rainfall': data['rainfall']
                },
                'predicted_crop': crop,
                'timestamp': datetime.utcnow()
            })

            return Response(
                {'recommended_crop': crop},
                status=status.HTTP_200_OK
            )
        except KeyError as e:
            return Response(
                {'error': f'Missing field: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )