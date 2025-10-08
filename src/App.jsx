import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Donations from './pages/Donations';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AIChatbot from './components/AI/AIChatbot';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-slate-50">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <AIChatbot />
          </Layout>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import React, { useState } from 'react';
// import { Calendar, MessageCircle, Users, Heart, Activity, Star, Clock, MapPin, Phone, Mail, ChevronRight, X, Send, User, LogOut, Home, Stethoscope, Droplet, Menu } from 'lucide-react';

// // Mock Data
// const mockDoctors = [
//   { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', rating: 4.8, reviews: 124, availability: ['Mon', 'Wed', 'Fri'], image: '👩‍⚕️', experience: '15 years' },
//   { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', rating: 4.9, reviews: 98, availability: ['Tue', 'Thu', 'Sat'], image: '👨‍⚕️', experience: '12 years' },
//   { id: 3, name: 'Dr. Emily Davis', specialization: 'Pediatrician', rating: 4.7, reviews: 156, availability: ['Mon', 'Wed', 'Fri'], image: '👩‍⚕️', experience: '10 years' },
//   { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedic', rating: 4.6, reviews: 89, availability: ['Tue', 'Thu'], image: '👨‍⚕️', experience: '18 years' },
// ];

// const mockDonors = [
//   { id: 1, name: 'John Doe', bloodGroup: 'O+', location: 'New York', available: true, phone: '+1234567890' },
//   { id: 2, name: 'Jane Smith', bloodGroup: 'A+', location: 'Los Angeles', available: true, phone: '+1234567891' },
//   { id: 3, name: 'Mike Johnson', bloodGroup: 'B+', location: 'Chicago', available: false, phone: '+1234567892' },
//   { id: 4, name: 'Sarah Williams', bloodGroup: 'AB+', location: 'Houston', available: true, phone: '+1234567893' },
// ];

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState('signin');
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState([
//     { type: 'bot', text: 'Hello! I am your AI health assistant. How can I help you today?' }
//   ]);
//   const [chatInput, setChatInput] = useState('');
//   const [appointments, setAppointments] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [reviews, setReviews] = useState({});
//   const [donors, setDonors] = useState(mockDonors);
//   const [searchBloodGroup, setSearchBloodGroup] = useState('');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   // Store registered users
//   const [registeredUsers, setRegisteredUsers] = useState([]);

//   // Navigation
//   const navigate = (page) => {
//     if (page !== 'home' && !isAuthenticated) {
//       setShowAuthModal(true);
//       setAuthMode('signin');
//       return;
//     }
//     setCurrentPage(page);
//     setMobileMenuOpen(false);
//   };

//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     setCurrentPage('home');
//   };

//   // Chat Functions
//   const handleSendMessage = () => {
//     if (!chatInput.trim()) return;

//     const userMessage = chatInput;
//     setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
//     setChatInput('');
    
//     setTimeout(() => {
//       let response = '';
//       const input = userMessage.toLowerCase();
      
//       if (input.includes('fever')) {
//         response = 'For a fever, I recommend: 1) Rest and stay hydrated, 2) Take acetaminophen or ibuprofen, 3) Monitor your temperature. If fever persists above 103°F or lasts more than 3 days, please consult a doctor.';
//       } else if (input.includes('tired') || input.includes('fatigue')) {
//         response = 'Fatigue can have many causes. Try: 1) Getting 7-9 hours of sleep, 2) Regular exercise, 3) Balanced diet, 4) Stay hydrated. If fatigue persists, consider booking an appointment with a doctor.';
//       } else if (input.includes('headache')) {
//         response = 'For headaches: 1) Rest in a quiet, dark room, 2) Stay hydrated, 3) Apply cold compress, 4) Take over-the-counter pain relievers. Severe or persistent headaches require medical attention.';
//       } else if (input.includes('appointment') || input.includes('doctor')) {
//         response = 'You can book an appointment with our doctors through the Appointments section. We have specialists available in various fields. Would you like me to guide you there?';
//       } else {
//         response = 'I understand your concern. For specific medical advice, I recommend booking an appointment with one of our qualified doctors. In the meantime, ensure you are getting adequate rest, staying hydrated, and maintaining a healthy diet.';
//       }
      
//       setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
//     }, 1000);
//   };

//   // Appointment Functions
//   const handleBookAppointment = (doctor, date, time) => {
//     const newAppointment = {
//       id: Date.now(),
//       doctor: doctor.name,
//       specialization: doctor.specialization,
//       date,
//       time,
//       status: 'upcoming'
//     };
//     setAppointments([...appointments, newAppointment]);
//     setSelectedDoctor(null);
//     setCurrentPage('dashboard');
//   };

//   // Review Functions
//   const handleSubmitReview = (doctorId, rating, comment) => {
//     setReviews({
//       ...reviews,
//       [doctorId]: [...(reviews[doctorId] || []), { rating, comment, user: user.name, date: new Date().toLocaleDateString() }]
//     });
//   };

//   // Components
//   const Navbar = () => (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('home')}>
//             <Activity className="h-8 w-8 text-teal-600" />
//             <span className="text-2xl font-bold text-gray-800">HealthCare+</span>
//           </div>
          
//           <div className="hidden md:flex space-x-8">
//             <button onClick={() => navigate('home')} className="flex items-center text-gray-700 hover:text-teal-600 transition">
//               <Home className="h-4 w-4 mr-1" />
//               Home
//             </button>
//             <button onClick={() => navigate('doctors')} className="flex items-center text-gray-700 hover:text-teal-600 transition">
//               <Stethoscope className="h-4 w-4 mr-1" />
//               Doctors
//             </button>
//             <button onClick={() => navigate('appointments')} className="flex items-center text-gray-700 hover:text-teal-600 transition">
//               <Calendar className="h-4 w-4 mr-1" />
//               Appointments
//             </button>
//             <button onClick={() => navigate('donations')} className="flex items-center text-gray-700 hover:text-teal-600 transition">
//               <Heart className="h-4 w-4 mr-1" />
//               Donations
//             </button>
//             <button onClick={() => setChatOpen(true)} className="flex items-center text-gray-700 hover:text-teal-600 transition">
//               <MessageCircle className="h-4 w-4 mr-1" />
//               AI Assistant
//             </button>
//           </div>

//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <div className="hidden md:flex items-center space-x-4">
//                 <button onClick={() => navigate('dashboard')} className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
//                   <User className="h-5 w-5" />
//                   <span>{user.name}</span>
//                 </button>
//                 <button onClick={handleSignOut} className="flex items-center space-x-2 text-red-600 hover:text-red-700">
//                   <LogOut className="h-5 w-5" />
//                 </button>
//               </div>
//             ) : (
//               <button 
//                 onClick={() => {
//                   setShowAuthModal(true);
//                   setAuthMode('signin');
//                 }} 
//                 className="hidden md:block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
//               >
//                 Sign In
//               </button>
//             )}
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
//               <Menu className="h-6 w-6 text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <div className="px-4 py-2 space-y-2">
//             <button onClick={() => navigate('home')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</button>
//             <button onClick={() => navigate('doctors')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Doctors</button>
//             <button onClick={() => navigate('appointments')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Appointments</button>
//             <button onClick={() => navigate('donations')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Donations</button>
//             <button onClick={() => setChatOpen(true)} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">AI Assistant</button>
//             {isAuthenticated ? (
//               <>
//                 <button onClick={() => navigate('dashboard')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</button>
//                 <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded">Sign Out</button>
//               </>
//             ) : (
//               <button onClick={() => {
//                 setShowAuthModal(true);
//                 setAuthMode('signin');
//               }} className="w-full text-left px-4 py-2 text-teal-600 hover:bg-gray-100 rounded">Sign In</button>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );

//   const AuthModal = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');

//     const handleAuthSubmit = (e) => {
//       if (e) {
//         e.preventDefault();
//         e.stopPropagation();
//       }
      
//       console.log('Form submitted!', { authMode, email, name });
      
//       if (authMode === 'signup') {
//         if (!name || !email || !password) {
//           alert('Please fill all fields');
//           return;
//         }
//         // Store registered user
//         const newUser = { name, email, password };
//         setRegisteredUsers([...registeredUsers, newUser]);
//         setUser({ name: name, email: email });
//         setIsAuthenticated(true);
//         alert('Successfully signed up!');
//       } else {
//         // Sign in - check if user exists
//         if (!email || !password) {
//           alert('Please fill all fields');
//           return;
//         }
//         const existingUser = registeredUsers.find(u => u.email === email && u.password === password);
//         if (existingUser) {
//           setUser({ name: existingUser.name, email: existingUser.email });
//           setIsAuthenticated(true);
//           alert('Successfully signed in!');
//         } else {
//           alert('Invalid email or password. Please sign up first!');
//           return;
//         }
//       }
      
//       setShowAuthModal(false);
//       setEmail('');
//       setPassword('');
//       setName('');
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl max-w-md w-full p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-800">
//               {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
//             </h3>
//             <button 
//               type="button"
//               onClick={() => setShowAuthModal(false)} 
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <form onSubmit={handleAuthSubmit} className="space-y-4">
//             {authMode === 'signup' && (
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   placeholder="John Doe"
//                 />
//               </div>
//             )}
            
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 placeholder="example@email.com"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 minLength={6}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button 
//               type="submit"
//               onClick={handleAuthSubmit}
//               className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition cursor-pointer"
//             >
//               {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <button 
//               type="button"
//               onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
//               className="text-teal-600 hover:text-teal-700 font-semibold"
//             >
//               {authMode === 'signin' ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const HomePage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
//             Your Health, Our Priority
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Access world-class healthcare services, book appointments with top doctors, and get AI-powered health assistance - all in one place.
//           </p>
//           <button onClick={() => navigate('doctors')} className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition transform hover:scale-105">
//             Get Started
//           </button>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 mt-20">
//           <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
//             <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//               <Stethoscope className="h-8 w-8 text-teal-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">Expert Doctors</h3>
//             <p className="text-gray-600">Connect with experienced specialists across various medical fields.</p>
//           </div>

//           <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
//             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//               <Calendar className="h-8 w-8 text-blue-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">Easy Booking</h3>
//             <p className="text-gray-600">Schedule appointments seamlessly with our intuitive booking system.</p>
//           </div>

//           <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
//             <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//               <MessageCircle className="h-8 w-8 text-purple-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">AI Assistant</h3>
//             <p className="text-gray-600">Get instant health advice from our intelligent AI chatbot.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const DoctorsPage = () => (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Doctors</h2>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {mockDoctors.map(doctor => (
//             <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
//               <div className="p-6">
//                 <div className="text-6xl mb-4 text-center">{doctor.image}</div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
//                 <p className="text-teal-600 font-semibold mb-2">{doctor.specialization}</p>
//                 <p className="text-gray-600 text-sm mb-4">{doctor.experience} experience</p>
                
//                 <div className="flex items-center mb-4">
//                   <Star className="h-5 w-5 text-yellow-400 fill-current" />
//                   <span className="ml-2 text-gray-700 font-semibold">{doctor.rating}</span>
//                   <span className="ml-2 text-gray-500 text-sm">({doctor.reviews} reviews)</span>
//                 </div>

//                 <div className="mb-4">
//                   <p className="text-sm text-gray-600 mb-2">Available:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {doctor.availability.map(day => (
//                       <span key={day} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs">
//                         {day}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button 
//                     onClick={() => setSelectedDoctor(doctor)}
//                     className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
//                   >
//                     Book Appointment
//                   </button>
//                   <button 
//                     onClick={() => {
//                       setSelectedDoctor(doctor);
//                       setCurrentPage('reviews');
//                     }}
//                     className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
//                   >
//                     Reviews
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedDoctor && currentPage === 'doctors' && (
//         <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} onBook={handleBookAppointment} />
//       )}
//     </div>
//   );

//   const BookingModal = ({ doctor, onClose, onBook }) => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedTime, setSelectedTime] = useState('');

//     const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl max-w-md w-full p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-800">Book Appointment</h3>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <div className="mb-6">
//             <p className="text-lg font-semibold text-gray-700">{doctor.name}</p>
//             <p className="text-teal-600">{doctor.specialization}</p>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
//             <input 
//               type="date" 
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               min={new Date().toISOString().split('T')[0]}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
//             <div className="grid grid-cols-3 gap-2">
//               {times.map(time => (
//                 <button
//                   key={time}
//                   type="button"
//                   onClick={() => setSelectedTime(time)}
//                   className={`py-2 rounded-lg border transition ${
//                     selectedTime === time 
//                       ? 'bg-teal-600 text-white border-teal-600' 
//                       : 'bg-white text-gray-700 border-gray-300 hover:border-teal-600'
//                   }`}
//                 >
//                   {time}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button 
//             onClick={() => onBook(doctor, selectedDate, selectedTime)}
//             disabled={!selectedDate || !selectedTime}
//             className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const AppointmentsPage = () => (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8">My Appointments</h2>
        
//         {appointments.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-12 text-center">
//             <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg mb-4">No appointments scheduled yet</p>
//             <button onClick={() => navigate('doctors')} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
//               Book an Appointment
//             </button>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {appointments.map(apt => (
//               <div key={apt.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800">{apt.doctor}</h3>
//                     <p className="text-teal-600">{apt.specialization}</p>
//                   </div>
//                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
//                     {apt.status}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray-600 mb-2">
//                   <Calendar className="h-5 w-5 mr-2" />
//                   <span>{apt.date}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <Clock className="h-5 w-5 mr-2" />
//                   <span>{apt.time}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const ReviewsPage = () => {
//     const [rating, setRating] = useState(5);
//     const [comment, setComment] = useState('');

//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <button onClick={() => setCurrentPage('doctors')} className="flex items-center text-teal-600 mb-6 hover:text-teal-700">
//             <ChevronRight className="h-5 w-5 transform rotate-180" />
//             Back to Doctors
//           </button>

//           {selectedDoctor && (
//             <>
//               <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//                 <div className="text-5xl mb-4 text-center">{selectedDoctor.image}</div>
//                 <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">{selectedDoctor.name}</h2>
//                 <p className="text-teal-600 text-center font-semibold mb-4">{selectedDoctor.specialization}</p>
//                 <div className="flex items-center justify-center mb-6">
//                   <Star className="h-6 w-6 text-yellow-400 fill-current" />
//                   <span className="ml-2 text-xl font-bold text-gray-700">{selectedDoctor.rating}</span>
//                   <span className="ml-2 text-gray-500">({selectedDoctor.reviews} reviews)</span>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Leave a Review</h3>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-semibold mb-2">Rating</label>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map(star => (
//                       <button
//                         key={star}
//                         type="button"
//                         onClick={() => setRating(star)}
//                         className="focus:outline-none"
//                       >
//                         <Star 
//                           className={`h-8 w-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-semibold mb-2">Your Review</label>
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     rows={4}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     placeholder="Share your experience..."
//                   />
//                 </div>
//                 <button 
//                   onClick={() => {
//                     handleSubmitReview(selectedDoctor.id, rating, comment);
//                     setComment('');
//                     setRating(5);
//                   }}
//                   className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
//                 >
//                   Submit Review
//                 </button>
//               </div>

//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Patient Reviews</h3>
//                 {reviews[selectedDoctor.id] && reviews[selectedDoctor.id].length > 0 ? (
//                   <div className="space-y-4">
//                     {reviews[selectedDoctor.id].map((review, idx) => (
//                       <div key={idx} className="border-b border-gray-200 pb-4">
//                         <div className="flex items-center mb-2">
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <Star 
//                                 key={i}
//                                 className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                               />
//                             ))}
//                           </div>
//                           <span className="ml-2 text-gray-600 text-sm">by {review.user}</span>
//                           <span className="ml-2 text-gray-400 text-sm">{review.date}</span>
//                         </div>
//                         <p className="text-gray-700">{review.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const DonationsPage = () => {
//     const [activeTab, setActiveTab] = useState('blood');
//     const [donorName, setDonorName] = useState('');
//     const [donorBloodGroup, setDonorBloodGroup] = useState('');
//     const [donorOrganType, setDonorOrganType] = useState('');
//     const [donorLocation, setDonorLocation] = useState('');
//     const [donorPhone, setDonorPhone] = useState('');
//     const [donorAvailable, setDonorAvailable] = useState(true);

//     const handleSubmitDonation = () => {
//       console.log('Button clicked!');
      
//       if (activeTab === 'blood') {
//         if (!donorName || !donorBloodGroup || !donorLocation || !donorPhone) {
//           alert('Please fill all required fields!');
//           return;
//         }
//         const newDonor = { 
//           id: Date.now(), 
//           name: donorName,
//           bloodGroup: donorBloodGroup,
//           location: donorLocation,
//           phone: donorPhone,
//           available: donorAvailable
//         };
//         console.log('Adding donor:', newDonor);
//         setDonors([...donors, newDonor]);
//         alert('Successfully registered as blood donor!');
        
//         // Reset form
//         setDonorName('');
//         setDonorBloodGroup('');
//         setDonorLocation('');
//         setDonorPhone('');
//         setDonorAvailable(true);
        
//         // Switch to donors tab
//         setTimeout(() => {
//           setActiveTab('donors');
//         }, 500);
//       } else {
//         if (!donorName || !donorOrganType || !donorLocation || !donorPhone) {
//           alert('Please fill all required fields!');
//           return;
//         }
//         alert('Successfully registered for organ donation!');
        
//         // Reset form
//         setDonorName('');
//         setDonorOrganType('');
//         setDonorLocation('');
//         setDonorPhone('');
//         setDonorAvailable(true);
//       }
//     };

//     const filteredDonors = searchBloodGroup 
//       ? donors.filter(d => d.bloodGroup === searchBloodGroup)
//       : donors;

//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-bold text-gray-800 mb-8">Donation Center</h2>

//           <div className="flex flex-wrap gap-4 mb-8">
//             <button
//               type="button"
//               onClick={() => setActiveTab('blood')}
//               className={`px-6 py-3 rounded-lg font-semibold transition ${
//                 activeTab === 'blood' 
//                   ? 'bg-teal-600 text-white' 
//                   : 'bg-white text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Droplet className="inline h-5 w-5 mr-2" />
//               Blood Donation
//             </button>
//             <button
//               type="button"
//               onClick={() => setActiveTab('organ')}
//               className={`px-6 py-3 rounded-lg font-semibold transition ${
//                 activeTab === 'organ' 
//                   ? 'bg-teal-600 text-white' 
//                   : 'bg-white text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Heart className="inline h-5 w-5 mr-2" />
//               Organ Donation
//             </button>
//             <button
//               type="button"
//               onClick={() => setActiveTab('donors')}
//               className={`px-6 py-3 rounded-lg font-semibold transition ${
//                 activeTab === 'donors' 
//                   ? 'bg-teal-600 text-white' 
//                   : 'bg-white text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Users className="inline h-5 w-5 mr-2" />
//               Find Donors
//             </button>
//           </div>

//           {(activeTab === 'blood' || activeTab === 'organ') && (
//             <div className="bg-white rounded-xl shadow-md p-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6">
//                 {activeTab === 'blood' ? 'Register as Blood Donor' : 'Register for Organ Donation'}
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
//                   <input
//                     type="text"
//                     value={donorName}
//                     onChange={(e) => setDonorName(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 {activeTab === 'blood' ? (
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">Blood Group *</label>
//                     <select
//                       value={donorBloodGroup}
//                       onChange={(e) => setDonorBloodGroup(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     >
//                       <option value="">Select Blood Group</option>
//                       <option value="A+">A+</option>
//                       <option value="A-">A-</option>
//                       <option value="B+">B+</option>
//                       <option value="B-">B-</option>
//                       <option value="AB+">AB+</option>
//                       <option value="AB-">AB-</option>
//                       <option value="O+">O+</option>
//                       <option value="O-">O-</option>
//                     </select>
//                   </div>
//                 ) : (
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">Organ Type *</label>
//                     <select
//                       value={donorOrganType}
//                       onChange={(e) => setDonorOrganType(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     >
//                       <option value="">Select Organ Type</option>
//                       <option value="Kidney">Kidney</option>
//                       <option value="Liver">Liver</option>
//                       <option value="Heart">Heart</option>
//                       <option value="Lungs">Lungs</option>
//                       <option value="Pancreas">Pancreas</option>
//                       <option value="Corneas">Corneas</option>
//                     </select>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-gray-700 font-semibold mb-2">Location *</label>
//                   <input
//                     type="text"
//                     value={donorLocation}
//                     onChange={(e) => setDonorLocation(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     placeholder="Enter your city/location"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
//                   <input
//                     type="tel"
//                     value={donorPhone}
//                     onChange={(e) => setDonorPhone(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     placeholder="+1234567890"
//                   />
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={donorAvailable}
//                     onChange={(e) => setDonorAvailable(e.target.checked)}
//                     className="mr-2 w-4 h-4"
//                   />
//                   <label className="text-gray-700">Available for donation</label>
//                 </div>

//                 <button 
//                   type="button"
//                   onClick={handleSubmitDonation}
//                   className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition cursor-pointer active:bg-teal-800"
//                 >
//                   Register as Donor
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeTab === 'donors' && (
//             <div>
//               <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//                 <label className="block text-gray-700 font-semibold mb-2">Search by Blood Group</label>
//                 <select
//                   value={searchBloodGroup}
//                   onChange={(e) => setSearchBloodGroup(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 >
//                   <option value="">All Blood Groups</option>
//                   <option value="A+">A+</option>
//                   <option value="A-">A-</option>
//                   <option value="B+">B+</option>
//                   <option value="B-">B-</option>
//                   <option value="AB+">AB+</option>
//                   <option value="AB-">AB-</option>
//                   <option value="O+">O+</option>
//                   <option value="O-">O-</option>
//                 </select>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredDonors.map(donor => (
//                   <div key={donor.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-800">{donor.name}</h3>
//                         <p className="text-teal-600 font-semibold text-lg">{donor.bloodGroup}</p>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                         donor.available 
//                           ? 'bg-green-100 text-green-700' 
//                           : 'bg-red-100 text-red-700'
//                       }`}>
//                         {donor.available ? 'Available' : 'Unavailable'}
//                       </span>
//                     </div>
//                     <div className="flex items-center text-gray-600 mb-2">
//                       <MapPin className="h-5 w-5 mr-2" />
//                       <span>{donor.location}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="h-5 w-5 mr-2" />
//                       <span>{donor.phone}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const DashboardPage = () => (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8">Welcome back, {user?.name}!</h2>

//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl shadow-lg">
//             <Calendar className="h-12 w-12 mb-4" />
//             <h3 className="text-2xl font-bold mb-2">{appointments.length}</h3>
//             <p className="text-teal-100">Upcoming Appointments</p>
//           </div>

//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
//             <Heart className="h-12 w-12 mb-4" />
//             <h3 className="text-2xl font-bold mb-2">{donors.length}</h3>
//             <p className="text-blue-100">Registered Donors</p>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
//             <MessageCircle className="h-12 w-12 mb-4" />
//             <h3 className="text-2xl font-bold mb-2">AI Assistant</h3>
//             <p className="text-purple-100">Always Available</p>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Appointments</h3>
//             {appointments.length > 0 ? (
//               <div className="space-y-4">
//                 {appointments.slice(0, 3).map(apt => (
//                   <div key={apt.id} className="border-l-4 border-teal-600 pl-4 py-2">
//                     <p className="font-semibold text-gray-800">{apt.doctor}</p>
//                     <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
//             )}
//             <button onClick={() => navigate('appointments')} className="mt-4 text-teal-600 hover:text-teal-700 font-semibold">
//               View All Appointments →
//             </button>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <button onClick={() => navigate('doctors')} className="w-full bg-teal-50 text-teal-700 py-3 px-4 rounded-lg hover:bg-teal-100 transition text-left flex items-center">
//                 <Stethoscope className="h-5 w-5 mr-3" />
//                 Book New Appointment
//               </button>
//               <button onClick={() => navigate('donations')} className="w-full bg-blue-50 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-100 transition text-left flex items-center">
//                 <Heart className="h-5 w-5 mr-3" />
//                 Register as Donor
//               </button>
//               <button onClick={() => setChatOpen(true)} className="w-full bg-purple-50 text-purple-700 py-3 px-4 rounded-lg hover:bg-purple-100 transition text-left flex items-center">
//                 <MessageCircle className="h-5 w-5 mr-3" />
//                 Chat with AI Assistant
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const ChatBot = () => {
//     const chatEndRef = React.useRef(null);
//     const inputRef = React.useRef(null);

//     React.useEffect(() => {
//       if (chatEndRef.current) {
//         chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, [chatMessages]);

//     const handleInputChange = (e) => {
//       setChatInput(e.target.value);
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();
//         handleSendMessage();
//       }
//     };

//     return (
//       <div className="fixed bottom-4 right-4 z-50">
//         {!chatOpen ? (
//           <button 
//             onClick={() => setChatOpen(true)}
//             className="bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition transform hover:scale-110"
//           >
//             <MessageCircle className="h-6 w-6" />
//           </button>
//         ) : (
//           <div className="bg-white rounded-xl shadow-2xl w-80 md:w-96 h-96 flex flex-col">
//             <div className="bg-teal-600 text-white p-4 rounded-t-xl flex justify-between items-center">
//               <div className="flex items-center">
//                 <MessageCircle className="h-5 w-5 mr-2" />
//                 <span className="font-semibold">AI Health Assistant</span>
//               </div>
//               <button onClick={() => setChatOpen(false)} className="hover:bg-teal-700 p-1 rounded">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {chatMessages.map((msg, idx) => (
//                 <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-xs px-4 py-2 rounded-lg break-words ${
//                     msg.type === 'user' 
//                       ? 'bg-teal-600 text-white' 
//                       : 'bg-gray-200 text-gray-800'
//                   }`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>

//             <div className="p-4 border-t border-gray-200">
//               <div className="flex gap-2">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={chatInput}
//                   onChange={handleInputChange}
//                   onKeyDown={handleKeyDown}
//                   placeholder="Type your message..."
//                   className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   autoComplete="off"
//                 />
//                 <button 
//                   type="button"
//                   onClick={handleSendMessage}
//                   className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition flex-shrink-0"
//                 >
//                   <Send className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const Footer = () => (
//     <footer className="bg-gray-800 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Activity className="h-8 w-8 text-teal-400" />
//               <span className="text-2xl font-bold">HealthCare+</span>
//             </div>
//             <p className="text-gray-400">Your trusted healthcare partner for a healthier tomorrow.</p>
//           </div>

//           <div>
//             <h4 className="text-lg font-bold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li><button onClick={() => navigate('doctors')} className="text-gray-400 hover:text-white">Find Doctors</button></li>
//               <li><button onClick={() => navigate('appointments')} className="text-gray-400 hover:text-white">Book Appointment</button></li>
//               <li><button onClick={() => navigate('donations')} className="text-gray-400 hover:text-white">Donate</button></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-lg font-bold mb-4">Contact</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +1 (555) 123-4567</li>
//               <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> info@healthcareplus.com</li>
//               <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> 123 Health Street, Medical City</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-lg font-bold mb-4">About</h4>
//             <p className="text-gray-400">Providing quality healthcare services with compassion and excellence since 2020.</p>
//           </div>
//         </div>

//         <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
//           <p>&copy; 2025 HealthCare+. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <div className="flex-1">
//         {currentPage === 'home' && <HomePage />}
//         {currentPage === 'doctors' && <DoctorsPage />}
//         {currentPage === 'appointments' && <AppointmentsPage />}
//         {currentPage === 'reviews' && <ReviewsPage />}
//         {currentPage === 'donations' && <DonationsPage />}
//         {currentPage === 'dashboard' && <DashboardPage />}
//       </div>

//       <Footer />
//       <ChatBot />
//       {showAuthModal && <AuthModal />}
//     </div>
//   );
// };

// export default App;