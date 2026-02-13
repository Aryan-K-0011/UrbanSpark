import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ShieldCheck, Star, ArrowRight } from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return <div className="pt-32 text-center text-slate-500">Service not found</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
        {/* Hero */}
        <div className="relative h-[60vh]">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md mb-4 text-sm font-semibold tracking-wider uppercase"
                    >
                        {service.category}
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-bold mb-6"
                    >
                        {service.title}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-200"
                    >
                        {service.description}
                    </motion.p>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-heading font-bold mb-4 text-slate-900">About This Service</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {service.longDescription || service.description}
                            </p>
                        </div>

                        {service.benefits && (
                            <div>
                                <h3 className="text-xl font-bold mb-6 text-slate-900">Why Choose Us?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 bg-primary-50/50 rounded-xl border border-primary-100">
                                            <ShieldCheck className="text-primary-600 mt-1 shrink-0" size={20} />
                                            <span className="text-slate-700 font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {service.process && (
                            <div>
                                <h3 className="text-xl font-bold mb-6 text-slate-900">Our Cleaning Process</h3>
                                <div className="space-y-6 relative before:absolute before:left-[19px] before:top-0 before:h-full before:w-[2px] before:bg-slate-200">
                                    {service.process.map((step, i) => (
                                        <div key={i} className="flex gap-6 relative">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0 relative z-10 border-4 border-white shadow-md">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h4>
                                                <p className="text-slate-600">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Packages */}
                    <div className="space-y-8">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 text-slate-900">Available Packages</h3>
                            <div className="space-y-4">
                                {service.packages.map((pkg) => (
                                    <div key={pkg.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-primary-400 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-slate-800">{pkg.name}</h4>
                                            <span className="text-primary-600 font-bold text-lg">${pkg.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                            <Clock size={14} /> {pkg.duration}
                                        </div>
                                        <ul className="space-y-2 mb-4">
                                            {pkg.features.map((f, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link 
                                            to="/booking"
                                            className="block w-full text-center bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                                        >
                                            Select Package
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary-600 p-8 rounded-2xl text-white text-center">
                            <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                            <p className="mb-6 opacity-90">Unsure which package is right for you? Call our support team.</p>
                            <a href="tel:+15551234567" className="inline-block bg-white text-primary-600 px-6 py-2 rounded-lg font-bold">Call Now</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};