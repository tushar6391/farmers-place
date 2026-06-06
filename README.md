# 🌾 Farmer's Place – Smart Agriculture Assistant Platform

A full-stack web application that helps farmers make data-driven decisions using Machine Learning.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Django REST Framework |
| Admin | PHP |
| Database | MySQL, MongoDB |
| ML | Python, Scikit-Learn, Random Forest |

## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- 🧪 Soil Analysis & History
- 🌱 ML-based Crop Recommendation (99.3% accuracy)
- 🧴 Fertilizer Suggestion System
- 🌤️ Real-time Weather Monitoring
- 📊 PHP Admin Dashboard

## 🗂️ Project Structure

\`\`\`
farmers-place/
├── backend/          # Django REST API
├── frontend/         # React.js App
├── admin_php/        # PHP Admin Panel
└── ml_models/        # ML Training Scripts
\`\`\`

## ⚙️ Setup Instructions

### Backend
\`\`\`bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

### Admin Panel
- Copy `admin_php/` to `C:\xampp\htdocs\`
- Visit `http://localhost/admin_php/login.php`
- Credentials: admin / admin123

### ML Model
\`\`\`bash
cd ml_models
python train_model.py
\`\`\`

## 🔑 Environment Variables

Create `backend/.env`:
\`\`\`
SECRET_KEY=your-secret-key
DB_NAME=farmers_place_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=3306
WEATHER_API_KEY=your-openweather-key
MONGO_URI=mongodb://localhost:27017/
MONGO_DB=farmers_place_mongo
\`\`\`

## 📸 Screenshots
login_page.png


## 👨‍💻 Author

**Tushar Kumar**  
Computer Science (Data Science) – SPIT Mumbai
