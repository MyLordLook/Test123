import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

// Logo configuration - keeps consistent with Navbar
const FOOTER_LOGO_CONFIG = {
  height: 28,
  width: 140,
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-[#FAFAF8] dark:bg-[#0f0f0f] border-t border-[#e8e8e8] dark:border-[#2a2a2a] mt-0">
      {/* Newsletter */}
      <div className="border-b border-[#e8e8e8] dark:border-[#2a2a2a] py-10 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="label-upper text-[#888888] mb-1">Join Our Newsletter</p>
            <h3 className="serif-italic text-xl text-[#1a1a1a] dark:text-[#f0ede8]">
              Receive editorial updates &amp; exclusive offers
            </h3>
          </div>
          {subscribed ? (
            <p className="sans-light text-sm text-[#888888]">Thank you for subscribing.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-0 w-full sm:w-auto max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-[#1a1a1a] dark:text-[#f0ede8] text-sm font-light placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:opacity-80 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-3">
              <img
                src="/logo-black.svg"
                alt="Lord Look"
                className="dark:hidden"
                height={FOOTER_LOGO_CONFIG.height}
                width={FOOTER_LOGO_CONFIG.width}
                style={{ height: FOOTER_LOGO_CONFIG.height, width: 'auto' }}
              />
              <img
                src="/logo-white.svg"
                alt="Lord Look"
                className="hidden dark:block"
                height={FOOTER_LOGO_CONFIG.height}
                width={FOOTER_LOGO_CONFIG.width}
                style={{ height: FOOTER_LOGO_CONFIG.height, width: 'auto' }}
              />
            </Link>
            <p className="sans-light text-xs text-[#888888] leading-relaxed mb-6 max-w-[180px]">
              Premium fashion for the modern individual. Quality you can feel, style you can own.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="label-upper text-[#1a1a1a] dark:text-[#f0ede8] mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'New Arrivals', to: '/products' },
                { label: 'T-Shirts', to: '/products?category=cat-1' },
                { label: 'Shirts', to: '/products?category=cat-2' },
                { label: 'Hoodies', to: '/products?category=cat-3' },
                { label: 'Trousers', to: '/products?category=cat-4' },
                { label: 'Sale', to: '/products' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="sans-light text-xs text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="label-upper text-[#1a1a1a] dark:text-[#f0ede8] mb-4">Help</h4>
            <ul className="space-y-2.5">
              {['Size Guide', 'Shipping Info', 'Returns & Exchanges', 'Track Order', 'FAQ'].map((l) => (
                <li key={l}>
                  <a href="#" className="sans-light text-xs text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="label-upper text-[#1a1a1a] dark:text-[#f0ede8] mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="sans-light text-xs text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="sans-light text-xs text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">Contact</Link></li>
              <li><a href="#" className="sans-light text-xs text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">Careers</a></li>
              <li><a href="#" className="sans-light text-xs text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="sans-light text-xs text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#e8e8e8] dark:border-[#2a2a2a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="sans-light text-xs text-[#888888]">&copy; {new Date().getFullYear()} LordLook. All rights reserved.</p>
          <p className="sans-light text-xs text-[#888888]">Payments by Razorpay &bull; UPI &bull; Cards</p>
        </div>
      </div>
    </footer>
  );
}
