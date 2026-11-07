import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DashboardHome from './pages/DashboardHome.jsx';
import PostList from './pages/PostList.jsx';
import ServiceList from './pages/ServiceList.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });

  const handleSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login setUser={handleSetUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="/dashboardhome" element={user ? <DashboardHome user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="/posts" element={user ? <PostList user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="/services" element={user ? <ServiceList user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="/profile" element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="/settings" element={user ? <Settings user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} replace />} />
    </Routes>
  );
}
