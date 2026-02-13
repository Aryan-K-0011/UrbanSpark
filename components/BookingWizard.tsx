import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Calendar, User, ArrowLeft, Loader2, Plus, Trash2, CreditCard, Wallet, Smartphone, MapPin } from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceCategory, BookingState, CartItem } from '../types';
import { Link } from 'react-router-dom';

export const BookingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Selection State
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Booking Data
  const [bookingData, setBookingData] = useState<Partial<BookingState>>({
    date: '',
    time: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    paymentMethod: 'Online'
  });

  // Payment Mock State
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);

  // Cart Logic
  const addToCart = (pkgId: string) => {
    if (!selectedService) return;
    const pkg = selectedService.packages.find(p => p.id === pkgId);
    if (!pkg) return;

    const newItem: CartItem = {
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      packageId: pkg.id,
      packageName: pkg.name,
      price: pkg.price,
      duration: pkg.duration
    };

    setCart([...cart, newItem]);
    setSelectedServiceId(null); // Reset selection to allow more
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // Handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // Only numbers
    setBookingData({ ...bookingData, customerPhone: val });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate Payment if Online
    if (bookingData.paymentMethod === 'Online') {
        setPaymentProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Payment delay
        setPaymentProcessing(false);
    } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const transactionId = bookingData.paymentMethod === 'Online' ? 'TXN' + Math.floor(Math.random() * 10000000) : undefined;

    // Finalize data
    const newBooking: BookingState = {
        id: bookingId,
        items: cart,
        totalAmount: cartTotal * 1.05, // Including tax
        date: bookingData.date || '',
        time: bookingData.time || '',
        customerName: bookingData.customerName || '',
        customerEmail: bookingData.customerEmail || '',
        customerPhone: bookingData.customerPhone || '',
        address: bookingData.address || '',
        status: 'Pending',
        paymentStatus: bookingData.paymentMethod === 'Online' ? 'Paid' : 'Pending',
        paymentMethod: bookingData.paymentMethod || 'Cash',
        transactionId: transactionId,
        createdAt: new Date().toISOString()
    };

    // Save to LocalStorage (Simulating Database)
    const existingBookings = JSON.parse(localStorage.getItem('urban_spark_bookings') || '[]');
    localStorage.setItem('urban_spark_bookings', JSON.stringify([newBooking, ...existingBookings]));

    setLoading(false);
    setCompleted(true);
    setBookingData({ ...bookingData, id: bookingId }); // Store ID for success message
  };

  const steps = [
    { num: 1, title: "Select Services" },
    { num: 2, title: "Schedule" },
    { num: 3, title: "Details" },
    { num: 4, title: "Payment" }
  ];

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mx-4 md:mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
        <p className="text-slate-500 mb-4">Your Booking ID</p>
        <div className="bg-slate-100 py-3 px-6 rounded-lg inline-block font-mono text-lg md:text-xl font-bold tracking-widest text-slate-800 mb-6 border border-slate-200">
            {bookingData.id}
        </div>
        <p className="text-slate-600 mb-8 text-sm md:text-base">
          Thank you, {bookingData.customerName}. We have sent a confirmation email to {bookingData.customerEmail}.
          You can track your service status using the ID above.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/track"
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 w-full sm:w-auto"
            >
              Track Order
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 w-full sm:w-auto"
            >
              Book Another
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Progress Bar */}
      <div className="bg-slate-50 p-6 border-b border-slate-100">
        <div className="flex justify-between items-center relative max-w-3xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-0"></div>
          {steps.map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= s.num ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > s.num ? <Check size={20} /> : s.num}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step >= s.num ? 'text-slate-900' : 'text-slate-500'}`}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[500px]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-10">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Services Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {!selectedServiceId ? (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                            <h2 className="text-2xl font-heading font-bold">Add Services</h2>
                            <div className="flex flex-wrap gap-2">
                                {['All', ...Object.values(ServiceCategory)].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat as any)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                            activeCategory === cat 
                                            ? 'bg-primary-600 text-white' 
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {SERVICES
                            .filter(s => activeCategory === 'All' || s.category === activeCategory)
                            .map(service => (
                                <div
                                key={service.id}
                                onClick={() => setSelectedServiceId(service.id)}
                                className="cursor-pointer border border-slate-200 rounded-xl p-3 hover:border-primary-400 hover:shadow-md transition-all flex gap-4 items-center group bg-white"
                                >
                                <img src={service.image} alt={service.title} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <h3 className="font-bold text-slate-800 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                                    <p className="text-xs text-slate-500 line-clamp-2">{service.description}</p>
                                    <span className="text-xs font-semibold text-primary-500 mt-1 inline-block">Select Package →</span>
                                </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={() => setSelectedServiceId(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4">
                            <ArrowLeft size={16} /> Back to Services
                        </button>
                        <h2 className="text-2xl font-heading font-bold mb-1">{selectedService?.title}</h2>
                        <p className="text-slate-500 mb-6">Select a package to add to cart</p>

                        <div className="grid grid-cols-1 gap-4">
                            {selectedService?.packages.map((pkg) => (
                                <div key={pkg.id} className="border-2 border-slate-100 rounded-xl p-5 hover:border-primary-400 transition-all bg-white relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-lg">{pkg.name}</h4>
                                            <p className="text-sm text-slate-500">{pkg.duration}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-slate-900">${pkg.price}</div>
                                            <button 
                                                onClick={() => addToCart(pkg.id)}
                                                className="mt-2 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 ml-auto"
                                            >
                                                <Plus size={14} /> Add
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {pkg.features.slice(0,3).map((f, i) => (
                                            <span key={i} className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100">{f}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
              </motion.div>
            )}

            {/* Step 2: Schedule */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6">When should we arrive?</h2>
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Select Date</label>
                        <input 
                            type="date"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                            value={bookingData.date}
                            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Select Time</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setBookingData({...bookingData, time: t})}
                                    className={`py-3 px-2 text-sm font-medium rounded-xl border transition-all ${
                                        bookingData.time === t
                                        ? 'bg-primary-600 text-white border-primary-600 shadow-lg'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6">Contact & Location</h2>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input 
                            type="text"
                            required
                            placeholder="Ex. John Doe"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                            value={bookingData.customerName}
                            onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="tel"
                                    required
                                    placeholder="Ex. 9876543210"
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={bookingData.customerPhone}
                                    onChange={handlePhoneChange}
                                    maxLength={10}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input 
                                type="email"
                                required
                                placeholder="john@example.com"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                                value={bookingData.customerEmail}
                                onChange={(e) => setBookingData({...bookingData, customerEmail: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Service Address</label>
                        <div className="relative">
                             <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <textarea 
                                required
                                rows={3}
                                placeholder="House No, Street, Landmark, City, Pincode"
                                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                                value={bookingData.address}
                                onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6">Payment Method</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button 
                        onClick={() => setBookingData({...bookingData, paymentMethod: 'Online'})}
                        className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                            bookingData.paymentMethod === 'Online' 
                            ? 'border-primary-500 bg-primary-50 text-primary-700' 
                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                        }`}
                    >
                        <CreditCard size={24} />
                        <span className="font-bold">Pay Online</span>
                    </button>
                    <button 
                        onClick={() => setBookingData({...bookingData, paymentMethod: 'Cash'})}
                        className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                            bookingData.paymentMethod === 'Cash' 
                            ? 'border-primary-500 bg-primary-50 text-primary-700' 
                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                        }`}
                    >
                        <Wallet size={24} />
                        <span className="font-bold">Pay on Service</span>
                    </button>
                </div>

                {bookingData.paymentMethod === 'Online' && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">Card Details</h3>
                            <div className="flex gap-2">
                                <div className="w-8 h-5 bg-blue-600 rounded"></div>
                                <div className="w-8 h-5 bg-red-500 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Card Number</label>
                                <input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 mt-1 outline-none focus:border-primary-500"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g,'').replace(/(.{4})/g, '$1 ').trim())}
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Expiry</label>
                                    <input 
                                        type="text" 
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 mt-1 outline-none focus:border-primary-500"
                                        value={cardExpiry}
                                        onChange={(e) => setCardExpiry(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">CVV</label>
                                    <input 
                                        type="password" 
                                        placeholder="123"
                                        maxLength={3}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 mt-1 outline-none focus:border-primary-500"
                                        value={cardCVC}
                                        onChange={(e) => setCardCVC(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                             <Check size={12} /> Secure 256-bit SSL Encrypted payment
                        </p>
                    </div>
                )}
                
                {bookingData.paymentMethod === 'Cash' && (
                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 text-yellow-800 text-sm">
                        You can pay via Cash, UPI, or Card directly to the professional upon service completion.
                    </div>
                )}

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Sidebar Summary (Cart) */}
        <div className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100 p-6 flex flex-col">
            <h3 className="font-heading font-bold text-lg mb-4 text-slate-900">Booking Summary</h3>
            
            <div className="flex-1 overflow-y-auto max-h-[300px] mb-4 space-y-3 custom-scrollbar">
                {cart.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                        Your cart is empty.<br/>Please select a service.
                    </div>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative group">
                            <div className="pr-6">
                                <div className="font-bold text-sm text-slate-800">{item.packageName}</div>
                                <div className="text-xs text-slate-500">{item.serviceName}</div>
                            </div>
                            <div className="absolute top-3 right-3 font-bold text-sm text-slate-900">${item.price}</div>
                            {step === 1 && (
                                <button 
                                    onClick={() => removeFromCart(index)}
                                    className="absolute bottom-2 right-2 text-red-400 hover:text-red-600 p-1 bg-red-50 rounded"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="border-t border-slate-200 pt-4 mt-auto">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-bold">${cartTotal}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-600">Tax (5%)</span>
                    <span className="font-bold">${(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-slate-900 mb-6">
                    <span>Total</span>
                    <span>${(cartTotal * 1.05).toFixed(2)}</span>
                </div>
                
                {step > 1 && (
                    <button 
                        onClick={() => setStep(step - 1)}
                        className="w-full mb-3 text-slate-500 font-semibold text-sm hover:text-slate-800"
                    >
                        Go Back
                    </button>
                )}

                <button 
                    onClick={step === 4 ? handleSubmit : () => setStep(step + 1)}
                    disabled={
                        (step === 1 && cart.length === 0) ||
                        (step === 2 && (!bookingData.date || !bookingData.time)) ||
                        (step === 3 && (!bookingData.customerName || !bookingData.customerPhone || !bookingData.address)) ||
                        (step === 4 && bookingData.paymentMethod === 'Online' && !cardNumber) ||
                        loading || paymentProcessing
                    }
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                >
                    {loading || paymentProcessing ? <Loader2 className="animate-spin" size={20} /> : (step === 4 ? (bookingData.paymentMethod === 'Online' ? `Pay $${(cartTotal * 1.05).toFixed(2)}` : 'Confirm Booking') : 'Continue')}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};