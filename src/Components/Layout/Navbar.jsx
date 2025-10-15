import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/donations', label: 'Donations' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 h-16">
      <div className="w-full h-full">
        <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-teal-600 hidden sm:block">HealthCare+</span>
          </Link>

          {/* Desktop Navigation - Center aligned */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-teal-600 bg-teal-50 border-b-2 border-teal-500'
                      : 'text-gray-600 hover:text-teal-500 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2 text-gray-600 hover:text-teal-500 transition-colors font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-teal-500 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 absolute top-16 left-0 right-0 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.path) 
                      ? 'text-teal-600 bg-teal-50 border-l-4 border-teal-500' 
                      : 'text-gray-600 hover:text-teal-500 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-2 space-y-2">
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-100 transition-colors"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={() => { logout(); setIsMenuOpen(false); }} 
                      className="w-full text-left block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-100 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-100 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;