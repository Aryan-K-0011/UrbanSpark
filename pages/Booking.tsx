import React from 'react';
import { BookingWizard } from '../components/BookingWizard';

export const BookingPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Book Your Service</h1>
          <p className="text-slate-600">Simple 4-step booking process. No payment required until the job is done.</p>
        </div>
        <BookingWizard />
      </div>
    </div>
  );
};