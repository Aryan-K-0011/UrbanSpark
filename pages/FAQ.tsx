import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600">
            Everything you need to know about our services, booking, and guarantees.
          </p>
        </div>

        <div className="space-y-4">
            {FAQS.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <span className="font-bold text-lg text-slate-900">{faq.question}</span>
                        <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-primary-600 text-white' : 'bg-white text-slate-400'}`}>
                            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                        </div>
                    </button>
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-200/50">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>

        <div className="mt-16 text-center bg-primary-50 rounded-3xl p-10 border border-primary-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
            <p className="text-slate-600 mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
            <Link to="/contact" className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                Contact Us
            </Link>
        </div>
      </div>
    </div>
  );
};