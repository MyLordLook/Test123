import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useThemeStore } from '../store/themeStore';
import { MOCK_PRODUCTS } from '../lib/mockData';

const TRENDING = ['Linen Blazer', 'Silk Dress', 'Fine Sweater', 'Minimal Sandals'];

// Logo configuration - easily adjustable
const LOGO_CONFIG = {
  height: 28, // Adjust logo height here
  width: 140, // Adjust logo width here
  mobileHeight: 24,
  mobileWidth: 120,
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { isDark, toggle } = useThemeStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setMenuOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleTrending = (term: string) => {
    navigate(`/products?q=${encodeURIComponent(term)}`);
    setSearchOpen(false);
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#FAFAF8] dark:bg-[#0f0f0f] border-b border-[#e8e8e8] dark:border-[#2a2a2a]'
            : isHome
            ? 'bg-transparent'
            : 'bg-[#FAFAF8] dark:bg-[#0f0f0f] border-b border-[#e8e8e8] dark:border-[#2a2a2a]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Hamburger */}
            <div className="flex items-center gap-4 w-1/3">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`flex items-center gap-2 transition-colors ${
                  scrolled || !isHome
                    ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                    : 'text-white'
                } hover:opacity-60`}
                aria-label="Menu"
              >
                <Menu size={20} strokeWidth={1.5} />
                <span className="hidden sm:block label-upper text-[10px]">Menu</span>
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center w-1/3">
              <Link to="/" className="flex items-center">
                <img
                  src={scrolled || !isHome ? '/logo-black.svg' : '/logo-white.svg'}
                  alt="Lord Look"
                  height={LOGO_CONFIG.height}
                  width={LOGO_CONFIG.width}
                  className="hidden sm:block"
                  style={{ height: LOGO_CONFIG.height, width: 'auto' }}
                />
                <img
                  src={scrolled || !isHome ? '/logo-black.svg' : '/logo-white.svg'}
                  alt="Lord Look"
                  height={LOGO_CONFIG.mobileHeight}
                  width={LOGO_CONFIG.mobileWidth}
                  className="block sm:hidden"
                  style={{ height: LOGO_CONFIG.mobileHeight, width: 'auto' }}
                />
              </Link>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center justify-end gap-3 w-1/3">
              <button
                onClick={() => setSearchOpen(true)}
                className={`transition-colors hover:opacity-60 ${
                  scrolled || !isHome
                    ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                    : 'text-white'
                }`}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <Link
                to="/wishlist"
                className={`relative transition-colors hover:opacity-60 ${
                  scrolled || !isHome
                    ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                    : 'text-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[9px] w-3.5 h-3.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] rounded-full flex items-center justify-center font-medium leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className={`relative transition-colors hover:opacity-60 ${
                  scrolled || !isHome
                    ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                    : 'text-white'
                }`}
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[9px] w-3.5 h-3.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] rounded-full flex items-center justify-center font-medium leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggle}
                className={`hidden sm:block transition-colors hover:opacity-60 ${
                  scrolled || !isHome
                    ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                    : 'text-white'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile/desktop menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#FAFAF8] dark:bg-[#0f0f0f] flex flex-col"
          >
            <div className="flex items-center justify-between h-14 px-5 sm:px-8 border-b border-[#e8e8e8] dark:border-[#2a2a2a]">
              <button onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[#1a1a1a] dark:text-[#f0ede8] hover:opacity-60 transition-opacity">
                <X size={20} strokeWidth={1.5} />
                <span className="label-upper text-[10px]">Close</span>
              </button>
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
                <img
                  src="/logo-black.svg"
                  alt="Lord Look"
                  className="dark:hidden"
                  style={{ height: LOGO_CONFIG.mobileHeight, width: 'auto' }}
                />
                <img
                  src="/logo-white.svg"
                  alt="Lord Look"
                  className="hidden dark:block"
                  style={{ height: LOGO_CONFIG.mobileHeight, width: 'auto' }}
                />
              </Link>
              <div className="w-16" />
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-16">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-4 border-b border-[#e8e8e8] dark:border-[#2a2a2a] heading-editorial text-3xl sm:text-4xl transition-opacity hover:opacity-50 ${
                      location.pathname === l.to
                        ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                        : 'text-[#888888]'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 sm:px-16 pb-8 flex items-center gap-6">
              <button onClick={toggle} className="flex items-center gap-2 label-upper text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">
                {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full-screen search overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col"
          >
            {/* Blurred background */}
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/55 backdrop-blur-md" />
            </div>

            {/* Close button */}
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-6 text-white hover:opacity-60 transition-opacity z-10"
              aria-label="Close search"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Search content */}
            <div className="relative z-10 flex flex-col justify-center flex-1 px-8 sm:px-16 md:px-24 max-w-5xl mx-auto w-full">
              <p className="label-upper text-white/60 text-[10px] mb-3 tracking-[0.2em]">Looking for...</p>
              <form onSubmit={handleSearch}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter keywords here"
                  className="w-full bg-transparent border-0 border-b border-white/40 text-white heading-editorial text-3xl sm:text-4xl md:text-5xl placeholder-white/30 focus:outline-none focus:border-white/80 py-3 transition-all duration-300"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300, letterSpacing: '-0.01em' }}
                />
              </form>

              {/* Trending searches */}
              <div className="mt-8">
                <p className="label-upper text-white/50 text-[10px] mb-4 tracking-[0.2em]">Trending Searches</p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTrending(term)}
                      className="px-4 py-2 border border-white/40 text-white text-xs tracking-widest uppercase font-light hover:bg-white/10 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick results if query matches */}
              {query.trim() && (
                <div className="mt-8">
                  {MOCK_PRODUCTS.filter((p) =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
                  ).slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { navigate(`/products/${p.id}`); setSearchOpen(false); }}
                      className="block w-full text-left py-3 border-b border-white/15 text-white hover:text-white/60 transition-colors"
                    >
                      <span className="heading-editorial text-lg">{p.name}</span>
                      <span className="ml-4 label-upper text-white/50 text-[10px]">₹{p.price.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
