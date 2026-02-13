import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactPage: React.FC = () => {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSent(true);
    }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6"
            >
                Get in <span className="text-primary-600">Touch</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-600"
            >
                Have questions about our premium cleaning packages or need a custom quote? We are here to help you create a sparkling environment.
            </motion.p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]"
        >
            
            {/* Info Side (Dark) */}
            <div className="lg:w-5/12 bg-slate-900 text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                {/* Abstract Shapes */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-600 rounded-full blur-[80px] opacity-40"></div>
                <div className="absolute bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-[60px] opacity-30"></div>
                
                <div className="relative z-10">
                    <h2 className="text-2xl font-heading font-bold mb-2">Contact Information</h2>
                    <p className="text-slate-400 mb-10 text-sm">Fill up the form and our team will get back to you within 24 hours.</p>
                    
                    <div className="space-y-8">
                        <div className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                <Phone size={22} />
                            </div>
                            <div>
                                <h4 className="text-sm text-slate-400 mb-1">Call Us</h4>
                                <p className="font-semibold text-lg tracking-wide">+1 (555) 123-4567</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                <Mail size={22} />
                            </div>
                            <div>
                                <h4 className="text-sm text-slate-400 mb-1">Email Us</h4>
                                <p className="font-semibold text-lg tracking-wide">support@urbanspark.com</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h4 className="text-sm text-slate-400 mb-1">Visit Us</h4>
                                <p className="font-semibold text-lg tracking-wide">123 Spark Avenue, NY</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                <Clock size={22} />
                            </div>
                            <div>
                                <h4 className="text-sm text-slate-400 mb-1">Working Hours</h4>
                                <p className="font-semibold text-lg tracking-wide">Mon - Sat: 8 AM - 7 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                    <button className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl transition-all font-bold shadow-lg shadow-green-900/20 transform hover:-translate-y-1">
                        <MessageCircle size={22} /> Chat on WhatsApp
                    </button>
                </div>
            </div>

            {/* Form Side (Light) */}
            <div className="lg:w-7/12 p-10 md:p-14 bg-white relative">
                {sent ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center p-6"
                    >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">Message Sent!</h3>
                        <p className="text-slate-500 text-lg max-w-md mx-auto">
                            Thank you for contacting Urban Spark. We have received your message and will respond within 24 hours.
                        </p>
                        <button 
                            onClick={() => setSent(false)} 
                            className="mt-8 text-primary-600 font-semibold hover:underline"
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-8">
                            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Send a Message</h2>
                            <p className="text-slate-500">We'd love to hear from you. Please fill out this form.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm placeholder:text-slate-300 text-slate-900" 
                                    placeholder="John Doe" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                                <input 
                                    required 
                                    type="tel" 
                                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm placeholder:text-slate-300 text-slate-900" 
                                    placeholder="+1 (000) 000-0000" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <input 
                                required 
                                type="email" 
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm placeholder:text-slate-300 text-slate-900" 
                                placeholder="john@example.com" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                            <textarea 
                                required 
                                rows={4} 
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm placeholder:text-slate-300 text-slate-900 resize-none" 
                                placeholder="Tell us about your cleaning needs..."
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'} 
                                {!loading && <Send size={20} />}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </motion.div>
      </div>
    </div>
  );
};