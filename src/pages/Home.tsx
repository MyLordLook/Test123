import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS } from '../lib/mockData';
import ProductCard from '../components/ProductCard';

/* ── Hero slides ── */
const SLIDES = [
  {
    id: 1,
    tagline: 'The Fluidity of\nTailored Forms',
    img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1400',
    link: '/products',
  },
  {
    id: 2,
    tagline: 'Structure Meets\nSensuality',
    img: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1400',
    link: '/products?category=cat-1',
  },
  {
    id: 3,
    tagline: 'Refined in Every\nDetail',
    img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1400',
    link: '/products?category=cat-2',
  },
  {
    id: 4,
    tagline: 'The New Season\nCollection',
    img: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1400',
    link: '/products?category=cat-3',
  },
  {
    id: 5,
    tagline: 'Wear What\nMatters',
    img: 'https://images.pexels.com/photos/1852759/pexels-photo-1852759.jpeg?auto=compress&cs=tinysrgb&w=1400',
    link: '/products',
  },
];

const newArrivals = MOCK_PRODUCTS.slice(0, 4);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function Home() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const next = useCallback(() => setActive((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 4500);
  }, [next]);

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetInterval]);

  return (
    <div className="bg-[#FAFAF8] dark:bg-[#0f0f0f]">

      {/* ════════════════════════════════
          HERO — editorial full-bleed
      ════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ height: 'min(92vh, 700px)' }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetInterval(); }
        }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img
              src={slide.img}
              alt={slide.tagline}
              className="w-full h-full object-cover object-top"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
          </div>
        ))}

        {/* Brand name top-center */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-4 pointer-events-none">
          <span className="heading-editorial-italic text-white text-2xl sm:text-3xl opacity-90">LORDLOOK</span>
        </div>

        {/* Bottom-left tagline */}
        <div className="absolute bottom-10 left-6 sm:left-10 z-20">
          <p className="label-upper text-white/70 mb-2">— Collection {new Date().getFullYear()}</p>
          <h1
            className="heading-editorial-italic text-white text-3xl sm:text-4xl md:text-5xl leading-tight max-w-xs"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            {SLIDES[active].tagline}
          </h1>
        </div>

        {/* Slide arrows */}
        <button
          onClick={() => { prev(); resetInterval(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => { next(); resetInterval(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); resetInterval(); }}
              className={`transition-all duration-300 ${i === active ? 'w-6 h-px bg-white' : 'w-2 h-px bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          INTRODUCTION — pull quote
      ════════════════════════════════ */}
      <motion.section
        className="py-16 sm:py-20 px-5 sm:px-8 max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <p className="label-upper text-[#888888] mb-6">Introduction</p>
        <blockquote className="serif-italic text-xl sm:text-2xl md:text-3xl text-[#1a1a1a] dark:text-[#f0ede8] leading-relaxed">
          "A clean canvas for the modern minimalist. Structured linen meets delicate raw silk."
        </blockquote>
        <p className="sans-light text-xs text-[#888888] mt-5 leading-relaxed max-w-md mx-auto">
          LordLook summer collection. Woven from premium fabrics, tailored, sculptural, draped, and neutral, from wardrobe themes to within-code transient fineries.
        </p>
      </motion.section>

      {/* ════════════════════════════════
          NEW ARRIVALS — asymmetric grid
      ════════════════════════════════ */}
      <section className="px-5 sm:px-8 max-w-7xl mx-auto pb-16">
        <motion.div
          className="flex items-baseline justify-between mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <h2 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8]">New Arrivals</h2>
          <div className="flex items-center gap-6 text-[#888888]">
            <Link to="/products" className="label-upper text-[10px] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors flex items-center gap-1">
              Filter <span className="ml-1">—</span>
            </Link>
            <Link to="/products" className="label-upper text-[10px] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors">
              View All
            </Link>
          </div>
        </motion.div>

        {/* Masonry 2-col layout matching reference */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {/* Left col: first product tall, third product normal */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {newArrivals.slice(0, 1).map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
              >
                <ProductCard product={p} variant="tall" />
              </motion.div>
            ))}
            {newArrivals.slice(2, 3).map((p, i) => (
              <motion.div
                key={p.id}
                custom={i + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
          {/* Right col: second product normal, fourth product tall */}
          <div className="flex flex-col gap-4 sm:gap-6 pt-12">
            {newArrivals.slice(1, 2).map((p, i) => (
              <motion.div
                key={p.id}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
            {newArrivals.slice(3, 4).map((p, i) => (
              <motion.div
                key={p.id}
                custom={i + 3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
              >
                <ProductCard product={p} variant="tall" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          EDITORIAL BANNER — Solitude & Form
      ════════════════════════════════ */}
      <motion.section
        className="relative overflow-hidden"
        style={{ height: 'min(55vh, 420px)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <img
          src="https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Editorial"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="label-upper text-white/50 mb-3">The Collection</p>
          <h2 className="heading-editorial-italic text-white text-4xl sm:text-5xl md:text-6xl">Solitude &amp; Form</h2>
          <p className="sans-light text-white/60 text-sm mt-3">Unworn threads of memory</p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 border border-white/40 text-white text-xs tracking-widest uppercase font-light hover:bg-white/10 transition-all"
          >
            Explore Collection
          </Link>
        </div>
      </motion.section>

      {/* ════════════════════════════════
          EDITORIAL FEATURE — full-width
      ════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="overflow-hidden group">
            <img
              src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Responsible Sourcing"
              className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              style={{ aspectRatio: '3/4' }}
              loading="lazy"
            />
          </div>
          <div className="pb-4">
            <p className="label-upper text-[9px] text-[#888888] mb-4">Our Commitment</p>
            <h3 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8] mb-4 leading-snug">
              Responsible Sourcing &amp; Craftsmanship
            </h3>
            <p className="sans-light text-sm text-[#888888] leading-relaxed mb-6">
              We work with artisan producers across India committed to ethical practices, fair wages, and environmental responsibility.
            </p>
            <Link
              to="/about"
              className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8] hover:opacity-50 transition-opacity flex items-center gap-2"
            >
              Read More →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════
          BULK ORDERS CTA
      ════════════════════════════════ */}
      <motion.section
        className="bg-[#1a1a1a] dark:bg-[#111] py-16 px-5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
      >
        <p className="label-upper text-[#888888] mb-4">For business</p>
        <h2 className="heading-editorial text-2xl sm:text-3xl text-[#f0ede8] mb-8">
          For Customized &amp; Bulk Orders
        </h2>
        <a
          href="https://wa.me/919876543210?text=Hi%20LordLook%2C%20I%20want%20to%20place%20a%20bulk%20order"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#f0ede8] text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:bg-white active:scale-95 transition-all duration-200"
        >
          <MessageCircle size={16} className="text-green-700" strokeWidth={1.5} />
          Connect with us on WhatsApp
        </a>
      </motion.section>
    </div>
  );
}
