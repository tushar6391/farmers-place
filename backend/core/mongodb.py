from pymongo import MongoClient
import os

client = MongoClient(os.getenv('MONGO_URI'))
db = client[os.getenv('MONGO_DB')]

prediction_logs = db['prediction_logs']
weather_history = db['weather_history']