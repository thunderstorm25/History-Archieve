import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios directly

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);  
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' }, 
      });
      
      console.log('Registration response:', response.data);
      navigate('/login');  // Redirect after successful registration
    } catch (err) {
      console.log('Registration error:', err.response ? err.response.data : err.message);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);  // Re-enable submit button after request
    }
  };

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
        {/* App name */}
        <Link to="/" className="text-white text-xl font-bold">
          Monument Archive
        </Link>
      </nav>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
