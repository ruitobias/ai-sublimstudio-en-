import React from 'react';
import { X } from 'lucide-react';

interface MD3BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function MD3BottomSheet({ isOpen, onClose, title, subtitle, children }: MD3BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-fadeIn sm:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-h-[85dvh] bg-[#12131a] border-t border-slate-700/80 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
        {/* Handle Bar */}
        <div className="w-full py-2.5 flex justify-center cursor-pointer touch-action-none" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-600/80 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 pb-2.5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <span className="font-bold text-sm text-slate-100 block">{title || 'Ajustes'}</span>
            {subtitle && <span className="text-[10px] text-slate-400 block">{subtitle}</span>}
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 touch-scroll-y overflow-y-auto custom-scrollbar max-h-[70dvh] flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
