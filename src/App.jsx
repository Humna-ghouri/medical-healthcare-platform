import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './Components/Layout/Layout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Donations from './pages/Donations';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorProfile from './pages/DoctorProfile';
import AIChatbot from './Components/AI/AIChatbot';
import ProtectedRoute from './Components/ProtectedRoute';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-slate-50">
          <Layout>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:id" element={<DoctorProfile />} />
              <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
              <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <AIChatbot />
          </Layout>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
