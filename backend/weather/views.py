from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import os

API_KEY = os.getenv('WEATHER_API_KEY')
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

class CurrentWeatherView(APIView):
    def get(self, request, location):
        try:
            response = requests.get(BASE_URL, params={
                'q': location,
                'appid': API_KEY,
                'units': 'metric'
            })

            if response.status_code == 404:
                return Response(
                    {'error': 'Location not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            data = response.json()
            print(data)  # temporary debug line

            weather_data = {
                'location': data['name'],
                'temperature': data['main']['temp'],
                'humidity': data['main']['humidity'],
                'description': data['weather'][0]['description'],
                'wind_speed': data['wind']['speed']
            }

            return Response(weather_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )