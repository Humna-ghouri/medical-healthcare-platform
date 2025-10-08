import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('healthcare_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('healthcare_user');
      }
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now(),
      email,
      ...userData,
      appointments: [],
      donations: [],
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('healthcare_user', JSON.stringify(newUser));
    return newUser;
  };

  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login - in real app, verify credentials with backend
    const mockUser = {
      id: 1,
      email,
      name: email === 'demo@healthcare.com' ? 'Demo User' : 'John Doe',
      phone: '+1 (555) 123-4567',
      bloodGroup: 'A+',
      appointments: [
        {
          id: 1,
          doctorName: "Dr. Sarah Johnson",
          specialization: "Cardiologist",
          date: "2024-01-15",
          time: "10:00 AM",
          status: "confirmed"
        }
      ],
      donations: [
        {
          id: 1,
          type: "blood",
          date: "2024-01-10",
          location: "City Blood Bank"
        }
      ],
      lastLogin: new Date().toISOString()
    };
    
    setUser(mockUser);
    localStorage.setItem('healthcare_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  const updateProfile = async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
    setUser(updatedUser);
    localStorage.setItem('healthcare_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const value = {
    user,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};