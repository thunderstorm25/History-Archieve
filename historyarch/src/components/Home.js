import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to Monument Archive</h1>
        <p className="text-gray-600 mb-6">Explore historical monuments and archives. Please login or register to continue.</p>
        <div className="space-x-4">
          <button 
            onClick={handleLogin}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
          >
            Login
          </button>
          <button 
            onClick={handleRegister}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
