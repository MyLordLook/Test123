import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function BottomNav() {
  const location = useLocation();
  const cartCount = useCartStore((s) => s.totalItems());

  const tabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/products', label: 'Shop', icon: Search },
    { to: '/wishlist', label: 'Wishlist', icon: Heart },
    { to: '/cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAFAF8] dark:bg-[#0f0f0f] border-t border-[#e8e8e8] dark:border-[#2a2a2a] safe-area-pb">
      <div className="flex">
        {tabs.map(({ to, label, icon: Icon, badge }) => {
          const active = location.pathname === to || (to === '/products' && location.pathname.startsWith('/products'));
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 min-h-[54px] relative transition-colors ${
                active
                  ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                  : 'text-[#888888]'
              }`}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-px bg-[#1a1a1a] dark:bg-[#f0ede8]" />
              )}
              <span className="relative">
                <Icon size={19} strokeWidth={active ? 2 : 1.5} />
                {badge != null && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-[9px] w-3.5 h-3.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] rounded-full flex items-center justify-center font-medium leading-none">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </span>
              <span className="label-upper text-[9px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
