import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: January 1, 2024</p>
        
        <p>At Urban Spark, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information.</p>

        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create an account, book a service, or contact customer support. This may include your name, email address, phone number, and address.</p>

        <h3>2. How We Use Your Information</h3>
        <p>We use your information to provide, maintain, and improve our services, process transactions, and communicate with you about your bookings and our services.</p>

        <h3>3. Data Security</h3>
        <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        
        <h3>4. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@urbanspark.com.</p>
      </div>
    </div>
  );
};