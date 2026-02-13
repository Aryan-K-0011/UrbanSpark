import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Clock, Users } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import { ServiceCategory } from '../types';

export const Home: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getCategoryLink = (cat: ServiceCategory) => {
    switch (cat) {
        case ServiceCategory.HOME: return '/services/home';
        case ServiceCategory.COMMERCIAL: return '/services/commercial';
        case ServiceCategory.VEHICLE: return '/services/vehicle';
        default: return '/services';
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?random=99" 
            alt="Clean Home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 border border-primary-500/50 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-md">
              #1 Premium Cleaning Service
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              Experience the <br/>
              <span className="text-primary-400">Urban Spark</span> Difference
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">
              Professional cleaning for your home, office, and vehicle. We bring premium hygiene standards to your doorstep.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/booking" className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all hover:scale-105 shadow-xl shadow-primary-900/20">
                Book a Service
              </Link>
              <Link to="/services" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-600 mb-2">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800">Verified Experts</h3>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-600 mb-2">
                        <Star size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800">5-Star Quality</h3>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-600 mb-2">
                        <Clock size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800">On-Time Service</h3>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-600 mb-2">
                        <Users size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800">10k+ Happy Clients</h3>
                </div>
            </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Our Core Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Tailored cleaning solutions for every aspect of your life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                cat: ServiceCategory.HOME, 
                img: 'https://busybucket.in/wp-content/uploads/2022/06/deep-home-cleaning.jpg', 
                desc: 'From deep cleaning to kitchen sanitization.' 
              },
              { 
                cat: ServiceCategory.COMMERCIAL, 
                img: 'https://pinkcleanindia.com/wp-content/uploads/2024/03/best-office-cleaning-service-in-jp-nagar-bangalore.webp', 
                desc: 'Maintain a pristine workspace.' 
              },
              { 
                cat: ServiceCategory.VEHICLE, 
                img: 'https://osren.com/blog/wp-content/uploads/2022/05/Pic1.jpg', 
                desc: 'Premium doorstep car & bike care.' 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl"
              >
                <Link to={getCategoryLink(item.cat)} className="absolute inset-0 z-20">
                  <span className="sr-only">View {item.cat}</span>
                </Link>
                <img src={item.img} alt={item.cat} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.cat}</h3>
                  <p className="text-slate-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">{item.desc}</p>
                  <div className="inline-flex items-center text-primary-400 font-semibold gap-2 group-hover:text-primary-300">
                    Explore <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">Most Popular Packages</h2>
                <p className="text-slate-500">Curated packages chosen by our customers.</p>
             </div>
             <Link to="/services" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700">
                View All <ArrowRight size={20} />
             </Link>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {SERVICES.slice(0, 3).map((service) => (
              <motion.div key={service.id} variants={item} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-2 text-primary-600 mb-3">
                        {service.icon && <service.icon size={20} />}
                        <span className="text-xs font-bold uppercase tracking-wider">{service.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm mb-6">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-slate-900 font-bold">From ${service.packages[0].price}</span>
                        <Link to="/booking" className="text-sm font-semibold text-primary-600 hover:text-primary-700">Book Now</Link>
                    </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-900/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Client Stories</h2>
                <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-primary-500/50 transition-colors">
                        <div className="flex items-center gap-1 text-yellow-400 mb-4">
                            {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-slate-300 italic mb-6">"{t.content}"</p>
                        <div className="flex items-center gap-4">
                            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary-500" />
                            <div>
                                <h4 className="font-bold text-white">{t.name}</h4>
                                <span className="text-xs text-primary-400">{t.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};