import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleBrowse = () => {
    navigate('/user'); // Navigate to the user dashboard or browse page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Monument Archive</h1>
        <p className="text-gray-600 mb-6">
          Discover and explore historical monuments and archives. 

          <p className='browse'>Browse by: </p>
        </p>
        <button 
          onClick={handleBrowse}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
        >
          Monuments 
        </button>
        <button 
          onClick={handleBrowse}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
        >
          Category 
        </button>
        <button 
          onClick={handleBrowse}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
        >
          Location 
        </button>
        <p className="text-gray-500 mt-4">
          Need to <span className="font-semibold cursor-pointer" onClick={() => navigate('/login')}>login</span> !!! you can do it here.
        </p>
      </div>
    </div>
  );
};

export default Home;
