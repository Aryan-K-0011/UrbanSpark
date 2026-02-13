import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Phone, MessageCircle, ChevronDown, Package, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  
  // Secret Admin Access Logic
  const [secretClicks, setSecretClicks] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServiceDropdownOpen(false);
    setSecretClicks(0); // Reset clicks on route change
  }, [location]);

  const handleSecretClick = () => {
    const newCount = secretClicks + 1;
    setSecretClicks(newCount);
    if (newCount === 5) {
      navigate('/admin-login');
      setSecretClicks(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-2.5 rounded-xl shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-105">
                    <Droplets size={24} className="fill-white/20 stroke-[2.5]" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 bg-white text-yellow-500 p-0.5 rounded-full shadow-sm border border-slate-100 animate-pulse">
                    <Sparkles size={14} className="fill-current" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className={`text-2xl font-heading font-bold leading-none ${isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>
                    Urban<span className="text-primary-500">Spark</span>
                </span>
                <span className={`text-[0.65rem] uppercase tracking-[0.2em] font-bold ${isScrolled ? 'text-slate-500' : 'text-slate-500 md:text-slate-300'}`}>
                    Cleaning Co.
                </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-medium hover:text-primary-500 transition-colors ${isScrolled || location.pathname !== '/' ? 'text-slate-700' : 'text-slate-100'}`}>Home</Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 font-medium hover:text-primary-500 transition-colors ${isScrolled || location.pathname !== '/' ? 'text-slate-700' : 'text-slate-100'}`}
              >
                Services <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <Link to="/services" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">All Services</Link>
                <Link to="/services/home" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">Home Cleaning</Link>
                <Link to="/services/commercial" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">Commercial</Link>
                <Link to="/services/vehicle" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">Vehicle Wash</Link>
              </div>
            </div>

            <Link to="/pricing" className={`font-medium hover:text-primary-500 transition-colors ${isScrolled || location.pathname !== '/' ? 'text-slate-700' : 'text-slate-100'}`}>Pricing</Link>
            <Link to="/track" className={`font-medium hover:text-primary-500 transition-colors ${isScrolled || location.pathname !== '/' ? 'text-slate-700' : 'text-slate-100'}`}>Track Order</Link>
            
            {/* More Dropdown */}
             <div className="relative group">
              <button 
                className={`flex items-center gap-1 font-medium hover:text-primary-500 transition-colors ${isScrolled || location.pathname !== '/' ? 'text-slate-700' : 'text-slate-100'}`}
              >
                More <ChevronDown size={16} />
              </button>
              <div className="absolute top-full right-0 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <Link to="/about" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">About Us</Link>
                <Link to="/testimonials" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">Reviews</Link>
                <Link to="/gallery" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">Gallery</Link>
                <Link to="/faq" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">FAQ</Link>
                <Link to="/contact" className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600">Contact</Link>
              </div>
            </div>

            <Link
              to="/booking"
              className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:bg-primary-700 hover:shadow-primary-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={28} className="text-slate-900"/> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-0 left-0 w-full bg-white z-40 overflow-y-auto"
          >
            <div className="p-6 pt-24 flex flex-col gap-6">
              <Link to="/" className="text-xl font-medium text-slate-900">Home</Link>
              
              <div>
                <button onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)} className="flex items-center justify-between w-full text-xl font-medium text-slate-900">
                  Services <ChevronDown size={20} className={`transform transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServiceDropdownOpen && (
                  <div className="pl-4 mt-4 flex flex-col gap-3 border-l-2 border-slate-100">
                    <Link to="/services" className="text-lg text-slate-600">All Services</Link>
                    <Link to="/services/home" className="text-lg text-slate-600">Home Cleaning</Link>
                    <Link to="/services/commercial" className="text-lg text-slate-600">Commercial</Link>
                    <Link to="/services/vehicle" className="text-lg text-slate-600">Vehicle Wash</Link>
                  </div>
                )}
              </div>

              <Link to="/pricing" className="text-xl font-medium text-slate-900">Pricing</Link>
              <Link to="/track" className="text-xl font-medium text-slate-900">Track Order</Link>
              <Link to="/gallery" className="text-xl font-medium text-slate-900">Gallery</Link>
              <Link to="/about" className="text-xl font-medium text-slate-900">About Us</Link>
              <Link to="/testimonials" className="text-xl font-medium text-slate-900">Reviews</Link>
              <Link to="/faq" className="text-xl font-medium text-slate-900">FAQ</Link>
              <Link to="/contact" className="text-xl font-medium text-slate-900">Contact</Link>
              
              <Link
                to="/booking"
                className="bg-primary-600 text-white text-center px-6 py-4 rounded-xl font-semibold mt-4 text-lg"
              >
                Book a Service
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white mb-4">
                 <div className="relative">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-2.5 rounded-xl">
                        <Droplets size={22} className="fill-white/20 stroke-[2.5]" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 bg-slate-900 text-yellow-500 p-0.5 rounded-full border border-slate-700">
                        <Sparkles size={12} className="fill-current" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-heading font-bold leading-none">Urban<span className="text-primary-500">Spark</span></span>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 font-bold">Cleaning Co.</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Premium cleaning and washing services designed for modern urban lifestyles. We bring the sparkle back to your spaces.
              </p>
            </div>

            <div>
              <h4 className="text-white font-heading font-semibold text-lg mb-6">Services</h4>
              <ul className="space-y-3">
                <li><Link to="/services/home" className="hover:text-primary-400 transition-colors">Home Cleaning</Link></li>
                <li><Link to="/services/commercial" className="hover:text-primary-400 transition-colors">Commercial Cleaning</Link></li>
                <li><Link to="/services/vehicle" className="hover:text-primary-400 transition-colors">Car & Bike Wash</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-heading font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                <li><Link to="/track" className="hover:text-primary-400 transition-colors">Track Booking</Link></li>
                <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
                <li><Link to="/testimonials" className="hover:text-primary-400 transition-colors">Reviews</Link></li>
                <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-heading font-semibold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-500" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-primary-500" />
                  <span>WhatsApp Support</span>
                </li>
                <li className="text-sm text-slate-400">
                  123 Clean Street, Spark City, SC 90210
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p 
              onClick={handleSecretClick} 
              className="cursor-default select-none transition-colors hover:text-slate-400"
            >
              &copy; 2024 Urban Spark. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 flex flex-col gap-4">
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
            <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
};