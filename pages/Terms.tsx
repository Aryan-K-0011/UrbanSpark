import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
        <h1>Terms & Conditions</h1>
        <p className="lead">Last updated: January 1, 2024</p>

        <h3>1. Acceptance of Terms</h3>
        <p>By accessing or using our website and services, you agree to be bound by these Terms & Conditions and our Privacy Policy.</p>

        <h3>2. Service Booking</h3>
        <p>All bookings are subject to availability. We reserve the right to refuse service to anyone for any reason at any time.</p>

        <h3>3. Cancellations & Refunds</h3>
        <p>Cancellations made less than 24 hours before the scheduled service time may be subject to a cancellation fee. Refunds are processed according to our satisfaction guarantee policy.</p>

        <h3>4. Liability</h3>
        <p>Urban Spark is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
        
        <h3>5. Changes to Terms</h3>
        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website.</p>
      </div>
    </div>
  );
};