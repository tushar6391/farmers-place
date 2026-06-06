import { useState } from 'react';
import { Link } from 'react-router-dom';
import { predictCrop, getFertilizer, submitSoil } from '../services/api';

function CropRecommendation() {
  const farmerId = localStorage.getItem('farmer_id');
  const [form, setForm] = useState({
    nitrogen: '', phosphorus: '', potassium: '',
    temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [result, setResult] = useState('');
  const [fertilizer, setFertilizer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePredict = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await predictCrop({ ...form, farmer_id: farmerId });
      setResult(res.data.recommended_crop);

      // Auto save soil record then get fertilizer
      const soilRes = await submitSoil({
        farmer: farmerId,
        nitrogen: form.nitrogen,
        phosphorus: form.phosphorus,
        potassium: form.potassium,
        ph: form.ph
      });
      console.log(soilRes.data)
      const fertRes = await getFertilizer({ soil_record_id: soilRes.data.id });
      setFertilizer(fertRes.data);
    } catch {
      setMessage('❌ Prediction failed. Fill all fields.');
    }
    setLoading(false);
  };

  const fields = [
    { name: 'nitrogen', label: 'Nitrogen (N)' },
    { name: 'phosphorus', label: 'Phosphorus (P)' },
    { name: 'potassium', label: 'Potassium (K)' },
    { name: 'temperature', label: 'Temperature (°C)' },
    { name: 'humidity', label: 'Humidity (%)' },
    { name: 'ph', label: 'Soil pH' },
    { name: 'rainfall', label: 'Rainfall (mm)' },
  ];

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

      <div className="px-8 py-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🌱 Crop Recommendation</h2>

        {message && <p className="mb-4 text-sm font-medium text-red-600">{message}</p>}

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Farm Details</h3>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm text-gray-600 mb-1">{f.label}</label>
                <input
                  type="number"
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder={f.label}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Get Recommendation'}
          </button>
        </div>

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-green-800 mb-1">Recommended Crop</h3>
            <p className="text-4xl font-bold text-green-700 capitalize mt-2">{result} 🌾</p>
          </div>
        )}

        {fertilizer && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Fertilizer Suggestion</h3>
            <p className="text-gray-700"><span className="font-medium">Fertilizer:</span> {fertilizer.fertilizer_name}</p>
            <p className="text-gray-700 mt-1"><span className="font-medium">Quantity:</span> {fertilizer.quantity}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommendation;