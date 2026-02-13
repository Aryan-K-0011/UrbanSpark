import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50">
       <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Loved by Locals</h1>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Here is what our community has to say about the Urban Spark experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
                <motion.div
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative"
                >
                    <Quote className="absolute top-8 right-8 text-primary-100" size={40} />
                    <div className="flex gap-1 text-yellow-400 mb-6">
                         {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-slate-600 mb-6 leading-relaxed relative z-10">
                        "{t.content}"
                    </p>
                    <div className="flex items-center gap-4">
                        <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-primary-100" />
                        <div>
                            <h4 className="font-bold text-slate-900">{t.name}</h4>
                            <span className="text-sm text-primary-600 font-medium">{t.role}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* Google Reviews Badge Mockup */}
        <div className="mt-20 flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto text-center">
            <h3 className="font-bold text-2xl mb-2">Excellent 4.9/5 Rating</h3>
            <div className="flex gap-2 text-yellow-400 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
            </div>
            <p className="text-slate-500">Based on 1200+ reviews on Google & Social Media</p>
        </div>

       </div>
    </div>
  );
};