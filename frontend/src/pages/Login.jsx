import { loginFarmer } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const id = localStorage.getItem('farmer_id');
  if (id) navigate('/dashboard');
}, []);

const handleLogin = async () => {
    try {
      const res = await loginFarmer({ email, password });
      console.log('Login response:', res.data);
      localStorage.setItem('farmer_id', res.data.farmer_id);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
};

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌾 Farmer's Place</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Login</h3>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          No account? <Link to="/register" className="text-green-600 font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;