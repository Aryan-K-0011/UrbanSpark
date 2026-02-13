import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { ServiceCategory } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ServicesPageProps {
    category?: ServiceCategory;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ category }) => {
  const [filter, setFilter] = useState<ServiceCategory | 'All'>('All');
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
        setFilter(category);
    } else {
        setFilter('All');
    }
  }, [category]);

  const filteredServices = filter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === filter);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
             <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-2 block">
                {category ? 'Specialized Services' : 'Our Capabilities'}
             </span>
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                 {category ? `${category} Services` : 'Premium Cleaning Solutions'}
             </h1>
             <p className="text-lg text-slate-600">
                {category 
                    ? `Professional ${category.toLowerCase()} services tailored to your specific needs.`
                    : "Explore our wide range of cleaning and washing solutions tailored for your specific needs."
                }
             </p>
          </motion.div>
        </div>

        {/* Filter Tabs - Only show if no category prop is passed */}
        {!category && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', ...Object.values(ServiceCategory)].map((cat) => (
                <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                    filter === cat
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
                >
                {cat}
                </button>
            ))}
            </div>
        )}

        {/* Services List */}
        <div className="space-y-12">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 relative group cursor-pointer" onClick={() => navigate(`/services/${service.id}`)}>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover min-h-[300px] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-primary-600">
                  {service.category}
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                        {service.icon && <service.icon size={24} />}
                    </div>
                    <Link to={`/services/${service.id}`} className="hover:text-primary-600 transition-colors">
                        <h2 className="text-3xl font-heading font-bold text-slate-900">{service.title}</h2>
                    </Link>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {service.packages.map((pkg) => (
                    <div key={pkg.id} className="border border-slate-200 rounded-xl p-4 hover:border-primary-400 hover:bg-primary-50/30 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-900">{pkg.name}</h4>
                        <span className="text-primary-600 font-bold">${pkg.price}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                        {pkg.duration}
                      </p>
                      <ul className="space-y-1">
                        {pkg.features.slice(0, 2).map((f, i) => (
                          <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-500" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                    <Link 
                    to="/booking" 
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                    >
                    Book Now
                    </Link>
                    <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                    >
                    View Details <ArrowRight size={18} />
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};