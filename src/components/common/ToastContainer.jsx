import { useToast } from '../../context/ToastContext';

const TOAST_ICONS = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const borderColorMap = {
  success: 'border-l-primary',
  error: 'border-l-error',
  warning: 'border-l-[#78350f]',
  info: 'border-l-secondary',
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative flex items-start gap-3 bg-surface-container-lowest border-2 border-on-surface border-l-4 shadow-[4px_4px_0px_0px_rgba(38,24,28,1)] p-4 overflow-hidden animate-in ${borderColorMap[toast.type] || borderColorMap.info}`}
          role="alert"
        >
          <span className="text-sm mt-0.5 flex-shrink-0" aria-hidden="true">
            {TOAST_ICONS[toast.type]}
          </span>
          <div className="flex-1 min-w-0">
            {toast.title && <p className="font-headline-sm text-sm font-bold text-on-surface">{toast.title}</p>}
            <p className="text-sm text-on-surface-variant">{toast.message}</p>
          </div>
          <button
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer text-sm"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
