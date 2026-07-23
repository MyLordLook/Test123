import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14 flex items-center justify-center">
        <div className="text-center px-5">
          <h2 className="heading-editorial text-3xl text-[#1a1a1a] dark:text-[#f0ede8] mb-3">Your wishlist is empty</h2>
          <p className="sans-light text-sm text-[#888888] mb-8">Save pieces you love to revisit them later.</p>
          <Link to="/products" className="btn-editorial-outline">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="mb-8 border-b border-[#e8e8e8] dark:border-[#2a2a2a] pb-6">
          <p className="label-upper text-[#888888] mb-1">Saved</p>
          <h1 className="heading-editorial text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#f0ede8]">
            Wishlist <span className="sans-light text-base text-[#888888] ml-2">({items.length})</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
