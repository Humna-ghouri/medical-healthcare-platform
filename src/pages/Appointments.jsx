import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      type: "Follow-up"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialization: "Neurologist",
      date: "2024-01-20",
      time: "02:30 PM",
      status: "pending",
      type: "Consultation"
    }
  ];

  const handleReschedule = (appointmentId) => {
    alert(`Reschedule appointment ${appointmentId}`);
  };

  const handleCancel = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Appointment ${appointmentId} cancelled`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">📅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Your Appointments</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view and manage your medical appointments.
            </p>
            <Link
              to="/login"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors inline-block"
            >
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage and track your medical appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming Appointments
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past Appointments
              </button>
              <button
                onClick={() => setActiveTab('book')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'book'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Book New Appointment
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                {appointments.filter(apt => apt.status !== 'completed').map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-bold">📅</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialization}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <div className="mt-2 space-x-2">
                        <button 
                          onClick={() => handleReschedule(appointment.id)}
                          className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                        >
                          Reschedule
                        </button>
                        <button 
                          onClick={() => handleCancel(appointment.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'book' && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-600 text-2xl">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Book New Appointment</h3>
                <p className="text-gray-600 mb-6">Find and book appointments with our specialist doctors</p>
                <Link
                  to="/doctors"
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors inline-block"
                >
                  Browse Doctors
                </Link>
              </div>
            )}

            {activeTab === 'past' && (
              <div className="text-center py-12">
                <p className="text-gray-500">No past appointments found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;