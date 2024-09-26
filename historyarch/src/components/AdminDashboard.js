import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/category">Manage Categories</Link>
        </li>
        <li>
          <Link to="/admin/location">Manage Locations</Link>
        </li>
        <li>
          <Link to="/admin/monument">Manage Monuments</Link>
        </li>
        <li>
          <Link to="/admin/historical-details">Manage Historical Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
