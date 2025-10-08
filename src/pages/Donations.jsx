import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Donations = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('blood');
  const [showBloodForm, setShowBloodForm] = useState(false);
  const [showOrganForm, setShowOrganForm] = useState(false);
  const [searchBloodGroup, setSearchBloodGroup] = useState('');
  const [searchOrgan, setSearchOrgan] = useState('');

  // Blood Donation Form State
  const [bloodForm, setBloodForm] = useState({
    name: user?.name || '',
    bloodGroup: user?.bloodGroup || '',
    location: '',
    availability: 'Immediately',
    contact: user?.email || '',
    lastDonation: ''
  });

  // Organ Donation Form State
  const [organForm, setOrganForm] = useState({
    name: user?.name || '',
    organs: [],
    bloodGroup: user?.bloodGroup || '',
    location: '',
    contact: user?.email || '',
    emergencyContact: ''
  });

  const bloodDonors = [
    {
      id: 1,
      name: "John Smith",
      bloodGroup: "A+",
      location: "Downtown Medical Center",
      lastDonation: "2 weeks ago",
      contact: "john.smith@email.com",
      available: true
    },
    {
      id: 2,
      name: "Maria Garcia",
      bloodGroup: "O-",
      location: "Northside Hospital",
      lastDonation: "1 month ago",
      contact: "maria.g@email.com",
      available: true
    }
  ];

  const organDonors = [
    {
      id: 1,
      name: "Robert Brown",
      organs: ["Kidney", "Liver", "Eyes"],
      bloodGroup: "O+",
      location: "New York",
      registeredDate: "2023-01-15"
    }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organsList = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Eyes', 'Bone Marrow', 'Skin'];

  const filteredBloodDonors = bloodDonors.filter(donor =>
    donor.bloodGroup.toLowerCase().includes(searchBloodGroup.toLowerCase()) &&
    donor.available
  );

  const filteredOrganDonors = organDonors.filter(donor =>
    donor.organs.some(organ => 
      organ.toLowerCase().includes(searchOrgan.toLowerCase())
    )
  );

  const handleBloodFormChange = (e) => {
    setBloodForm({
      ...bloodForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOrganFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setOrganForm(prev => ({
        ...prev,
        organs: checked 
          ? [...prev.organs, value]
          : prev.organs.filter(organ => organ !== value)
      }));
    } else {
      setOrganForm({
        ...organForm,
        [name]: value
      });
    }
  };

  const handleBloodSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for registering as a blood donor! We will contact you soon.');
    setShowBloodForm(false);
    setBloodForm({
      name: user?.name || '',
      bloodGroup: user?.bloodGroup || '',
      location: '',
      availability: 'Immediately',
      contact: user?.email || '',
      lastDonation: ''
    });
  };

  const handleOrganSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your noble decision to become an organ donor!');
    setShowOrganForm(false);
    setOrganForm({
      name: user?.name || '',
      organs: [],
      bloodGroup: user?.bloodGroup || '',
      location: '',
      contact: user?.email || '',
      emergencyContact: ''
    });
  };

  const handleRequestBlood = (donor) => {
    alert(`Blood request sent to ${donor.name}. They will contact you at ${donor.contact}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">💉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Life-Saving Mission</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to register as a blood or organ donor and help save lives.
            </p>
            <a
              href="/login"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors inline-block"
            >
              Sign In to Continue
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Donate Life</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of heroes. Your donation can save multiple lives and bring hope to those in need.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('blood')}
            className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
              activeTab === 'blood'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🩸 Blood Donation
          </button>
          <button
            onClick={() => setActiveTab('organ')}
            className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
              activeTab === 'organ'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ❤️ Organ Donation
          </button>
        </div>

        {/* Blood Donation Tab */}
        {activeTab === 'blood' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🩸</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Be a Blood Donor Hero</h2>
                <p className="text-gray-600 mb-6">
                  Every 2 seconds, someone needs blood. Your single donation can save up to 3 lives. 
                  Join our network of regular donors and make a difference.
                </p>
                <button
                  onClick={() => setShowBloodForm(true)}
                  className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg"
                >
                  Register as Blood Donor
                </button>
              </div>
            </div>

            {/* Search and Donors List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl font-semibold text-gray-800">Available Blood Donors</h3>
                <div className="w-full sm:w-64">
                  <select
                    value={searchBloodGroup}
                    onChange={(e) => setSearchBloodGroup(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredBloodDonors.map(donor => (
                  <div key={donor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold">{donor.bloodGroup}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{donor.name}</h4>
                        <p className="text-sm text-gray-600">{donor.location}</p>
                        <p className="text-xs text-gray-500">Last donation: {donor.lastDonation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full mb-2">
                        Available
                      </span>
                      <button
                        onClick={() => handleRequestBlood(donor)}
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors text-sm"
                      >
                        Request Blood
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredBloodDonors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No available donors found for the selected blood group.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Organ Donation Tab */}
        {activeTab === 'organ' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">❤️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">The Ultimate Gift of Life</h2>
                <p className="text-gray-600 mb-6">
                  Organ donation is a noble act that can save up to 8 lives and improve many more. 
                  Make your decision count and give the gift of life.
                </p>
                <button
                  onClick={() => setShowOrganForm(true)}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-lg"
                >
                  Register as Organ Donor
                </button>
              </div>
            </div>

            {/* Organ Donors List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Registered Organ Donors</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOrganDonors.map(donor => (
                  <div key={donor.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-800">{donor.name}</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Registered
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Blood Group:</span> {donor.bloodGroup}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {donor.location}
                      </div>
                      <div>
                        <span className="font-medium">Organs:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {donor.organs.map(organ => (
                            <span key={organ} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {organ}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Registered:</span> {donor.registeredDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredOrganDonors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No organ donors found matching your search.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Blood Donation Modal */}
      {showBloodForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Blood Donor Registration</h3>
                <button
                  onClick={() => setShowBloodForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleBloodSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bloodForm.name}
                    onChange={handleBloodFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={bloodForm.bloodGroup}
                    onChange={handleBloodFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={bloodForm.location}
                    onChange={handleBloodFormChange}
                    required
                    placeholder="City, State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={bloodForm.availability}
                    onChange={handleBloodFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="Immediately">Immediately</option>
                    <option value="Within a week">Within a week</option>
                    <option value="Within a month">Within a month</option>
                    <option value="On call">On call basis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email/Phone
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={bloodForm.contact}
                    onChange={handleBloodFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Donation Date (if any)
                  </label>
                  <input
                    type="date"
                    name="lastDonation"
                    value={bloodForm.lastDonation}
                    onChange={handleBloodFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBloodForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Register as Donor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Organ Donation Modal */}
      {showOrganForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Organ Donor Registration</h3>
                <button
                  onClick={() => setShowOrganForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleOrganSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={organForm.name}
                    onChange={handleOrganFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={organForm.bloodGroup}
                    onChange={handleOrganFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={organForm.location}
                    onChange={handleOrganFormChange}
                    required
                    placeholder="City, State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Organs You Wish to Donate
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {organsList.map(organ => (
                      <label key={organ} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          value={organ}
                          checked={organForm.organs.includes(organ)}
                          onChange={handleOrganFormChange}
                          className="rounded text-green-500 focus:ring-green-500"
                        />
                        <span className="text-sm">{organ}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email/Phone
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={organForm.contact}
                    onChange={handleOrganFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={organForm.emergencyContact}
                    onChange={handleOrganFormChange}
                    required
                    placeholder="Name and phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Please discuss your decision with your family members. 
                    Organ donation is a significant decision that requires family awareness and support.
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOrganForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Register as Donor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;