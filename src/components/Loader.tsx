import { useEffect, useState } from 'react';

/**
 * Loading screen shown on initial app load.
 *
 * To replace the loading animation with your own GIF/logo:
 * 1. Place your GIF file at: public/loading.gif
 * 2. Replace the spinner markup below with:
 *    <img src="/loading.gif" alt="Loading" className="h-16 w-16" />
 *
 * File location: src/components/Loader.tsx
 */
export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), 1400);
    const hideTimer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white dark:bg-gray-950 flex flex-col items-center justify-center transition-opacity duration-400 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-loader-pulse mb-6">
        <div className="w-14 h-14 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
          <span className="text-white dark:text-gray-900 font-black text-xl leading-none">LL</span>
        </div>
      </div>
      <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-loader-spin" />
    </div>
  );
}
