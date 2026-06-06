import { useState } from 'react';
import { registerFarmer } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    full_name: '', email: '', password: '', phone: '', location: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await registerFarmer(form);
      setMessage('Registered successfully! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage('Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌾 Farmer's Place</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Register</h3>

        {message && <p className="text-green-600 text-sm mb-4 text-center">{message}</p>}

        {['full_name','email','password','phone','location'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.replace('_', ' ').toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        ))}

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-2"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Have account? <Link to="/" className="text-green-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;