import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { products, getProductById, calculateSavings } from '../lib/catalog';
import { useToast } from './ToastContext';

const STORAGE_KEY = 'shubhlagn_cart';
const MAX_ITEM_QTY = 10;

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  totalMrpSavings: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isMiniCartOpen: boolean;
  setIsMiniCartOpen: (open: boolean) => void;
  getItemProduct: (productId: string) => Product | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getSafeInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const validIds = new Set(products.map((p) => p.id));
      return parsed
        .filter((item) => item && typeof item.productId === 'string' && validIds.has(item.productId))
        .map((item) => ({
          productId: item.productId,
          quantity: Math.max(1, Math.min(MAX_ITEM_QTY, Number(item.quantity) || 1))
        }));
    }
  } catch (e) {
    console.warn('Unable to read cart from localStorage, using memory state:', e);
  }
  return [];
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(getSafeInitialCart);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { showToast } = useToast();

  const saveToStorage = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Unable to persist cart to localStorage:', e);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setItems(getSafeInitialCart());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getItemProduct = useCallback((productId: string): Product | undefined => {
    return getProductById(productId);
  }, []);

  const addToCart = useCallback(
    (productId: string, quantity: number = 1) => {
      const product = getProductById(productId);
      if (!product) return;

      const qtyToAdd = Math.max(1, Math.min(MAX_ITEM_QTY, quantity));

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.productId === productId);
        let updated: CartItem[];

        if (existingIndex > -1) {
          const currentQty = prev[existingIndex].quantity;
          const newQty = Math.min(MAX_ITEM_QTY, currentQty + qtyToAdd);
          updated = [...prev];
          updated[existingIndex] = { ...prev[existingIndex], quantity: newQty };
        } else {
          updated = [...prev, { productId, quantity: qtyToAdd }];
        }

        saveToStorage(updated);
        return updated;
      });

      showToast(`Added to bag: ${product.name}`, {
        type: 'success',
        actionLabel: 'View Bag',
        onAction: () => {
          setIsMiniCartOpen(true);
        }
      });
      setIsMiniCartOpen(true);
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      const clampedQty = Math.min(MAX_ITEM_QTY, quantity);

      setItems((prev) => {
        const updated = prev.map((item) =>
          item.productId === productId ? { ...item, quantity: clampedQty } : item
        );
        saveToStorage(updated);
        return updated;
      });
    },
    [] // removeFromCart is declared below or bound
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      const title = product ? product.name : productId;

      setItems((prev) => {
        const itemToRemove = prev.find((item) => item.productId === productId);
        const prevQty = itemToRemove ? itemToRemove.quantity : 1;
        const updated = prev.filter((item) => item.productId !== productId);
        saveToStorage(updated);

        showToast(`Removed from bag: ${title}`, {
          actionLabel: 'Undo',
          onAction: () => {
            setItems((curr) => {
              const restored = [...curr, { productId, quantity: prevQty }];
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

  const clearCart = useCallback(() => {
    setItems([]);
    saveToStorage([]);
  }, []);

  // Compute derived totals
  const cartCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  let subtotal = 0;
  let totalMrpSavings = 0;

  items.forEach((item) => {
    const prod = getProductById(item.productId);
    if (prod) {
      subtotal += prod.price * item.quantity;
      if (prod.mrp && prod.mrp > prod.price) {
        const savings = calculateSavings(prod.mrp, prod.price);
        if (savings) {
          totalMrpSavings += savings.amount * item.quantity;
        }
      }
    }
  });

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        totalMrpSavings,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isMiniCartOpen,
        setIsMiniCartOpen,
        getItemProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

