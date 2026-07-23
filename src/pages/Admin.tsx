import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Tag, TrendingUp, Plus, CreditCard as Edit2, Trash2, ChevronLeft } from 'lucide-react';
import { MOCK_PRODUCTS } from '../lib/mockData';

type Tab = 'dashboard' | 'products' | 'orders' | 'coupons';

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Aryan Shah', total: 2598, status: 'delivered', date: 'Apr 28, 2025' },
  { id: 'ORD-002', customer: 'Priya Mehta', total: 1599, status: 'shipped', date: 'Apr 30, 2025' },
  { id: 'ORD-003', customer: 'Dev Kumar', total: 4198, status: 'confirmed', date: 'May 1, 2025' },
  { id: 'ORD-004', customer: 'Riya Singh', total: 799, status: 'pending', date: 'May 2, 2025' },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  confirmed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  shipped: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  delivered: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

export default function Admin() {
  const [tab, setTab] = useState<Tab>('dashboard');

  const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'coupons', label: 'Coupons', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ChevronLeft size={14} /> Back
            </Link>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Admin Panel</h1>
          </div>
        </div>

        <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-2xl p-1 mb-8 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === id
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Products', value: '8', icon: Package, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
                { label: 'Total Orders', value: '4', icon: ShoppingBag, color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
                { label: 'Revenue', value: '₹9,194', icon: TrendingUp, color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                { label: 'Active Coupons', value: '4', icon: Tag, color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {MOCK_ORDERS.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{order.id} &middot; {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">₹{order.total.toLocaleString('en-IN')}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">{MOCK_PRODUCTS.length} products</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                <Plus size={16} /> Add Product
              </button>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
              {MOCK_PRODUCTS.map((product, i) => (
                <div key={product.id} className={`flex items-center gap-4 p-4 ${i < MOCK_PRODUCTS.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}>
                  <img
                    src={product.product_images?.[0]?.url}
                    alt={product.name}
                    className="w-12 h-14 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{product.code}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.rating_count} reviews</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
            {MOCK_ORDERS.map((order, i) => (
              <div key={order.id} className={`flex items-center gap-4 p-4 ${i < MOCK_ORDERS.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.customer}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{order.id} &middot; {order.date}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white hidden sm:block">₹{order.total.toLocaleString('en-IN')}</p>
                <div>
                  <select
                    defaultValue={order.status}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'coupons' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">4 active coupons</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                <Plus size={16} /> Add Coupon
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { code: 'LORDLOOK10', type: '10% off', min: '₹999 min', uses: '128 uses' },
                { code: 'WELCOME20', type: '20% off', min: '₹1,499 min', uses: '45 uses' },
                { code: 'FLAT200', type: '₹200 off', min: '₹1,999 min', uses: '67 uses' },
                { code: 'SUMMER15', type: '15% off', min: '₹1,299 min', uses: '23 uses' },
              ].map((c) => (
                <div key={c.code} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-dashed border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-black text-lg text-gray-900 dark:text-white font-mono tracking-wider">{c.code}</span>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">{c.type}</p>
                  <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{c.min}</span>
                    <span>&middot;</span>
                    <span>{c.uses}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
