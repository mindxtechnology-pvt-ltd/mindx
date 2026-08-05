import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../utils/api';
import { Lock, Mail, Loader2 } from 'lucide-react';
import SEO from '../../components/seo/SEO';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await loginAdmin(email, password);
      localStorage.setItem('admin_token', data.access_token);
      localStorage.setItem('admin_email', data.email);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login | MindX Technology" description="Secure portal for MindX Technology administrators." />
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 p-10 rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800/80 shadow-2xl backdrop-blur-xl relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Admin Portal
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Sign in to manage client inquiries
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mindxtechnology.com"
                    className="w-full pl-11 pr-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full py-5 rounded-2xl bg-white text-black text-sm font-extrabold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
