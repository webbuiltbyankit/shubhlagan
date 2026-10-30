import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'alert';
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (text: string, options?: { type?: 'info' | 'success' | 'alert'; actionLabel?: string; onAction?: () => void }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (text: string, options?: { type?: 'info' | 'success' | 'alert'; actionLabel?: string; onAction?: () => void }) => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
      const newToast: ToastMessage = {
        id,
        text,
        type: options?.type || 'info',
        actionLabel: options?.actionLabel,
        onAction: options?.onAction
      };

      setToasts((prev) => [...prev.slice(-2), newToast]); // Keep max 3 toasts

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div
        className="toast-container"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: '380px',
          width: 'calc(100% - 48px)',
          pointerEvents: 'none'
        }}
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            style={{
              pointerEvents: 'auto',
              backgroundColor: '#1C1E21',
              color: '#FFFFFF',
              padding: '12px 16px',
              borderRadius: '4px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              fontSize: '0.88rem',
              animation: 'fadeInUp 200ms ease'
            }}
          >
            <span>{toast.text}</span>
            {toast.actionLabel && toast.onAction && (
              <button
                onClick={() => {
                  toast.onAction!();
                  removeToast(toast.id);
                }}
                style={{
                  color: '#D4AF37',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '2px'
                }}
              >
                {toast.actionLabel}
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

