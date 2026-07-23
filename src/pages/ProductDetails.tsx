import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, CheckCircle, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PRODUCTS } from '../lib/mockData';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';

const MOCK_REVIEWS = [
  { id: 'r1', user: 'Aryan S.', rating: 5, title: 'Absolutely love it!', body: 'Great quality fabric and perfect fit. Got tons of compliments.', date: 'Apr 2025' },
  { id: 'r2', user: 'Priya M.', rating: 4, title: 'Very comfortable', body: 'Fabric is soft, stitching is clean. Slightly oversized for me.', date: 'Mar 2025' },
  { id: 'r3', user: 'Dev K.', rating: 5, title: 'Best purchase!', body: 'Third time buying LordLook and never disappointed. Premium quality.', date: 'Mar 2025' },
];

const SIZE_GUIDE = [
  { size: 'S', chest: '36"', waist: '30"', length: '26"' },
  { size: 'M', chest: '38"', waist: '32"', length: '27"' },
  { size: 'L', chest: '40"', waist: '34"', length: '28"' },
  { size: 'XL', chest: '42"', waist: '36"', length: '29"' },
  { size: 'XXL', chest: '44"', waist: '38"', length: '30"' },
];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [toast, setToast] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const touchStartX = useRef(0);

  const addItem = useCartStore((s) => s.addItem);
  const { hasItem, toggle } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14">
        <div className="text-center">
          <h2 className="heading-editorial text-2xl text-[#1a1a1a] dark:text-[#f0ede8] mb-3">Product not found</h2>
          <Link to="/products" className="sans-light text-sm text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const imgs = product.product_images ?? [];
  const wished = hasItem(product.id);
  const discount = product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
  const related = MOCK_PRODUCTS.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const handleAddToCart = () => {
    if (!selectedSize) { showToast('Please select a size'); return; }
    if (!selectedColor) { showToast('Please select a colour'); return; }
    addItem(product, selectedSize, selectedColor);
    showToast('Added to bag');
  };

  return (
    <div className="bg-[#FAFAF8] dark:bg-[#0f0f0f] min-h-screen pt-14">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] px-6 py-2.5 text-xs tracking-widest uppercase font-light flex items-center gap-2"
          >
            <CheckCircle size={13} strokeWidth={1.5} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review submitted modal */}
      <AnimatePresence>
        {reviewSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#FAFAF8] dark:bg-[#1a1a1a] p-10 text-center"
            >
              <CheckCircle size={32} className="text-[#1a1a1a] dark:text-[#f0ede8] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="heading-editorial text-lg text-[#1a1a1a] dark:text-[#f0ede8]">Thank you</h3>
              <p className="sans-light text-xs text-[#888888] mt-2">Your review has been submitted.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] text-[#888888] mb-8 label-upper">
          <Link to="/" className="hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#1a1a1a] dark:text-[#f0ede8]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image gallery */}
          <div>
            <div
              className="relative overflow-hidden bg-[#F5F5F3] dark:bg-[#1a1a1a]"
              style={{ aspectRatio: '3/4' }}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                  if (diff > 0) setActiveImg((i) => Math.min(i + 1, imgs.length - 1));
                  else setActiveImg((i) => Math.max(i - 1, 0));
                }
              }}
            >
              {imgs.length > 0 && (
                <img
                  src={imgs[activeImg]?.url}
                  alt={imgs[activeImg]?.alt}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  loading="eager"
                />
              )}
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-[10px] px-3 py-1 label-upper">
                  -{discount}%
                </span>
              )}
              {imgs.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => Math.max(i - 1, 0))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 text-[#1a1a1a]/60 hover:text-[#1a1a1a] bg-white/50 transition-colors hidden sm:flex"
                    disabled={activeImg === 0}
                  >
                    <ChevronLeft size={16} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => Math.min(i + 1, imgs.length - 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#1a1a1a]/60 hover:text-[#1a1a1a] bg-white/50 transition-colors hidden sm:flex"
                    disabled={activeImg === imgs.length - 1}
                  >
                    <ChevronRight size={16} strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-2">
              {imgs.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-[72px] overflow-hidden bg-[#F5F5F3] dark:bg-[#1a1a1a] transition-all flex-shrink-0 ${
                    i === activeImg ? 'ring-1 ring-[#1a1a1a] dark:ring-[#f0ede8]' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div>
            <p className="label-upper text-[#888888] mb-2">{product.code}</p>
            <h1 className="heading-editorial-italic text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8] mb-3 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating_count > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((n) => (
                    <Star key={n} size={12} strokeWidth={1.5}
                      fill={n <= Math.round(product.rating_avg) ? '#1a1a1a' : 'none'}
                      stroke={n <= Math.round(product.rating_avg) ? '#1a1a1a' : '#888888'}
                      className="dark:fill-[#f0ede8] dark:stroke-[#f0ede8]"
                    />
                  ))}
                </div>
                <span className="sans-light text-xs text-[#888888]">
                  {product.rating_avg.toFixed(1)} ({product.rating_count})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="heading-editorial text-2xl text-[#1a1a1a] dark:text-[#f0ede8]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.original_price > product.price && (
                <>
                  <span className="sans-light text-sm text-[#888888] line-through">
                    ₹{product.original_price.toLocaleString('en-IN')}
                  </span>
                  <span className="label-upper text-[10px] text-[#888888]">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="sans-light text-sm text-[#888888] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8]">
                  Size{selectedSize && <span className="text-[#888888] ml-2">— {selectedSize}</span>}
                </p>
                <button
                  onClick={() => setSizeGuideOpen((v) => !v)}
                  className="label-upper text-[10px] text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.product_sizes?.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`w-11 h-11 text-xs font-light border transition-all ${
                      s.stock === 0
                        ? 'border-[#e8e8e8] dark:border-[#2a2a2a] text-[#e8e8e8] dark:text-[#2a2a2a] line-through cursor-not-allowed'
                        : selectedSize === s.size
                        ? 'border-[#1a1a1a] dark:border-[#f0ede8] bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a]'
                        : 'border-[#e8e8e8] dark:border-[#2a2a2a] text-[#1a1a1a] dark:text-[#f0ede8] hover:border-[#1a1a1a] dark:hover:border-[#f0ede8]'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {/* Size guide table */}
              <AnimatePresence>
                {sizeGuideOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-4 border border-[#e8e8e8] dark:border-[#2a2a2a]"
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-[#e8e8e8] dark:border-[#2a2a2a]">
                      <p className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8]">Size Guide (inches)</p>
                      <button onClick={() => setSizeGuideOpen(false)} className="text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8]">
                        <X size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[#e8e8e8] dark:border-[#2a2a2a]">
                          {['Size', 'Chest', 'Waist', 'Length'].map((h) => (
                            <th key={h} className="px-4 py-2 text-left label-upper text-[9px] text-[#888888]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_GUIDE.map((row) => (
                          <tr key={row.size} className="border-b border-[#f5f5f3] dark:border-[#2a2a2a] last:border-0">
                            <td className="px-4 py-2 sans-light text-[#1a1a1a] dark:text-[#f0ede8] font-medium">{row.size}</td>
                            <td className="px-4 py-2 sans-light text-[#888888]">{row.chest}</td>
                            <td className="px-4 py-2 sans-light text-[#888888]">{row.waist}</td>
                            <td className="px-4 py-2 sans-light text-[#888888]">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Color selector */}
            <div className="mb-8">
              <p className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8] mb-3">
                Colour{selectedColor && <span className="text-[#888888] ml-2">— {selectedColor}</span>}
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  const isLight = ['#FFFFFF', '#F5F5DC', '#F4C2C2', '#B0C4DE', '#87CEEB', '#B6B6B6', '#C2B280', '#9DC183', '#C3B091', '#C19A6B'].includes(c.hex);
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-7 h-7 transition-all ${
                        isSelected ? 'ring-1 ring-offset-1 ring-[#1a1a1a] dark:ring-[#f0ede8] scale-110' : 'hover:scale-105'
                      } ${isLight ? 'border border-[#e8e8e8]' : ''}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:opacity-80 active:scale-95 transition-all"
              >
                <ShoppingBag size={15} strokeWidth={1.5} />
                Add to Bag
              </button>
              <button
                onClick={() => toggle(product)}
                className={`px-4 border transition-all ${
                  wished
                    ? 'border-[#1a1a1a] dark:border-[#f0ede8] bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a]'
                    : 'border-[#e8e8e8] dark:border-[#2a2a2a] text-[#888888] hover:border-[#1a1a1a] dark:hover:border-[#f0ede8]'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={16} strokeWidth={1.5} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e8e8e8] dark:border-[#2a2a2a]">
                {product.tags.map((t) => (
                  <span key={t} className="label-upper text-[9px] text-[#888888] border border-[#e8e8e8] dark:border-[#2a2a2a] px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 pt-12 border-t border-[#e8e8e8] dark:border-[#2a2a2a]">
          <h2 className="heading-editorial text-xl text-[#1a1a1a] dark:text-[#f0ede8] mb-8">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Rating summary */}
            <div className="flex flex-col items-center justify-center border border-[#e8e8e8] dark:border-[#2a2a2a] p-8">
              <span className="heading-editorial text-5xl text-[#1a1a1a] dark:text-[#f0ede8] mb-2">{product.rating_avg.toFixed(1)}</span>
              <StarRating value={Math.round(product.rating_avg)} size={16} />
              <p className="sans-light text-xs text-[#888888] mt-2">{product.rating_count} reviews</p>
            </div>

            <div className="md:col-span-2 space-y-6">
              {MOCK_REVIEWS.map((r) => (
                <div key={r.id} className="border-b border-[#e8e8e8] dark:border-[#2a2a2a] pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="sans-light text-sm text-[#1a1a1a] dark:text-[#f0ede8] font-medium">{r.user}</span>
                    <span className="label-upper text-[9px] text-[#888888]">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map((n) => (
                      <Star key={n} size={11} strokeWidth={1.5}
                        fill={n <= r.rating ? '#1a1a1a' : 'none'}
                        stroke={n <= r.rating ? '#1a1a1a' : '#888888'}
                      />
                    ))}
                  </div>
                  <p className="serif-italic text-sm text-[#1a1a1a] dark:text-[#f0ede8] mb-1">{r.title}</p>
                  <p className="sans-light text-xs text-[#888888]">{r.body}</p>
                </div>
              ))}

              {/* Write review */}
              <div className="pt-4">
                <h3 className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8] mb-4">Write a Review</h3>
                <StarRating value={reviewRating} onChange={setReviewRating} size={20} />
                <textarea
                  rows={3}
                  placeholder="Share your thoughts..."
                  className="mt-3 w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light resize-none transition-colors"
                />
                <button
                  onClick={() => {
                    if (reviewRating === 0) { showToast('Please select a rating'); return; }
                    setReviewSubmitted(true);
                    setReviewRating(0);
                    setTimeout(() => setReviewSubmitted(false), 2500);
                  }}
                  className="mt-3 btn-editorial-outline text-xs"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#e8e8e8] dark:border-[#2a2a2a]">
            <h2 className="heading-editorial text-xl text-[#1a1a1a] dark:text-[#f0ede8] mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
