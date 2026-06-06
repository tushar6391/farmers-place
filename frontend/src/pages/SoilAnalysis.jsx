import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { submitSoil, getSoilHistory } from '../services/api';

function SoilAnalysis() {
  const farmerId = localStorage.getItem('farmer_id');
  const navigate = useNavigate();
  const [form, setForm] = useState({ nitrogen: '', phosphorus: '', potassium: '', ph: '' });
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await submitSoil({ ...form, farmer: farmerId });
      setMessage('✅ Soil data submitted successfully!');
      setForm({ nitrogen: '', phosphorus: '', potassium: '', ph: '' });
    } catch {
      setMessage('❌ Submission failed. Try again.');
    }
  };

  const loadHistory = async () => {
    try {
      const res = await getSoilHistory(farmerId);
      setHistory(res.data);
      setShowHistory(true);
    } catch {
      setMessage('❌ Could not load history.');
    }
  };

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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🧪 Soil Analysis</h2>

        {message && <p className="mb-4 text-sm font-medium text-green-700">{message}</p>}

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Submit Soil Data</h3>
          <div className="grid grid-cols-2 gap-4">
            {['nitrogen', 'phosphorus', 'potassium', 'ph'].map((field) => (
              <div key={field}>
                <label className="block text-sm text-gray-600 mb-1 capitalize">{field}</label>
                <input
                  type="number"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Submit
          </button>
        </div>

        <button
          onClick={loadHistory}
          className="w-full border-2 border-green-600 text-green-700 py-2 rounded-lg hover:bg-green-50 transition font-medium mb-6"
        >
          View Soil History
        </button>

        {showHistory && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Soil History</h3>
            {history.length === 0 ? <p className="text-gray-500 text-sm">No records found.</p> : (
              <div className="space-y-3">
                {history.map((r) => (
                  <div key={r.id} className="border border-gray-100 rounded-lg p-4 text-sm text-gray-700">
                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="font-medium">N:</span> {r.nitrogen}</p>
                      <p><span className="font-medium">P:</span> {r.phosphorus}</p>
                      <p><span className="font-medium">K:</span> {r.potassium}</p>
                      <p><span className="font-medium">pH:</span> {r.ph}</p>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">{new Date(r.recorded_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SoilAnalysis;