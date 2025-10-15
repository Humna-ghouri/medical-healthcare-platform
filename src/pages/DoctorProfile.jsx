import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const DoctorProfile = () => {
  const location = useLocation();
  const { doctor } = location.state || {};

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Doctor Not Found</h3>
          <p className="text-gray-600 mb-6">The doctor profile you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/doctors" 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Doctors</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 p-8 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              <div className="flex-shrink-0 mb-6 lg:mb-0">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-32 h-32 rounded-2xl border-4 border-white/20 shadow-2xl object-cover" 
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{doctor.name}</h1>
                <p className="text-xl text-white/90 mb-4">{doctor.specialization}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">{doctor.rating} ({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Doctor Information */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 text-teal-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Availability</p>
                          <p className="font-semibold text-gray-800">{doctor.availability}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Experience</p>
                          <p className="font-semibold text-gray-800">{doctor.experience}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Specialization</p>
                          <p className="font-semibold text-gray-800">{doctor.specialization}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Status</p>
                          <p className="font-semibold text-green-600">Available for Consultations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Doctor */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">About Dr. {doctor.name.split(' ')[1]}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {doctor.name} is a highly experienced {doctor.specialization.toLowerCase()} with {doctor.experience} of dedicated service in the medical field. 
                    Known for exceptional patient care and innovative treatment approaches, Dr. {doctor.name.split(' ')[1]} has helped thousands of patients 
                    achieve better health outcomes through personalized care plans and cutting-edge medical practices.
                  </p>
                </div>
              </div>

              {/* Appointment Booking */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-6 border border-teal-100 sticky top-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Book Appointment</h3>
                  <p className="text-gray-600 mb-6">
                    Schedule your consultation with {doctor.name}. Choose a convenient time for your visit.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="text-2xl font-bold text-teal-600">$120</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                      <span className="text-gray-600">Wait Time</span>
                      <span className="font-semibold text-green-600">15-20 mins</span>
                    </div>
                  </div>

                  <Link 
                    to="/appointments"
                    state={{ doctorName: doctor.name, specialization: doctor.specialization }}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Book Appointment Now</span>
                  </Link>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Emergency? Call immediately</p>
                    <p className="text-lg font-semibold text-gray-800">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;