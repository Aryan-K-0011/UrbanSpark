import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { BookingPage } from './pages/Booking';
import { GalleryPage } from './pages/Gallery';
import { ContactPage } from './pages/Contact';
import { AboutPage } from './pages/About';
import { PricingPage } from './pages/Pricing';
import { TestimonialsPage } from './pages/Testimonials';
import { FAQPage } from './pages/FAQ';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { TrackBooking } from './pages/TrackBooking';
import { ServiceCategory } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Service Pages */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/home" element={<ServicesPage category={ServiceCategory.HOME} />} />
              <Route path="/services/commercial" element={<ServicesPage category={ServiceCategory.COMMERCIAL} />} />
              <Route path="/services/vehicle" element={<ServicesPage category={ServiceCategory.VEHICLE} />} />
              <Route path="/services/:id" element={<ServiceDetail />} />

              <Route path="/booking" element={<BookingPage />} />
              <Route path="/track" element={<TrackBooking />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </Layout>
        } />

        {/* Admin Routes - No Public Layout/Footer */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;