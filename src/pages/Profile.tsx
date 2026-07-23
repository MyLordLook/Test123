import { Link } from 'react-router-dom';
import { Package, Heart, ChevronRight, Settings } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function Profile() {
  const cartCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const menuItems = [
    { icon: Package, label: 'My Orders', to: '/orders', sub: 'Track your orders' },
    { icon: Heart, label: 'Wishlist', to: '/wishlist', sub: `${wishlistCount} saved items` },
    { icon: Settings, label: 'Account Settings', to: '/profile/settings', sub: 'Name, phone, password' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 mb-8 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl font-black text-gray-600 dark:text-gray-300">
            L
          </div>
          <div className="min-w-0">
            <h2 className="font-black text-gray-900 dark:text-white text-lg truncate">
              LordLook Member
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link to="/cart" className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <p className="text-2xl font-black text-gray-900 dark:text-white">{cartCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">In Cart</p>
          </Link>
          <Link to="/wishlist" className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <p className="text-2xl font-black text-gray-900 dark:text-white">{wishlistCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Wishlisted</p>
          </Link>
        </div>

        <div className="space-y-2 mb-6">
          {menuItems.map(({ icon: Icon, label, to, sub }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}
