import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

type Mode = 'login' | 'signup' | 'forgot';

export default function Auth() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const fetchProfile = useAuthStore((s) => s.fetchProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        await fetchProfile();
        navigate('/');
      } else if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name } },
        });
        if (err) throw err;
        setSuccess('Account created! You can now log in.');
        setMode('login');
      } else {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email);
        if (err) throw err;
        setSuccess('Password reset link sent to your email.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex">
      <div className="hidden md:flex w-1/2 bg-gray-900 flex-col items-center justify-center p-12 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-black text-lg">LL</span>
            </div>
            <span className="text-white font-black text-3xl tracking-tight">LordLook</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed max-w-xs">
            Premium fashion crafted for the modern individual. Join thousands who dress with purpose.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-8 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex items-center gap-2 mb-8 md:hidden">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-sm flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-black text-sm">LL</span>
            </div>
            <span className="font-black text-xl text-gray-900 dark:text-white">LordLook</span>
          </div>

          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
            {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create account' : 'Reset password'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {mode === 'login' ? 'Sign in to your LordLook account' : mode === 'signup' ? 'Join LordLook today' : "We'll send you a reset link"}
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm px-4 py-3 rounded-xl mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Aryan Shah" type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 transition-all"
              />
            </div>
            {mode !== 'forgot' && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" type={showPw ? 'text' : 'password'} minLength={6}
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 transition-all"
                  />
                  <button
                    type="button" onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {mode === 'login' && (
                  <div className="flex justify-end mt-1">
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            {mode === 'login' ? (
              <p className="text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <button onClick={() => setMode('signup')} className="font-bold text-gray-900 dark:text-white hover:underline">
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="font-bold text-gray-900 dark:text-white hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
