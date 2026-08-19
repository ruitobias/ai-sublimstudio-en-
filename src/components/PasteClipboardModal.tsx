import React, { useState, useEffect, useRef } from 'react';
import { X, Clipboard, Upload, Image as ImageIcon, Sparkles, Check, AlertCircle } from 'lucide-react';

interface PasteClipboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImagePasted: (fileOrBlob: Blob | File, nameHint?: string) => void;
  theme?: 'dark' | 'light';
}

export const PasteClipboardModal: React.FC<PasteClipboardModalProps> = ({
  isOpen,
  onClose,
  onImagePasted,
  theme = 'dark',
}) => {
  const [pastedImage, setPastedImage] = useState<{
    dataUrl: string;
    blob: Blob;
    width: number;
    height: number;
    name: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPastedImage(null);
      // Focus modal container so paste event catches immediately
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleProcessBlob = (blob: Blob | File, nameHint?: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      const img = new Image();
      img.onload = () => {
        setPastedImage({
          dataUrl,
          blob,
          width: img.naturalWidth || 500,
          height: img.naturalHeight || 500,
          name: nameHint || (blob as File).name || `Imagem Colada (${img.naturalWidth}x${img.naturalHeight}px)`,
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(blob);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const blob = item.getAsFile();
          if (blob) {
            handleProcessBlob(blob, 'Estampa Colada (Área de Transparência)');
            return;
          }
        }
      }

      // Check for Data URL text or direct image URL
      const text = e.clipboardData?.getData('text/plain')?.trim();
      if (text && (text.startsWith('data:image/') || text.match(/^https?:\/\/.*\.(png|jpg|jpeg|webp|svg)(\?.*)?$/i))) {
        e.preventDefault();
        fetch(text)
          .then((res) => res.blob())
          .then((blob) => handleProcessBlob(blob, 'Estampa Colada da URL'))
          .catch(() => {});
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmInsert = () => {
    if (pastedImage) {
      onImagePasted(pastedImage.blob, pastedImage.name);
      onClose();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessBlob(file, file.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleProcessBlob(file, file.name);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fadeIn">
      <div
        ref={modalRef}
        tabIndex={0}
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl border transition-all outline-none overflow-hidden ${
          theme === 'light'
            ? 'bg-white text-slate-800 border-slate-200'
            : 'bg-[#18181f] text-slate-100 border-[#2b2b36]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Clipboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide flex items-center gap-2">
                Colar Imagem com Transparência
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  PNG Alpha
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pressione <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700 font-mono text-[10px]">Ctrl + V</kbd> no teclado ou selecione uma imagem
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {!pastedImage ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 min-h-[220px] ${
                isDragging
                  ? 'border-emerald-400 bg-emerald-500/10 scale-[0.99]'
                  : theme === 'light'
                  ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400'
                  : 'border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-400/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-600/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg animate-pulse">
                <Clipboard className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold text-emerald-200">
                  Pressione <span className="underline decoration-emerald-400 underline-offset-4">Ctrl + V</span> agora para colar
                </p>
                <p className="text-xs text-slate-400">
                  Ou clique aqui para escolher um arquivo de imagem / PNG do seu computador
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Suporta fotos copiadas do Photoshop, Canva, Chrome e PNG transparente</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <Check className="w-4 h-4" /> Imagem Carregada ({pastedImage.width}x{pastedImage.height}px)
                </span>
                <button
                  onClick={() => setPastedImage(null)}
                  className="text-slate-400 hover:text-emerald-300 underline cursor-pointer text-[11px]"
                >
                  Substituir ou Colar outra (Ctrl+V)
                </button>
              </div>

              {/* Preview with checkerboard pattern for transparency visualization */}
              <div
                className="relative rounded-xl border border-slate-700/80 overflow-hidden flex items-center justify-center p-3 min-h-[200px] max-h-[280px]"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #262633 25%, transparent 25%),
                    linear-gradient(-45deg, #262633 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #262633 75%),
                    linear-gradient(-45deg, transparent 75%, #262633 75%)
                  `,
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                  backgroundColor: '#1a1a24',
                }}
              >
                <img
                  src={pastedImage.dataUrl}
                  alt="Preview da Estampa"
                  className="max-h-[250px] max-w-full object-contain drop-shadow-md rounded"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-200/90 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>O fundo quadriculado confirma a visualização da transparência PNG (Alpha Channel).</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-5 py-3.5 border-t border-slate-800 bg-slate-900/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          {pastedImage && (
            <button
              onClick={handleConfirmInsert}
              className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inserir Estampa na Arte</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
