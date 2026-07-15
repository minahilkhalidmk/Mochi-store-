import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFirebaseSync = async (user) => {
    try {
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      
      if (user.email === 'admin@store.com') {
        navigate('/admin/dashboard');
      } else {
        navigate('/collection');
      }
    } catch (err) {
      console.error("Routing failed:", err);
      setError('Registered, but failed to route.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await handleFirebaseSync(userCredential.user);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await handleFirebaseSync(userCredential.user);
    } catch (err) {
      console.error("Google Login failed:", err);
      setError(err.message || 'Google Sign-in failed.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans selection:bg-mochi-teal selection:text-white">
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.jpg" alt="Premium background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-mochi-navy/80 backdrop-blur-sm z-10" />
      </div>

      <div className="relative z-20 w-full max-w-md px-6 my-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-mochi-cream rounded-xl shadow-2xl p-10 lg:p-12"
        >
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-mochi-navy text-mochi-cream rounded-full mb-6 font-bold text-xl tracking-tighter">
              M
            </Link>
            <h1 className="text-3xl font-medium tracking-tight text-mochi-navy mb-2">Create Account</h1>
            <p className="text-sm text-mochi-ocean">Join Mochi Store today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <AnimatePresence mode="popLayout">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm py-3 px-4 rounded-md border border-red-100">
                    <AlertCircle size={16} className="shrink-0" />
                    <p className="truncate">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block px-0 pb-2.5 pt-6 w-full text-sm text-mochi-navy bg-transparent border-b border-mochi-sky appearance-none focus:outline-none focus:ring-0 focus:border-mochi-teal peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-mochi-ocean duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-mochi-teal cursor-text font-medium"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block px-0 pb-2.5 pt-6 w-full text-sm text-mochi-navy bg-transparent border-b border-mochi-sky appearance-none focus:outline-none focus:ring-0 focus:border-mochi-teal peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-mochi-ocean duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-mochi-teal cursor-text font-medium"
              >
                Password
              </label>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-4 bg-mochi-teal text-white rounded-sm text-sm font-bold tracking-widest uppercase transition-colors shadow-md flex items-center justify-center min-h-[52px] ${
                isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-mochi-ocean'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign Up'
              )}
            </motion.button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-mochi-sky/30"></div>
            <span className="text-xs text-mochi-sky uppercase tracking-widest font-bold">Or</span>
            <div className="flex-1 h-px bg-mochi-sky/30"></div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-6 py-4 bg-white text-mochi-navy border border-mochi-sky/50 rounded-sm text-sm font-bold tracking-widest uppercase transition-colors shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </motion.button>
          
          <div className="mt-8 text-center text-sm text-mochi-ocean">
            Already have an account? <Link to="/login" className="font-bold text-mochi-navy hover:text-mochi-teal transition-colors">Sign in</Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-mochi-cream/50 hover:text-mochi-cream transition-colors">
            <ArrowLeft size={14} /> Return to Store
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
