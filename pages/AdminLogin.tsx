import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, ArrowRight } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '899336') {
      localStorage.setItem('urban_spark_admin_auth', 'true');
      navigate('/admin-dashboard');
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="text-red-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Restricted Access</h2>
            <p className="text-slate-400 text-sm mb-8">Authorized personnel only. Please enter your secure PIN to continue.</p>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
                    <input 
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Security PIN"
                        className={`w-full bg-slate-900 border ${error ? 'border-red-500 animate-pulse' : 'border-slate-700'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                        autoFocus
                    />
                </div>
                {error && <p className="text-red-400 text-xs">Access Denied. Invalid PIN.</p>}
                
                <button 
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    Access Dashboard <ArrowRight size={18} />
                </button>
            </form>
        </div>
        <div className="bg-slate-900/50 p-4 text-center border-t border-slate-700">
            <button onClick={() => navigate('/')} className="text-slate-500 hover:text-white text-sm transition-colors">Return to Website</button>
        </div>
      </div>
    </div>
  );
};