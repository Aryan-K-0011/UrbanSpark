import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';

export const PricingPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Transparent Pricing</h1>
          <p className="text-lg text-slate-600">
            No hidden fees. Choose the package that fits your needs and budget.
          </p>
        </div>

        <div className="space-y-16">
          {SERVICES.map((service) => (
            <div key={service.id} className="scroll-mt-24" id={service.id}>
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                 <div className="h-px bg-slate-200 flex-grow"></div>
                 <Link to={`/services/${service.id}`} className="text-primary-600 text-sm font-semibold hover:underline">View Service Details</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.packages.map((pkg, i) => (
                  <motion.div 
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white rounded-2xl p-8 border-2 flex flex-col ${i === 1 ? 'border-primary-500 shadow-xl relative' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    {i === 1 && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
                    )}
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-slate-900 mb-2">${pkg.price}</div>
                    <p className="text-slate-500 text-sm mb-6 flex items-center gap-2">
                        <Info size={14} /> Est. Time: {pkg.duration}
                    </p>
                    
                    <div className="flex-grow">
                        <ul className="space-y-3 mb-8">
                            {pkg.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-600">
                                    <div className="mt-1 bg-green-100 p-0.5 rounded-full">
                                        <Check size={12} className="text-green-600" />
                                    </div>
                                    <span className="text-sm">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link 
                      to="/booking"
                      className={`block w-full py-3 rounded-xl font-bold text-center transition-colors ${i === 1 ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                    >
                        Book Now
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};