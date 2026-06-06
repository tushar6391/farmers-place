import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile } from '../services/api';

function Dashboard() {
  const [farmer, setFarmer] = useState(null);
  const navigate = useNavigate();
  const farmerId = localStorage.getItem('farmer_id');

  useEffect(() => {
    if (!farmerId) { navigate('/'); return; }
    getProfile(farmerId)
      .then(res => setFarmer(res.data))
      .catch(() => navigate('/'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('farmer_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
};
  
  if (!farmer) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold tracking-wide">Farmer's Place</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/soil" className="hover:text-green-200 transition">Soil</Link>
          <Link to="/crop" className="hover:text-green-200 transition">Crops</Link>
          <Link to="/weather" className="hover:text-green-200 transition">Weather</Link>
          <button onClick={handleLogout} className="bg-white text-green-700 px-4 py-1.5 rounded-full hover:bg-green-100 transition font-semibold">
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Banner */}
      <div className="bg-green-600 text-white px-8 py-10">
        <h1 className="text-3xl font-bold">Welcome back, {farmer.full_name} 👋</h1>
        <p className="text-green-100 mt-1">Here's your farm overview for today.</p>
      </div>

      {/* Cards */}
      <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/soil" className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500 hover:shadow-md transition">
          <div className="text-3xl mb-3">🧪</div>
          <h3 className="text-lg font-semibold text-gray-800">Soil Analysis</h3>
          <p className="text-gray-500 text-sm mt-1">Submit soil data and view history</p>
        </Link>

        <Link to="/crop" className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500 hover:shadow-md transition">
          <div className="text-3xl mb-3">🌱</div>
          <h3 className="text-lg font-semibold text-gray-800">Crop Recommendation</h3>
          <p className="text-gray-500 text-sm mt-1">Get ML-based crop suggestions</p>
        </Link>

        <Link to="/weather" className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500 hover:shadow-md transition">
          <div className="text-3xl mb-3">🌤️</div>
          <h3 className="text-lg font-semibold text-gray-800">Weather Monitor</h3>
          <p className="text-gray-500 text-sm mt-1">Check current weather conditions</p>
        </Link>
      </div>

      {/* Profile Info */}
      <div className="px-8">
        <div className="bg-white rounded-xl shadow p-6 max-w-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Profile</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium text-gray-800">Email:</span> {farmer.email}</p>
            <p><span className="font-medium text-gray-800">Phone:</span> {farmer.phone || 'Not set'}</p>
            <p><span className="font-medium text-gray-800">Location:</span> {farmer.location || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;