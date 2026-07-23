import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, ALL_COLORS } from '../lib/mockData';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') ?? 'newest');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const sort = searchParams.get('sort');
    if (q !== null) setSearch(q);
    if (cat !== null) setSelectedCategory(cat);
    if (sort !== null) setSortBy(sort);
  }, [searchParams]);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const toggleColor = (c: string) =>
    setSelectedColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    if (selectedCategory) list = list.filter((p) => p.category_id === selectedCategory);
    if (selectedSizes.length > 0)
      list = list.filter((p) => p.product_sizes?.some((s) => selectedSizes.includes(s.size) && s.stock > 0));
    if (selectedColors.length > 0)
      list = list.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating_avg - a.rating_avg);
    else if (sortBy === 'trending') list = list.filter((p) => p.is_trending).concat(list.filter((p) => !p.is_trending));
    else if (sortBy === 'featured') list = list.filter((p) => p.is_featured).concat(list.filter((p) => !p.is_featured));
    return list;
  }, [search, selectedCategory, selectedSizes, selectedColors, priceRange, sortBy]);

  const clearFilters = () => {
    setSearch(''); setSelectedSizes([]); setSelectedColors([]);
    setPriceRange([0, 5000]); setSortBy('newest'); setSelectedCategory('');
    setSearchParams({});
  };

  const hasFilters = search || selectedSizes.length || selectedColors.length || selectedCategory || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <div className="bg-[#FAFAF8] dark:bg-[#0f0f0f] min-h-screen pt-14">
      {/* ── Page header ── */}
      <div className="border-b border-[#e8e8e8] dark:border-[#2a2a2a] px-5 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <p className="label-upper text-[#888888] mb-1">Explore</p>
            <h1 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8]">
              {selectedCategory
                ? MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? 'Shop'
                : 'All Products'}
            </h1>
          </div>
          <p className="sans-light text-xs text-[#888888]">{filtered.length} items</p>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="sticky top-14 z-30 bg-[#FAFAF8]/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-[#e8e8e8] dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-4">
          {/* Search input */}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent border-b border-[#e8e8e8] dark:border-[#2a2a2a] py-1.5 text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors"
            style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
          />

          {/* Sort */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-0 pr-5 py-1.5 bg-transparent text-xs text-[#888888] focus:outline-none font-light tracking-wider cursor-pointer hover:text-[#1a1a1a] dark:hover:text-[#f0ede8] transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="trending">Trending</option>
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" />
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex items-center gap-1.5 text-xs tracking-widest uppercase font-light transition-colors ${
              filtersOpen || hasFilters
                ? 'text-[#1a1a1a] dark:text-[#f0ede8]'
                : 'text-[#888888] hover:text-[#1a1a1a] dark:hover:text-[#f0ede8]'
            }`}
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* ── Filters panel ── */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-8 border-b border-[#e8e8e8] dark:border-[#2a2a2a] pb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Category */}
                <div>
                  <p className="label-upper text-[#888888] mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`px-3 py-1 text-xs font-light border transition-colors ${
                        !selectedCategory
                          ? 'border-[#1a1a1a] dark:border-[#f0ede8] text-[#1a1a1a] dark:text-[#f0ede8]'
                          : 'border-[#e8e8e8] dark:border-[#2a2a2a] text-[#888888] hover:border-[#1a1a1a] dark:hover:border-[#f0ede8]'
                      }`}
                    >
                      All
                    </button>
                    {MOCK_CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`px-3 py-1 text-xs font-light border transition-colors ${
                          selectedCategory === c.id
                            ? 'border-[#1a1a1a] dark:border-[#f0ede8] text-[#1a1a1a] dark:text-[#f0ede8]'
                            : 'border-[#e8e8e8] dark:border-[#2a2a2a] text-[#888888] hover:border-[#1a1a1a] dark:hover:border-[#f0ede8]'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <p className="label-upper text-[#888888] mb-3">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`w-10 h-10 text-xs font-light border transition-colors ${
                          selectedSizes.includes(s)
                            ? 'border-[#1a1a1a] dark:border-[#f0ede8] bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a]'
                            : 'border-[#e8e8e8] dark:border-[#2a2a2a] text-[#888888] hover:border-[#1a1a1a] dark:hover:border-[#f0ede8]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <p className="label-upper text-[#888888] mb-3">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_COLORS.map((c) => {
                      const isActive = selectedColors.includes(c.name);
                      const isLight = ['#FFFFFF', '#F5F5DC', '#F4C2C2', '#B0C4DE', '#87CEEB', '#B6B6B6', '#C2B280', '#9DC183', '#C3B091', '#C19A6B'].includes(c.hex);
                      return (
                        <button
                          key={c.name}
                          onClick={() => toggleColor(c.name)}
                          title={c.name}
                          className={`w-7 h-7 transition-all ${
                            isActive ? 'ring-1 ring-offset-1 ring-[#1a1a1a] dark:ring-[#f0ede8] scale-110' : 'hover:scale-105'
                          } ${isLight ? 'border border-[#e8e8e8]' : ''}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="label-upper text-[#888888] mb-3">
                    Price: ₹{priceRange[0]} – ₹{priceRange[1]}
                  </p>
                  <input
                    type="range" min={0} max={5000} step={100}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full accent-[#1a1a1a]"
                  />
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-6 flex items-center gap-1.5 label-upper text-[10px] text-[#888888] hover:text-red-500 transition-colors"
                >
                  <X size={12} /> Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Product grid ── */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="heading-editorial text-2xl text-[#1a1a1a] dark:text-[#f0ede8] mb-3">No products found</h3>
            <p className="sans-light text-sm text-[#888888] mb-8">Try adjusting your search or filters.</p>
            <button
              onClick={clearFilters}
              className="btn-editorial-outline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06, ease: 'easeOut' }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
