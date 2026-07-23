import { Star } from 'lucide-react';

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}

export default function StarRating({ value, onChange, size = 20 }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className={`transition-transform ${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          disabled={!onChange}
        >
          <Star
            size={size}
            fill={n <= value ? '#FBBF24' : 'none'}
            stroke={n <= value ? '#FBBF24' : '#D1D5DB'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}
