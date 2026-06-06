import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SoilAnalysis from './pages/SoilAnalysis';
import CropRecommendation from './pages/CropRecommendation';
import Weather from './pages/Weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/soil" element={<SoilAnalysis />} />
        <Route path="/crop" element={<CropRecommendation />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;