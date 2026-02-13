import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Globe, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Redefining Cleanliness</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Urban Spark was born from a simple idea: that a clean environment leads to a clear mind. 
            We aren't just a cleaning company; we are your partners in maintaining a premium lifestyle.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl"
            >
                <img src="https://picsum.photos/800/800?random=50" alt="Team" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h3 className="text-primary-600 font-bold uppercase tracking-wider mb-2">Our Story</h3>
                <h2 className="text-3xl font-heading font-bold mb-6">Started in 2020, Growing Strong</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                    What began as a small team of 3 dedicated professionals has now grown into a city-wide network of over 50 expert cleaners. We identified a gap in the market for reliable, high-end cleaning services that respect the client's time and property.
                </p>
                <p className="text-slate-600 leading-relaxed">
                    Today, Urban Spark serves thousands of homes and commercial establishments, setting a new benchmark for hygiene and customer service in the industry.
                </p>
            </motion.div>
        </div>

        {/* Values */}
        <div className="bg-slate-50 rounded-3xl p-12 mb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-bold">Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { icon: Sparkles, title: "Excellence", desc: "We never cut corners. Every speck of dust is our enemy." },
                    { icon: Heart, title: "Care", desc: "We treat your home and vehicles with the same respect as our own." },
                    { icon: Globe, title: "Sustainability", desc: "Eco-friendly products that are safe for pets and the planet." },
                    { icon: Award, title: "Integrity", desc: "Transparent pricing. No hidden fees. Honest work." }
                ].map((v, i) => (
                    <div key={i} className="text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 mx-auto mb-4">
                            <v.icon size={32} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">{v.title}</h4>
                        <p className="text-slate-500 text-sm">{v.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Team CTA */}
        <div className="bg-primary-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="relative z-10">
                 <h2 className="text-3xl font-heading font-bold mb-4">Join the Spark Revolution</h2>
                 <p className="mb-8 max-w-xl mx-auto text-primary-100">Ready to experience the best? Book your first service today and get 10% off.</p>
                 <a href="#/booking" className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors">Get Started</a>
             </div>
        </div>

      </div>
    </div>
  );
};