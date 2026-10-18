import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { authModal, setAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState(authModal || 'login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, phone, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login('demo@skillserve.com', 'demo123456');
    } catch {
      // Fallback works directly
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative animate-scaleUp border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-5 text-center relative border-b border-indigo-900/40">
          <button
            onClick={() => setAuthModal(null)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 text-white rounded-2xl mx-auto flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-500/30 mb-2">
            ⚡
          </div>
          <h3 className="font-black text-xl">
            {mode === 'login' ? 'Welcome to SkillServe' : 'Create an Account'}
          </h3>
          <p className="text-xs text-indigo-200 mt-0.5">
            15-minute technician, mechanic, tailor & sweeper
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-3 text-center transition ${
              mode === 'login' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/40 font-extrabold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-3 text-center transition ${
              mode === 'register' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/40 font-extrabold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="bg-rose-50 text-rose-600 text-xs p-2.5 rounded-xl border border-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white"
                  />
                </div>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number (10 digits)"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white"
                  />
                </div>
              </>
            )}

            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:bg-slate-400 text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-indigo-600/20 transition active:scale-95"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Continue with Password' : 'Create My Account'}
            </button>
          </form>

          {/* Quick Demo One-Click Login */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Instant 1-Click Demo Login</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthModal;
