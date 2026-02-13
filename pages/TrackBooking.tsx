import React, { useState } from 'react';
import { Search, Package, Check, Clock, Calendar } from 'lucide-react';
import { BookingState } from '../types';

export const TrackBooking: React.FC = () => {
    const [id, setId] = useState('');
    const [result, setResult] = useState<BookingState | null>(null);
    const [error, setError] = useState('');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);

        const bookings: BookingState[] = JSON.parse(localStorage.getItem('urban_spark_bookings') || '[]');
        const found = bookings.find(b => b.id?.toUpperCase() === id.toUpperCase());

        if (found) {
            setResult(found);
        } else {
            setError('Booking ID not found. Please check and try again.');
        }
    };

    const getStepStatus = (step: number, currentStatus: string) => {
        // Simple status logic
        if (currentStatus === 'Cancelled') return 'error';
        const levels = ['Pending', 'Confirmed', 'Completed'];
        const currentIdx = levels.indexOf(currentStatus);
        
        if (currentIdx >= step) return 'completed';
        if (currentIdx === step - 1) return 'active';
        return 'pending';
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Track Your Service</h1>
                    <p className="text-slate-600">Enter your Booking ID to see the current status of your request.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 mb-8">
                    <form onSubmit={handleTrack} className="flex gap-4">
                        <input 
                            type="text" 
                            placeholder="Enter Booking ID (e.g. 9X2A1...)" 
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 uppercase"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <button type="submit" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700">
                            Track
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>

                {result && (
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 animate-fade-in">
                        <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">Status: {result.status}</h2>
                                <p className="text-slate-500 text-sm">Booking ID: {result.id}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-500 flex items-center justify-end gap-1"><Calendar size={14} /> {result.date}</div>
                                <div className="text-sm text-slate-500 flex items-center justify-end gap-1"><Clock size={14} /> {result.time}</div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                            {[
                                { status: 'Pending', label: 'Booking Received', date: result.createdAt },
                                { status: 'Confirmed', label: 'Professional Assigned', date: result.status === 'Confirmed' || result.status === 'Completed' ? 'Processing' : '' },
                                { status: 'Completed', label: 'Service Completed', date: result.status === 'Completed' ? 'Done' : '' }
                            ].map((step, idx) => {
                                const state = getStepStatus(idx, result.status);
                                return (
                                    <div key={idx} className="relative">
                                        <div className={`absolute -left-[2.35rem] w-6 h-6 rounded-full border-4 ${
                                            state === 'completed' ? 'bg-green-500 border-green-100' :
                                            state === 'active' ? 'bg-primary-500 border-primary-100' :
                                            'bg-slate-300 border-slate-100'
                                        }`}></div>
                                        <h3 className={`font-bold ${state === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.label}</h3>
                                        <p className="text-xs text-slate-500">{state === 'completed' || state === 'active' ? step.status : 'Pending'}</p>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {result.items && result.items.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="font-bold mb-4">Service Details</h3>
                                <ul className="space-y-2">
                                    {result.items.map((item, i) => (
                                        <li key={i} className="text-sm text-slate-600 flex justify-between">
                                            <span>{item.packageName}</span>
                                            <span className="font-medium">${item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};