import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { products } from '../lib/catalog';
import { useToast } from './ToastContext';

const STORAGE_KEY = 'shubhlagn_wishlist';

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function getSafeInitialWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Retain only known SKU IDs
      const validIds = new Set(products.map((p) => p.id));
      return Array.from(new Set(parsed.filter((id) => typeof id === 'string' && validIds.has(id))));
    }
  } catch (e) {
    console.warn('Unable to read wishlist from localStorage, using memory state:', e);
  }
  return [];
}

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(getSafeInitialWishlist);
  const { showToast } = useToast();

  const saveToStorage = (ids: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn('Unable to persist wishlist to localStorage:', e);
    }
  };

  // Synchronize across browser tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setWishlistIds(getSafeInitialWishlist());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isInWishlist = useCallback(
    (id: string) => {
      return wishlistIds.includes(id);
    },
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlistIds((prev) => {
        const product = products.find((p) => p.id === id);
        const title = product ? product.name : id;
        let updated: string[];

        if (prev.includes(id)) {
          updated = prev.filter((item) => item !== id);
          showToast(`Removed from wishlist: ${title}`, {
            actionLabel: 'Undo',
            onAction: () => {
              setWishlistIds((curr) => {
                const restored = Array.from(new Set([...curr, id]));
                saveToStorage(restored);
                return restored;
              });
            }
          });
        } else {
          updated = Array.from(new Set([...prev, id]));
          showToast(`Saved to wishlist: ${title}`, { type: 'success' });
        }

        saveToStorage(updated);
        return updated;
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (id: string) => {
      setWishlistIds((prev) => {
        const product = products.find((p) => p.id === id);
        const title = product ? product.name : id;
        const updated = prev.filter((item) => item !== id);
        saveToStorage(updated);

        showToast(`Removed from wishlist: ${title}`, {
          actionLabel: 'Undo',
          onAction: () => {
            setWishlistIds((curr) => {
              const restored = Array.from(new Set([...curr, id]));
              saveToStorage(restored);
              return restored;
            });
          }
        });

        return updated;
      });
    },
    [showToast]
  );

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    saveToStorage([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}

