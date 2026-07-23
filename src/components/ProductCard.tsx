import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product, ProductImage } from '../types';
import { useWishlistStore } from '../store/wishlistStore';

interface Props {
  product: Product & { product_images?: ProductImage[] };
  variant?: 'default' | 'tall';
}

export default function ProductCard({ product, variant = 'default' }: Props) {
  const { hasItem, toggle } = useWishlistStore();
  const wished = hasItem(product.id);
  const img = product.product_images?.[0]?.url ?? 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400';

  const discount = product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="group relative">
      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="block overflow-hidden bg-[#F5F5F3] dark:bg-[#1a1a1a]"
        style={{ aspectRatio: variant === 'tall' ? '2/3' : '3/4' }}
      >
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggle(product)}
        className={`absolute top-3 right-3 transition-all duration-200 hover:opacity-60 ${
          wished ? 'text-[#1a1a1a] dark:text-[#f0ede8]' : 'text-[#888888]'
        }`}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={16} strokeWidth={1.5} fill={wished ? 'currentColor' : 'none'} />
      </button>

      {/* Product info */}
      <div className="pt-3 pb-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="serif-italic text-sm text-[#1a1a1a] dark:text-[#f0ede8] line-clamp-1 hover:opacity-60 transition-opacity leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="sans-light text-sm text-[#1a1a1a] dark:text-[#f0ede8]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {discount > 0 && (
            <span className="sans-light text-xs text-[#888888] line-through">
              ₹{product.original_price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
