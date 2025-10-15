import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createAppointment, getUserAppointments } from '../services/api';
import { useLocation } from 'react-router-dom';

const Appointments = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [formData, setFormData] = useState({
    doctorName: '',
    specialization: '',
    date: '',
    time: '',
    type: 'Consultation'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const { doctorName, specialization } = location.state || {};
    if (doctorName && specialization) {
      setFormData(prevData => ({
        ...prevData,
        doctorName,
        specialization,
      }));
      setActiveTab('book');
    }
  }, [location.state]);

  useEffect(() => {
    if (user && activeTab === 'upcoming') {
      const fetchAppointments = async () => {
        const userAppointments = await getUserAppointments(user.uid);
        setAppointments(userAppointments);
      };
      fetchAppointments();
    }
  }, [user, activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createAppointment(user.uid, formData);
      const userAppointments = await getUserAppointments(user.uid);
      setAppointments(userAppointments);
      setFormData({
        doctorName: '',
        specialization: '',
        date: '',
        time: '',
        type: 'Consultation'
      });
      setActiveTab('upcoming');
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Appointments
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage and track your medical appointments with ease and convenience
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-white">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'border-teal-500 text-teal-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-teal-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Upcoming Appointments</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('book')}
                className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'book'
                    ? 'border-teal-500 text-teal-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-teal-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Book New Appointment</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                {appointments.length > 0 ? appointments.map((appointment, index) => (
                  <div 
                    key={appointment.id}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-teal-600 font-medium">{appointment.specialization}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {appointment.date}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {appointment.time}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointments Yet</h3>
                    <p className="text-gray-500 mb-6">Schedule your first appointment to get started</p>
                    <button
                      onClick={() => setActiveTab('book')}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Book Your First Appointment
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'book' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Book New Appointment</h2>
                  <p className="text-gray-600 mb-8">Fill in the details to schedule your appointment</p>
                  
                  {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-700">{error}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Doctor Name *</label>
                        <input 
                          type="text" 
                          name="doctorName" 
                          placeholder="Enter doctor's name" 
                          value={formData.doctorName} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Specialization *</label>
                        <input 
                          type="text" 
                          name="specialization" 
                          placeholder="e.g., Cardiologist" 
                          value={formData.specialization} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Date *</label>
                        <input 
                          type="date" 
                          name="date" 
                          value={formData.date} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Time *</label>
                        <input 
                          type="time" 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Appointment Type</label>
                        <select 
                          name="type" 
                          value={formData.type} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="Consultation">Consultation</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Check-up">Regular Check-up</option>
                          <option value="Emergency">Emergency</option>
                        </select>
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Booking Appointment...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Confirm Appointment</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;