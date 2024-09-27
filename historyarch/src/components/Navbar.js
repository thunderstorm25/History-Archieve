import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Check if the user is logged in by checking if there's a token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
      {/* App name */}
      <Link to="/" className="text-white text-xl font-bold">
        Monument Archive
      </Link>

      {/* Logout button appears only if user is logged in */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-200 transition duration-300"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
