import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './user_components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryForm from './components/CategoryForm';
import LocationForm from './components/LocationForm';
import MonumentForm from './components/MonumentForm';
import HistoricalDetailForm from './components/HistoricalDetailForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/category" element={<CategoryForm />} />
        <Route path="/admin/location" element={<LocationForm />} />
        <Route path="/admin/monument" element={<MonumentForm />} />
        <Route path="/admin/historical-details" element={<HistoricalDetailForm />} />

        <Route
          path="/user"
          element={
              <UserDashboard />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
