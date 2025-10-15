import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Doctors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "15 years",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Wed, Fri",
      education: "MD Cardiology, Harvard Medical School",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      experience: "12 years",
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Tue, Thu, Sat",
      education: "MD Neurology, Johns Hopkins University",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrician",
      experience: "10 years",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=200&h=200&fit=crop&crop=face",
      availability: "Mon - Fri",
      education: "MD Pediatrics, Stanford University",
      languages: ["English", "Spanish"],
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Orthopedic Surgeon",
      experience: "18 years",
      rating: 4.6,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Wed, Thu",
      education: "MD Orthopedics, Mayo Clinic",
      languages: ["English", "German"],
    },
    {
      id: 5,
      name: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      experience: "8 years",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Tue, Thu, Sat",
      education: "MD Dermatology, AIIMS Delhi",
      languages: ["English", "Hindi"],
    },
    {
      id: 6,
      name: "Dr. Robert Brown",
      specialization: "Cardiologist",
      experience: "20 years",
      rating: 4.8,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Wed, Fri",
      education: "MD Cardiology, Cleveland Clinic",
      languages: ["English", "French"],
    },
    {
      id: 7,
      name: "Dr. Maria Garcia",
      specialization: "Psychiatrist",
      experience: "14 years",
      rating: 4.7,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Tue, Thu",
      education: "MD Psychiatry, Columbia University",
      languages: ["English", "Spanish"],
    },
    {
      id: 8,
      name: "Dr. David Kim",
      specialization: "Oncologist",
      experience: "16 years",
      rating: 4.9,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Wed, Thu, Fri",
      education: "MD Oncology, MD Anderson",
      languages: ["English", "Korean"],
    },
    {
      id: 9,
      name: "Dr. Lisa Wang",
      specialization: "Gynecologist",
      experience: "11 years",
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Tue, Fri",
      education: "MD Gynecology, UCLA Medical Center",
      languages: ["English", "Chinese"],
    },
    {
      id: 10,
      name: "Dr. Andrew Taylor",
      specialization: "ENT Specialist",
      experience: "13 years",
      rating: 4.6,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Tue, Wed, Sat",
      education: "MD ENT, Johns Hopkins Hospital",
      languages: ["English", "French"],
    },
    {
      id: 11,
      name: "Dr. Sophia Martinez",
      specialization: "Endocrinologist",
      experience: "9 years",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Thu, Fri",
      education: "MD Endocrinology, Mayo Clinic",
      languages: ["English", "Spanish"],
    },
    {
      id: 12,
      name: "Dr. Kevin Patel",
      specialization: "Gastroenterologist",
      experience: "17 years",
      rating: 4.9,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Wed, Sat",
      education: "MD Gastroenterology, Cleveland Clinic",
      languages: ["English", "Hindi", "Gujarati"],
    },
    {
      id: 13,
      name: "Dr. Jennifer Lee",
      specialization: "Rheumatologist",
      experience: "12 years",
      rating: 4.5,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Tue, Thu, Fri",
      education: "MD Rheumatology, Stanford Medical",
      languages: ["English", "Korean"],
    },
    {
      id: 14,
      name: "Dr. Marcus Johnson",
      specialization: "Urologist",
      experience: "19 years",
      rating: 4.8,
      reviews: 176,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Wed, Thu",
      education: "MD Urology, Harvard Medical School",
      languages: ["English", "Spanish"],
    },
    {
      id: 15,
      name: "Dr. Amanda White",
      specialization: "Pulmonologist",
      experience: "14 years",
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Tue, Wed, Fri",
      education: "MD Pulmonology, Johns Hopkins",
      languages: ["English", "French"],
    },
    {
      id: 16,
      name: "Dr. Daniel Kim",
      specialization: "Nephrologist",
      experience: "16 years",
      rating: 4.9,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Thu, Sat",
      education: "MD Nephrology, Mayo Clinic",
      languages: ["English", "Korean"],
    },
    {
      id: 17,
      name: "Dr. Rachel Green",
      specialization: "Allergist",
      experience: "10 years",
      rating: 4.6,
      reviews: 123,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Tue, Fri",
      education: "MD Allergy & Immunology, UCLA",
      languages: ["English", "Hebrew"],
    },
    {
      id: 18,
      name: "Dr. Christopher Lee",
      specialization: "Hematologist",
      experience: "15 years",
      rating: 4.8,
      reviews: 154,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Wed, Thu, Fri",
      education: "MD Hematology, Dana-Farber Cancer Institute",
      languages: ["English", "Chinese"],
    },
    {
      id: 19,
      name: "Dr. Olivia Brown",
      specialization: "Infectious Disease",
      experience: "11 years",
      rating: 4.7,
      reviews: 138,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Tue, Thu",
      education: "MD Infectious Diseases, Emory University",
      languages: ["English", "Portuguese"],
    },
    {
      id: 20,
      name: "Dr. Benjamin Carter",
      specialization: "Radiologist",
      experience: "13 years",
      rating: 4.5,
      reviews: 129,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Tue, Wed, Sat",
      education: "MD Radiology, Massachusetts General",
      languages: ["English", "German"],
    },
    {
      id: 21,
      name: "Dr. Samantha Davis",
      specialization: "Anesthesiologist",
      experience: "18 years",
      rating: 4.9,
      reviews: 187,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Wed, Fri",
      education: "MD Anesthesiology, Johns Hopkins",
      languages: ["English", "Spanish"],
    },
    {
      id: 22,
      name: "Dr. Thomas Anderson",
      specialization: "Emergency Medicine",
      experience: "14 years",
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "24/7 Emergency",
      education: "MD Emergency Medicine, Bellevue Hospital",
      languages: ["English", "Russian"],
    },
    {
      id: 23,
      name: "Dr. Natalie Wright",
      specialization: "Family Medicine",
      experience: "12 years",
      rating: 4.8,
      reviews: 201,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      availability: "Mon - Fri",
      education: "MD Family Medicine, University of Washington",
      languages: ["English", "Vietnamese"],
    },
    {
      id: 24,
      name: "Dr. George Miller",
      specialization: "Physical Medicine",
      experience: "16 years",
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      availability: "Mon, Tue, Thu",
      education: "MD Physical Medicine, NYU Langone",
      languages: ["English", "Greek"],
    }
  ];

  const specializations = ['All', ...new Set(doctors.map(doctor => doctor.specialization))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialization = selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialization && matchesSearch;
  });

  const handleBookAppointment = (doctor) => {
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }
    navigate('/appointments', { 
      state: { 
        doctorName: doctor.name,
        specialization: doctor.specialization
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Medical Team
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Meet our experienced healthcare professionals dedicated to providing you with exceptional medical care.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Specialization Filters */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Specialty</h3>
              <div className="flex flex-wrap gap-2">
                {specializations.map(spec => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialization(spec)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedSpecialization === spec
                        ? 'bg-teal-500 text-white shadow-md hover:bg-teal-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="lg:w-80">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Find Doctor</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doctors..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-teal-600">{filteredDoctors.length}</span> 
            {filteredDoctors.length === 1 ? ' doctor' : ' doctors'} 
            {selectedSpecialization !== 'All' && ` in ${selectedSpecialization}`}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map(doctor => (
            <div 
              key={doctor.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                
                {/* Doctor Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white">
                      <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-teal-600 font-medium text-sm mt-1">{doctor.specialization}</p>
                  </div>

                  {/* Rating */}
                  <div className="bg-gray-50 rounded-lg px-2 py-1 border border-gray-200">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-gray-900 text-sm">{doctor.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500 text-center">{doctor.reviews} reviews</div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">{doctor.experience} Experience</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Available</div>
                      <div className="text-sm text-gray-500">{doctor.availability}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Languages</div>
                      <div className="text-sm text-gray-500">{doctor.languages.join(', ')}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleBookAppointment(doctor)}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Book Appointment</span>
                  </button>
                  
                  <Link 
                    to={`/doctors/${doctor.id}`} 
                    state={{ doctor }} 
                    className="flex items-center justify-center w-12 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Doctors Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedSpecialization('All');
                setSearchTerm('');
              }}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;