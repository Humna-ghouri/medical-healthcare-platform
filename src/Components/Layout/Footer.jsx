"import React from 'react'; export default () => <footer>Footer</footer>;" 
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold">HealthCare+</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner in healthcare. Providing quality medical services with compassion and excellence.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/doctors" className="hover:text-teal-400 transition-colors">Find Doctors</Link></li>
              <li><Link to="/appointments" className="hover:text-teal-400 transition-colors">Book Appointment</Link></li>
              <li><Link to="/donations" className="hover:text-teal-400 transition-colors">Donate Blood</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-teal-400 transition-colors">Emergency Care</li>
              <li className="hover:text-teal-400 transition-colors">Medical Checkup</li>
              <li className="hover:text-teal-400 transition-colors">Blood Donation</li>
              <li className="hover:text-teal-400 transition-colors">Organ Donation</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📞 +1 (555) 123-HEAL</li>
              <li>📧 support@healthcare.com</li>
              <li>📍 123 Medical Center, Health City</li>
              <li>🕒 24/7 Emergency Services</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 HealthCare+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;