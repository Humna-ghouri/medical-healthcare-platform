import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { createDonation, getUserDonations } from '../services/api';

const Donations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState('blood');
  const [showBloodForm, setShowBloodForm] = useState(false);
  const [showOrganForm, setShowOrganForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organsList = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Eyes', 'Bone Marrow', 'Skin'];

  const initialBloodFormState = {
    name: user?.name || '',
    bloodGroup: user?.bloodGroup || '',
    location: '',
    availability: 'Immediately',
    contact: user?.email || '',
    lastDonation: ''
  };

  const initialOrganFormState = {
    name: user?.name || '',
    organs: [],
    bloodGroup: user?.bloodGroup || '',
    location: '',
    contact: user?.email || '',
    emergencyContact: ''
  };

  const [bloodForm, setBloodForm] = useState(initialBloodFormState);
  const [organForm, setOrganForm] = useState(initialOrganFormState);

  const fetchDonations = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const userDonations = await getUserDonations(user.uid);
        setDonations(userDonations);
      } catch (error) {
        setError('Failed to fetch donations.');
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const handleBloodFormChange = (e) => {
    setBloodForm({ ...bloodForm, [e.target.name]: e.target.value });
  };

  const handleOrganFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setOrganForm(prev => ({ 
        ...prev, 
        organs: checked ? [...prev.organs, value] : prev.organs.filter(organ => organ !== value) 
      }));
    } else {
      setOrganForm({ ...organForm, [name]: value });
    }
  };

  const handleBloodSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createDonation(user.uid, { ...bloodForm, type: 'blood' });
      setShowBloodForm(false);
      setBloodForm(initialBloodFormState);
      await fetchDonations();
    } catch (err) {
      setError('Failed to register as a blood donor.');
    } finally {
      setLoading(false);
    }
  };

  const handleOrganSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createDonation(user.uid, { ...organForm, type: 'organ' });
      setShowOrganForm(false);
      setOrganForm(initialOrganFormState);
      await fetchDonations();
    } catch (err) {
      setError('Failed to register as an organ donor.');
    } finally {
      setLoading(false);
    }
  };

  const bloodDonations = donations.filter(d => d.type === 'blood');
  const organDonations = donations.filter(d => d.type === 'organ');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Donate Life
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our community of heroes. Your donation can save multiple lives and bring hope to those in need.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200">
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('blood')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 ${
                  activeTab === 'blood' 
                    ? 'bg-teal-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-teal-500 hover:bg-gray-50'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Blood Donation</span>
              </button>
              <button 
                onClick={() => setActiveTab('organ')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 ${
                  activeTab === 'organ' 
                    ? 'bg-teal-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-teal-500 hover:bg-gray-50'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
                <span>Organ Donation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          {activeTab === 'blood' && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Be a Blood Donor Hero</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Your single blood donation can save up to 3 lives. Join thousands of donors making a difference every day.
                </p>
              </div>

              {/* Registration Button */}
              <div className="text-center">
                <button 
                  onClick={() => setShowBloodForm(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 mx-auto"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Register as Blood Donor</span>
                </button>
              </div>

              {/* Blood Donations History */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-teal-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Your Blood Donation History
                </h3>
                {bloodDonations.length > 0 ? (
                  <div className="grid gap-4">
                    {bloodDonations.map((donation, index) => (
                      <div 
                        key={donation.id}
                        className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">Blood Group: {donation.bloodGroup}</h4>
                              <p className="text-gray-600">Location: {donation.location}</p>
                              {donation.lastDonation && (
                                <p className="text-sm text-gray-500">Last Donation: {donation.lastDonation}</p>
                              )}
                            </div>
                          </div>
                          <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-medium">
                            Active Donor
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">No Blood Donations Yet</h4>
                    <p className="text-gray-500">Be the first to make a difference!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'organ' && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Give the Gift of Life</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Organ donation is the ultimate act of generosity. Your decision can transform lives and create lasting legacies.
                </p>
              </div>

              {/* Registration Button */}
              <div className="text-center">
                <button 
                  onClick={() => setShowOrganForm(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 mx-auto"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Register as Organ Donor</span>
                </button>
              </div>

              {/* Organ Donations History */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-teal-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Your Organ Donation Pledge
                </h3>
                {organDonations.length > 0 ? (
                  <div className="grid gap-4">
                    {organDonations.map((donation, index) => (
                      <div 
                        key={donation.id}
                        className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">Pledged Organs</h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {donation.organs.map(organ => (
                                  <span key={organ} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                                    {organ}
                                  </span>
                                ))}
                              </div>
                              <p className="text-gray-600 mt-2">Location: {donation.location}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-medium">
                            Registered Donor
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">No Organ Donation Pledge</h4>
                    <p className="text-gray-500">Make a life-changing decision today!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blood Donation Modal */}
      {showBloodForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-teal-500 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Blood Donor Registration</h3>
                <button 
                  onClick={() => setShowBloodForm(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleBloodSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={bloodForm.name} 
                  onChange={handleBloodFormChange} 
                  required 
                  placeholder="Enter your full name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Blood Group *</label>
                <select 
                  name="bloodGroup" 
                  value={bloodForm.bloodGroup} 
                  onChange={handleBloodFormChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Location *</label>
                <input 
                  type="text" 
                  name="location" 
                  value={bloodForm.location} 
                  onChange={handleBloodFormChange} 
                  required 
                  placeholder="Your city or area" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Last Donation Date</label>
                <input 
                  type="date" 
                  name="lastDonation" 
                  value={bloodForm.lastDonation} 
                  onChange={handleBloodFormChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowBloodForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Organ Donation Modal */}
      {showOrganForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-teal-500 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Organ Donor Registration</h3>
                <button 
                  onClick={() => setShowOrganForm(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleOrganSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={organForm.name} 
                  onChange={handleOrganFormChange} 
                  required 
                  placeholder="Enter your full name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Blood Group *</label>
                <select 
                  name="bloodGroup" 
                  value={organForm.bloodGroup} 
                  onChange={handleOrganFormChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Location *</label>
                <input 
                  type="text" 
                  name="location" 
                  value={organForm.location} 
                  onChange={handleOrganFormChange} 
                  required 
                  placeholder="Your city or area" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Emergency Contact *</label>
                <input 
                  type="text" 
                  name="emergencyContact" 
                  value={organForm.emergencyContact} 
                  onChange={handleOrganFormChange} 
                  required 
                  placeholder="Emergency contact number" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Organs to Donate *</label>
                <div className="grid grid-cols-2 gap-3">
                  {organsList.map(organ => (
                    <label key={organ} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        value={organ} 
                        checked={organForm.organs.includes(organ)} 
                        onChange={handleOrganFormChange} 
                        className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{organ}</span>
                    </label>
                  ))}
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowOrganForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;