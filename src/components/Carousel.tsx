import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    title: 'New Season Arrivals',
    subtitle: 'Crafted for the bold. Designed for the refined.',
    cta: 'Shop Now',
    ctaLink: '/products',
    img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 2,
    title: 'Premium Hoodies',
    subtitle: 'Warmth meets street style. 300GSM fleece.',
    cta: 'Explore Hoodies',
    ctaLink: '/products?category=cat-3',
    img: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 3,
    title: 'Oxford Collection',
    subtitle: 'Smart-casual redefined for modern gentlemen.',
    cta: 'View Shirts',
    ctaLink: '/products?category=cat-2',
    img: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 4,
    title: 'Trending Tees',
    subtitle: 'Graphic prints that speak before you do.',
    cta: 'Shop T-Shirts',
    ctaLink: '/products?category=cat-1',
    img: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 5,
    title: 'End of Season Sale',
    subtitle: 'Up to 40% off on selected styles.',
    cta: 'Grab Deals',
    ctaLink: '/products',
    img: 'https://images.pexels.com/photos/1852759/pexels-photo-1852759.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export default function Carousel() {
  const [active, setActive] = useState(0);
  const [touching, setTouching] = useState(false);
  const touchStartX = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 4500);
  }, [next]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setTouching(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      resetInterval();
    }
    setTouching(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ height: 'min(90vh, 640px)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          <div className="relative z-10 h-full flex items-center px-6 sm:px-12 max-w-7xl mx-auto">
            <div className={`max-w-lg transition-all duration-700 ${i === active && !touching ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <p className="text-gray-300 text-sm font-medium uppercase tracking-widest mb-3">
                LordLook — {new Date().getFullYear()}
              </p>
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
                {slide.title}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
                {slide.subtitle}
              </p>
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-all duration-200 hover:gap-3 active:scale-95"
              >
                {slide.cta}
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => { prev(); resetInterval(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors hidden sm:flex"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => { next(); resetInterval(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors hidden sm:flex"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); resetInterval(); }}
            className={`transition-all duration-300 rounded-full ${
              i === active ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
