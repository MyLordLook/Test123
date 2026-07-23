import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { MOCK_COUPONS } from '../lib/mockData';

export default function Cart() {
  const { items, removeItem, updateQuantity, coupon, discount, setCoupon, clearCoupon, subtotal } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const sub = subtotal();
  const shipping = sub >= 999 ? 0 : 99;
  const discountAmt = discount;
  const total = sub - discountAmt + shipping;

  const applyCoupon = () => {
    const c = MOCK_COUPONS[couponInput.toUpperCase()];
    if (!c) { setCouponError('Invalid coupon code'); setCouponSuccess(''); return; }
    if (sub < c.min_order_amount) {
      setCouponError(`Minimum order ₹${c.min_order_amount} required`);
      setCouponSuccess(''); return;
    }
    let disc = c.discount_type === 'percentage' ? (sub * c.discount_value) / 100 : c.discount_value;
    if (c.max_discount && disc > c.max_discount) disc = c.max_discount;
    setCoupon(couponInput.toUpperCase(), disc);
    setCouponSuccess(`${c.description} — ₹${disc.toFixed(0)} saved`);
    setCouponError('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14 flex items-center justify-center">
        <div className="text-center px-5">
          <h2 className="heading-editorial text-3xl text-[#1a1a1a] dark:text-[#f0ede8] mb-3">Your bag is empty</h2>
          <p className="sans-light text-sm text-[#888888] mb-8">Add pieces to your bag to get started.</p>
          <Link to="/products" className="btn-editorial">
            Shop Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="border-b border-[#e8e8e8] dark:border-[#2a2a2a] pb-6 mb-8">
          <p className="label-upper text-[#888888] mb-1">Shopping</p>
          <h1 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8]">
            Your Bag <span className="sans-light text-base text-[#888888] ml-2">({items.length})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2">
            {items.map((item) => {
              const img = item.product.product_images?.[0]?.url ?? '';
              const colorObj = item.product.colors.find((c) => c.name === item.color);
              return (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-5 py-6 border-b border-[#e8e8e8] dark:border-[#2a2a2a] last:border-0"
                >
                  <Link to={`/products/${item.product.id}`} className="shrink-0">
                    <img
                      src={img}
                      alt={item.product.name}
                      className="w-20 h-28 sm:w-24 sm:h-32 object-cover bg-[#F5F5F3] dark:bg-[#1a1a1a]"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="label-upper text-[9px] text-[#888888] mb-1">{item.product.code}</p>
                    <Link to={`/products/${item.product.id}`}>
                      <h3 className="serif-italic text-sm text-[#1a1a1a] dark:text-[#f0ede8] leading-snug mb-2 hover:opacity-60 transition-opacity line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="sans-light text-xs text-[#888888]">Size: {item.size}</span>
                      {item.color && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 border border-[#e8e8e8]"
                            style={{ backgroundColor: colorObj?.hex ?? '#ccc' }}
                          />
                          <span className="sans-light text-xs text-[#888888]">{item.color}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center border border-[#e8e8e8] dark:border-[#2a2a2a]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center sans-light text-xs text-[#1a1a1a] dark:text-[#f0ede8]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="sans-light text-sm text-[#1a1a1a] dark:text-[#f0ede8]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          className="text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-20 self-start">
            <div className="border border-[#e8e8e8] dark:border-[#2a2a2a] p-6">
              <h2 className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8] mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <p className="label-upper text-[9px] text-[#888888] mb-2">Coupon Code</p>
                {coupon ? (
                  <div className="flex items-center justify-between py-2 border-b border-[#e8e8e8] dark:border-[#2a2a2a]">
                    <span className="serif-italic text-sm text-[#1a1a1a] dark:text-[#f0ede8]">{coupon}</span>
                    <button
                      onClick={() => { clearCoupon(); setCouponSuccess(''); }}
                      className="label-upper text-[9px] text-[#888888] hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-xs text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:opacity-80 transition-opacity"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && <p className="sans-light text-xs text-red-500 mt-1.5">{couponError}</p>}
                {couponSuccess && <p className="sans-light text-xs text-green-700 mt-1.5">{couponSuccess}</p>}
                {!coupon && <p className="sans-light text-[10px] text-[#888888] mt-1.5">Try: LORDLOOK10, WELCOME20, FLAT200</p>}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="sans-light text-xs text-[#888888]">Subtotal</span>
                  <span className="sans-light text-xs text-[#1a1a1a] dark:text-[#f0ede8]">₹{sub.toLocaleString('en-IN')}</span>
                </div>
                {discountAmt > 0 && (
                  <div className="flex justify-between">
                    <span className="sans-light text-xs text-[#888888]">Discount</span>
                    <span className="sans-light text-xs text-green-700">-₹{discountAmt.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="sans-light text-xs text-[#888888]">Shipping</span>
                  <span className="sans-light text-xs text-[#1a1a1a] dark:text-[#f0ede8]">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="sans-light text-[10px] text-[#888888]">₹{(999 - sub).toFixed(0)} more for free shipping</p>
                )}
                <div className="flex justify-between pt-3 border-t border-[#e8e8e8] dark:border-[#2a2a2a]">
                  <span className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8]">Total</span>
                  <span className="heading-editorial text-sm text-[#1a1a1a] dark:text-[#f0ede8]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:opacity-80 active:scale-95 transition-all"
              >
                Proceed to Checkout <ArrowRight size={13} strokeWidth={1.5} />
              </Link>

              <p className="sans-light text-[10px] text-[#888888] text-center mt-3">
                Secure checkout · Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
