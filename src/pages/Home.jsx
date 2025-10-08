"import React from 'react'; export default () => <h1>Home Page</h1>;" 

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: "👨‍⚕️",
      title: "Expert Doctors",
      description: "Consult with certified healthcare professionals"
    },
    {
      icon: "📅",
      title: "Easy Appointments",
      description: "Book appointments with just a few clicks"
    },
    {
      icon: "💉",
      title: "Blood Donation",
      description: "Join our life-saving donation network"
    },
    {
      icon: "🤖",
      title: "AI Health Assistant",
      description: "Get instant answers to health questions"
    }
  ];

  const stats = [
    { number: "50+", label: "Expert Doctors" },
    { number: "10k+", label: "Patients Served" },
    { number: "5k+", label: "Blood Donations" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Health is Our 
              <span className="text-teal-600"> Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Comprehensive healthcare services with compassion and excellence. 
              From doctor consultations to life-saving donations, we're here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link
                    to="/doctors"
                    className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-lg"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    to="/donations"
                    className="border-2 border-teal-500 text-teal-500 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                  >
                    Donate Blood
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/doctors"
                    className="border-2 border-teal-500 text-teal-500 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                  >
                    Find Doctors
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a wide range of medical services to meet all your healthcare needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their healthcare needs
          </p>
          <Link
            to={user ? "/appointments" : "/signup"}
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            {user ? "Book Now" : "Get Started"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;