import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import LoginPage from '@react-login-page/page2';
import { useAuth } from '../context/AuthContext';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('tamjidulislamsamim@gmail.com');
  const [password, setPassword] = useState('AdminSecurePassword123!');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome Admin! Access granted.');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Back to site button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 text-xs font-semibold backdrop-blur-md transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Portfolio
      </button>

      <div className="w-full max-w-md relative z-10 glass-panel border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 mx-auto flex items-center justify-center text-white mb-3 shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">Admin Authentication</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to manage portfolio content & settings</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};
