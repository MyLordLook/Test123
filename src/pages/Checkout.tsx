import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { ShippingAddress } from '../types';

const STEPS = ['Address', 'Review'];

const WHATSAPP_NUMBER = '919876543210';

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState<ShippingAddress>({
    full_name: '', phone: '', address_line1: '', address_line2: '',
    city: '', state: '', pincode: '', country: 'India',
  });
  const navigate = useNavigate();
  const { items, subtotal, discount, coupon, clearCart } = useCartStore();

  const sub = subtotal();
  const shipping = sub >= 999 ? 0 : 99;
  const total = sub - discount + shipping;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  const buildWhatsAppMessage = () => {
    let msg = '*New Order — LordLook*\n\n';

    msg += '*Products:*\n';
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.product.name}\n`;
      msg += `   Code: ${item.product.code}\n`;
      msg += `   Color: ${item.color}\n`;
      msg += `   Size: ${item.size} | Qty: ${item.quantity}\n`;
      msg += `   Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });

    msg += '*Billing Address:*\n';
    msg += `Name: ${address.full_name}\n`;
    msg += `Phone: ${address.phone}\n`;
    msg += `${address.address_line1}${address.address_line2 ? `, ${address.address_line2}` : ''}\n`;
    msg += `${address.city}, ${address.state} — ${address.pincode}\n\n`;

    msg += '*Order Summary:*\n';
    msg += `Subtotal: ₹${sub.toLocaleString('en-IN')}\n`;
    if (discount > 0) msg += `Coupon (${coupon}): -₹${discount.toLocaleString('en-IN')}\n`;
    msg += `Shipping: ${shipping === 0 ? 'Free' : `₹${shipping}`}\n`;
    msg += `*Total: ₹${total.toLocaleString('en-IN')}*\n`;

    return encodeURIComponent(msg);
  };

  const handleSendToWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, '_blank');
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14 flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 border border-green-700 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={44} className="text-green-700" />
          </div>
          <h2 className="heading-editorial text-3xl text-[#1a1a1a] dark:text-[#f0ede8] mb-3">Order Sent</h2>
          <p className="sans-light text-sm text-[#888888] mb-2">
            Your order details have been sent via WhatsApp. We'll confirm your order shortly.
          </p>
          <p className="sans-light text-xs text-[#888888] mb-8">
            You'll receive a confirmation message on WhatsApp.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:opacity-80 transition-opacity"
            >
              Back to Home
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] text-[#1a1a1a] dark:text-[#f0ede8] text-xs tracking-widest uppercase font-light hover:bg-[#1a1a1a] hover:text-[#FAFAF8] dark:hover:bg-[#f0ede8] dark:hover:text-[#1a1a1a] transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <Link to="/cart" className="flex items-center gap-1.5 sans-light text-xs text-[#888888] mb-6 hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to Bag
        </Link>

        <div className="border-b border-[#e8e8e8] dark:border-[#2a2a2a] pb-6 mb-8">
          <p className="label-upper text-[#888888] mb-1">Secure</p>
          <h1 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8]">Checkout</h1>
        </div>

        <div className="flex items-center gap-4 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-[#1a1a1a] dark:text-[#f0ede8]' : 'text-[#888888]'}`}>
                <div className={`w-8 h-8 border flex items-center justify-center text-xs font-light ${
                  i < step ? 'border-green-700 bg-green-700 text-white' : i === step ? 'border-[#1a1a1a] dark:border-[#f0ede8]' : 'border-[#e8e8e8] dark:border-[#2a2a2a]'
                }`}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className="label-upper text-[10px]">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px ${i < step ? 'bg-green-700' : 'bg-[#e8e8e8] dark:bg-[#2a2a2a]'}`} />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <form onSubmit={handleAddressSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-upper text-[9px] text-[#888888] mb-2 block">Full Name</label>
                <input required value={address.full_name} onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors" placeholder="Aryan Shah" />
              </div>
              <div>
                <label className="label-upper text-[9px] text-[#888888] mb-2 block">Phone</label>
                <input required value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors" placeholder="+91 98765 43210" type="tel" />
              </div>
            </div>
            <div>
              <label className="label-upper text-[9px] text-[#888888] mb-2 block">Address Line 1</label>
              <input required value={address.address_line1} onChange={(e) => setAddress({ ...address, address_line1: e.target.value })}
                className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors" placeholder="House/Flat No., Street" />
            </div>
            <div>
              <label className="label-upper text-[9px] text-[#888888] mb-2 block">Address Line 2 (Optional)</label>
              <input value={address.address_line2} onChange={(e) => setAddress({ ...address, address_line2: e.target.value })}
                className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors" placeholder="Landmark, Area (optional)" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <div>
                <label className="label-upper text-[9px] text-[#888888] mb-2 block">City</label>
                <input required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors" placeholder="Mumbai" />
              </div>
              <div>
                <label className="label-upper text-[9px] text-[#888888] mb-2 block">State</label>
                <input required value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors" placeholder="Maharashtra" />
              </div>
              <div>
                <label className="label-upper text-[9px] text-[#888888] mb-2 block">Pincode</label>
                <input required value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors" placeholder="400001" maxLength={6} />
              </div>
            </div>
            <button type="submit" className="w-full py-3.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:opacity-80 active:scale-[0.98] transition-all mt-6">
              Continue to Review
            </button>
          </form>
        )}

        {step === 1 && (
          <div>
            <div className="border border-[#e8e8e8] dark:border-[#2a2a2a] p-6 mb-6">
              <p className="label-upper text-[9px] text-[#888888] mb-4">Items</p>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-4">
                    <img src={item.product.product_images?.[0]?.url} alt={item.product.name} className="w-16 h-20 object-cover bg-[#F5F5F3] dark:bg-[#1a1a1a]" />
                    <div className="flex-1 min-w-0">
                      <p className="serif-italic text-sm text-[#1a1a1a] dark:text-[#f0ede8] line-clamp-1 mb-1">{item.product.name}</p>
                      <p className="sans-light text-xs text-[#888888]">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                    </div>
                    <span className="sans-light text-sm text-[#1a1a1a] dark:text-[#f0ede8] whitespace-nowrap">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#e8e8e8] dark:border-[#2a2a2a] p-6 mb-6">
              <p className="label-upper text-[9px] text-[#888888] mb-3">Delivering to</p>
              <p className="serif-italic text-sm text-[#1a1a1a] dark:text-[#f0ede8] mb-1">{address.full_name}</p>
              <p className="sans-light text-xs text-[#888888]">{address.phone}</p>
              <p className="sans-light text-xs text-[#888888] mt-2">{address.address_line1}{address.address_line2 ? `, ${address.address_line2}` : ''}</p>
              <p className="sans-light text-xs text-[#888888]">{address.city}, {address.state} — {address.pincode}</p>
            </div>

            <div className="border border-[#e8e8e8] dark:border-[#2a2a2a] p-6 mb-8">
              <div className="flex justify-between sans-light text-xs text-[#888888] mb-2"><span>Subtotal</span><span className="text-[#1a1a1a] dark:text-[#f0ede8]">₹{sub.toLocaleString('en-IN')}</span></div>
              {discount > 0 && <div className="flex justify-between sans-light text-xs text-green-700 mb-2"><span>Discount</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>}
              <div className="flex justify-between sans-light text-xs text-[#888888] mb-3"><span>Shipping</span><span className="text-[#1a1a1a] dark:text-[#f0ede8]">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div className="flex justify-between pt-3 border-t border-[#e8e8e8] dark:border-[#2a2a2a]">
                <span className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8]">Total</span>
                <span className="heading-editorial text-sm text-[#1a1a1a] dark:text-[#f0ede8]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 py-3.5 border border-[#e8e8e8] dark:border-[#2a2a2a] text-[#1a1a1a] dark:text-[#f0ede8] text-xs tracking-widest uppercase font-light hover:bg-[#1a1a1a] hover:text-[#FAFAF8] dark:hover:bg-[#f0ede8] dark:hover:text-[#1a1a1a] transition-all">
                Edit Address
              </button>
              <button
                onClick={handleSendToWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-600 text-white text-xs tracking-widest uppercase font-light hover:bg-green-700 transition-all active:scale-[0.98]"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                Send via WhatsApp
              </button>
            </div>

            <p className="sans-light text-[10px] text-[#888888] text-center mt-4">
              Your order details will be sent to our WhatsApp for confirmation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
