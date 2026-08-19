import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface SnackbarMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  message: string;
  actionText?: string;
  onAction?: () => void;
}

interface MD3SnackbarProps {
  snackbar: SnackbarMessage | null;
  onClose: () => void;
}

export const MD3Snackbar: React.FC<MD3SnackbarProps> = ({ snackbar, onClose }) => {
  useEffect(() => {
    if (!snackbar) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [snackbar, onClose]);

  if (!snackbar) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-slide-up">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#1e293b] border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 shadow-black/50">
        <div className="flex items-center gap-3">
          {iconMap[snackbar.type || 'info']}
          <span className="text-xs sm:text-sm font-medium leading-snug">{snackbar.message}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {snackbar.actionText && snackbar.onAction && (
            <button
              onClick={() => {
                snackbar.onAction?.();
                onClose();
              }}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wide px-2 py-1 rounded-lg hover:bg-emerald-500/10 transition-colors"
            >
              {snackbar.actionText}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
