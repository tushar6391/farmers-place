import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getWeather } from '../services/api';

function Weather() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!location.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await getWeather(location);
      setData(res.data);
    } catch {
      setError('❌ Location not found. Try again.');
      setData(null);
    }
    setLoading(false);
  };

  const weatherIcons = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '⛅',
    'broken clouds': '☁️',
    'shower rain': '🌦️',
    'rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
  };

  const getIcon = (desc) => weatherIcons[desc] || '🌡️';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-700 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold">Farmer's Place</span>
        </div>
        <Link to="/dashboard" className="bg-white text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-100 transition">
          ← Dashboard
        </Link>
      </nav>

      <div className="px-8 py-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🌤️ Weather Monitor</h2>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter city name (e.g. Pune)"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {data && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-5xl mb-4">{getIcon(data.description)}</p>
            <h3 className="text-2xl font-bold text-gray-800">{data.location}</h3>
            <p className="text-6xl font-bold text-green-600 my-4">{data.temperature}°C</p>
            <p className="text-gray-500 capitalize mb-6">{data.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-600 font-semibold text-lg">{data.humidity}%</p>
                <p className="text-gray-500 mt-1">Humidity</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-600 font-semibold text-lg">{data.wind_speed} m/s</p>
                <p className="text-gray-500 mt-1">Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;