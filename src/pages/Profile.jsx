import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserAppointments, getUserDonations } from '../services/api';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bloodGroup: user?.bloodGroup || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || ''
  });
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userAppointments = await getUserAppointments(user.uid);
        const userDonations = await getUserDonations(user.uid);
        setAppointments(userAppointments);
        setDonations(userDonations);
      };
      fetchData();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bloodGroup: user?.bloodGroup || '',
      address: user?.address || '',
      emergencyContact: user?.emergencyContact || ''
    });
    setIsEditing(false);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to view your profile.</p>
          <Link to="/login" className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-teal-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-teal-100">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Blood Group</label>
                    <select 
                      name="bloodGroup" 
                      value={formData.bloodGroup} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Address</label>
                    <textarea 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      rows={3} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Emergency Contact</label>
                    <input 
                      type="text" 
                      name="emergencyContact" 
                      value={formData.emergencyContact} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Information */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p className="text-gray-800 font-semibold">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email Address</p>
                          <p className="text-gray-800 font-semibold">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="text-gray-800 font-semibold">{user.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Blood Group</p>
                          <p className="text-gray-800 font-semibold">{user.bloodGroup || 'Not specified'}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-gray-800 font-semibold">{user.address || 'Not provided'}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
                          <p className="text-gray-800 font-semibold">{user.emergencyContact || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medical Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Medical Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
                        <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
                        <p className="text-sm text-blue-600 font-medium">Total Appointments</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                        <p className="text-3xl font-bold text-green-600">{donations.length}</p>
                        <p className="text-sm text-green-600 font-medium">Total Donations</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link 
                        to="/appointments" 
                        className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">My Appointments</p>
                          <p className="text-sm text-gray-600">View and manage appointments</p>
                        </div>
                      </Link>
                      <Link 
                        to="/donations" 
                        className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Donate Blood/Organ</p>
                          <p className="text-sm text-gray-600">Save lives today</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  <button 
                    onClick={logout}
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;