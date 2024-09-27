import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar /> {/* Add Navbar here */}
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Admin Dashboard</h1>
        <ul className="space-y-4 w-full max-w-md">
          <li>
            <Link
              to="/admin/category"
              className="block bg-white text-center p-4 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Manage Categories
            </Link>
          </li>
          <li>
            <Link
              to="/admin/location"
              className="block bg-white text-center p-4 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Manage Locations
            </Link>
          </li>
          <li>
            <Link
              to="/admin/monument"
              className="block bg-white text-center p-4 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Manage Monuments
            </Link>
          </li>
          <li>
            <Link
              to="/admin/historical-details"
              className="block bg-white text-center p-4 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Manage Historical Details
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
