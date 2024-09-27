import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Monument Archive
        </Link>
      </nav>

      <h1>User Dashboard</h1>
      <p>Here you can search, filter between dates, and get information about monuments and their historical details.</p>
      
    </div>
  );
};

export default UserDashboard;
