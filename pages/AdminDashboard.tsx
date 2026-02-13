import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingState, BookingStatus } from '../types';
import { LayoutDashboard, LogOut, CheckCircle, Clock, XCircle, Search, DollarSign, Users, Calendar, MapPin, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingService } from '../services/bookingService';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingState[]>([]);
  const [filter, setFilter] = useState<'All' | BookingStatus>('All');
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('urban_spark_admin_auth');
    if (!isAuth) {
      navigate('/admin-login');
      return;
    }

    // Real-time subscription to bookings
    const unsubscribe = bookingService.subscribe((data) => {
        setBookings(data);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('urban_spark_admin_auth');
    navigate('/');
  };

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    await bookingService.updateStatus(id, newStatus);
  };

  const filteredBookings = bookings
    .filter(b => filter === 'All' || b.status === filter)
    .filter(b => 
        b.customerName.toLowerCase().includes(search.toLowerCase()) || 
        b.id?.toLowerCase().includes(search.toLowerCase())
    );

  const totalRevenue = bookings.filter(b => b.status !== 'Cancelled').reduce((acc, curr) => acc + (curr.totalAmount || curr.price || 0), 0);
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
        case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <LayoutDashboard className="text-primary-400" />
                <span className="font-bold text-lg md:text-xl tracking-tight">UrbanSpark <span className="text-slate-400 font-normal text-xs md:text-sm ml-2 hidden sm:inline">Admin Panel</span></span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400 transition-colors text-sm font-medium">
                <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {/* Stats Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl text-green-600"><DollarSign size={20} /></div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Pending Requests</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{pendingCount}</h3>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600"><Clock size={20} /></div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Completed Jobs</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{completedCount}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><CheckCircle size={20} /></div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Bookings</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{bookings.length}</h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><Users size={20} /></div>
                </div>
            </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-t-2xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full md:w-auto">
                <Search size={18} className="text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search ID or Name..." 
                    className="bg-transparent outline-none text-sm text-slate-700 w-full md:w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map(s => (
                    <button 
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === s ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>

        {/* Table */}
        <div className="bg-white border-x border-b border-slate-200 overflow-x-auto rounded-b-2xl shadow-sm">
            <table className="w-full text-left min-w-[800px]">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-4">Booking ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Services</th>
                        <th className="px-6 py-4">Date/Time</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Update Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                        <React.Fragment key={booking.id}>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-slate-500 font-mono text-sm font-bold">#{booking.id}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{booking.customerName}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1"><Phone size={10} /> {booking.customerPhone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-slate-900 font-medium">
                                        {booking.items ? `${booking.items.length} items` : (booking.packageName || 'Single Service')}
                                    </div>
                                    <button 
                                        onClick={() => setExpandedRow(expandedRow === booking.id ? null : booking.id!)}
                                        className="text-xs text-primary-600 flex items-center gap-1 hover:underline mt-1"
                                    >
                                        {expandedRow === booking.id ? <ChevronUp size={12}/> : <ChevronDown size={12}/>} View Details
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Calendar size={14} /> {booking.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                                        <Clock size={12} /> {booking.time}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">${(booking.totalAmount || booking.price || 0).toFixed(2)}</div>
                                    <div className={`text-xs ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-slate-400'}`}>
                                        {booking.paymentStatus || 'Pending'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <select 
                                        value={booking.status}
                                        onChange={(e) => handleStatusChange(booking.id!, e.target.value as BookingStatus)}
                                        className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer hover:border-primary-400 transition-colors shadow-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                            <AnimatePresence>
                                {expandedRow === booking.id && (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-slate-50"
                                    >
                                        <td colSpan={7} className="px-6 py-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><MapPin size={16}/> Service Address</h4>
                                                    <p className="text-slate-600 text-sm whitespace-pre-wrap border p-3 rounded-lg bg-white">{booking.address}</p>
                                                    <div className="mt-4">
                                                        <h4 className="font-bold text-slate-900 mb-1 text-sm">Customer Details</h4>
                                                        <p className="text-sm text-slate-600">Email: {booking.customerEmail}</p>
                                                        <p className="text-sm text-slate-600">Payment Method: {booking.paymentMethod}</p>
                                                        {booking.transactionId && <p className="text-sm text-slate-600">Txn ID: {booking.transactionId}</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-2">Order Items</h4>
                                                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                                        {booking.items && booking.items.length > 0 ? (
                                                            <ul className="divide-y divide-slate-100">
                                                                {booking.items.map((item, i) => (
                                                                    <li key={i} className="p-3 text-sm flex justify-between">
                                                                        <span>
                                                                            <span className="font-bold block">{item.packageName}</span>
                                                                            <span className="text-xs text-slate-500">{item.serviceName}</span>
                                                                        </span>
                                                                        <span className="font-medium">${item.price}</span>
                                                                    </li>
                                                                ))}
                                                                <li className="p-3 bg-slate-50 text-right font-bold text-slate-900 border-t">
                                                                    Total: ${(booking.totalAmount || 0).toFixed(2)}
                                                                </li>
                                                            </ul>
                                                        ) : (
                                                            <p className="p-3 text-sm">{booking.packageName} - ${booking.price}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </React.Fragment>
                    )) : (
                        <tr>
                            <td colSpan={7} className="text-center py-12 text-slate-400">
                                No bookings found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};