import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import CartDrawer from './CartDrawer';
import API from '../api/axiosConfig';

export default function Navbar({ theme = 'dark' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const fetchCart = () => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Failed to parse cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
    
    const handleOpenCart = () => setIsCartOpen(true);
    
    window.addEventListener('cartUpdated', fetchCart);
    window.addEventListener('openCart', handleOpenCart);
    
    return () => {
      window.removeEventListener('cartUpdated', fetchCart);
      window.removeEventListener('openCart', handleOpenCart);
    };
  }, []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (newQuantity <= 0) {
      currentCart = currentCart.filter(item => item.productId !== productId);
    } else {
      const item = currentCart.find(item => item.productId === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
    fetchCart();
  };

  const handleRemoveItem = (productId) => {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart = currentCart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    fetchCart();
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 transition-all duration-500 ${
          isScrolled 
            ? 'bg-mochi-navy/85 backdrop-blur-md text-mochi-cream shadow-sm border-b border-mochi-sky/10' 
            : `bg-transparent ${theme === 'light' ? 'text-mochi-navy' : 'text-white'}`
        }`}
      >
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors duration-500 ${
            isScrolled ? 'bg-mochi-cream text-mochi-navy' : 
            theme === 'light' ? 'bg-mochi-navy text-mochi-cream' : 'bg-white text-mochi-navy'
          }`}>
            M
          </div>
          Mochi.
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link to="/collection" className="hover:opacity-70 transition-opacity uppercase">Collection</Link>
          <Link to="/about" className="hover:opacity-70 transition-opacity uppercase">Manifesto</Link>
          <Link to="/login" className="hover:opacity-70 transition-opacity uppercase">Login</Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`flex items-center gap-2 border rounded-full px-5 py-2 transition-all duration-300 relative ${
              isScrolled 
                ? 'border-mochi-cream/20 hover:bg-mochi-cream hover:text-mochi-navy' 
                : theme === 'light' 
                  ? 'border-mochi-navy/30 hover:bg-mochi-navy hover:text-mochi-cream'
                  : 'border-white/30 hover:bg-white hover:text-mochi-navy'
            }`}
          >
            <ShoppingBag size={16} /> 
            <span>Cart</span>
            
            {/* Dynamic notification bubble */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button & Mobile Cart */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative hover:opacity-70 transition-opacity"
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="hover:opacity-70 transition-opacity"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-mochi-navy text-mochi-cream flex flex-col pt-6 px-8"
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold tracking-tighter uppercase flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-mochi-cream text-mochi-navy">M</div>
                Mochi.
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity text-mochi-cream">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 text-2xl font-light tracking-widest uppercase">
              <Link to="/collection" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-mochi-sky transition-colors">Collection</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-mochi-sky transition-colors">Manifesto</Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-mochi-sky transition-colors">Login</Link>
            </div>
            
            <div className="mt-auto pb-12 flex flex-col gap-4 text-xs font-light tracking-wide opacity-50">
              <span>support@mochistore.com</span>
              <span>© 2026 Mochi Store</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer rendered at the root level of Navbar */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
}
