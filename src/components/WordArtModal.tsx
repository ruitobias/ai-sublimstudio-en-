import React from 'react';
import { WordArtStudio } from './WordArtStudio';

interface WordArtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWordArtImage: (
    dataUrl: string,
    title?: string,
    wordItems?: any[],
    wordShape?: string,
    wordPaletteId?: string,
    wordFont?: string,
    wordLayout?: 'mixed' | 'horizontal' | 'angles'
  ) => void;
  darkMode?: boolean;
}

export const WordArtModal: React.FC<WordArtModalProps> = ({
  isOpen,
  onClose,
  onAddWordArtImage,
  darkMode = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in select-none">
      <div
        className={`w-full max-w-6xl h-[92vh] rounded-3xl shadow-2xl border overflow-hidden flex flex-col transition-colors ${
          darkMode ? 'bg-[#0f1118] border-[#222738]' : 'bg-white border-slate-200'
        }`}
      >
        <WordArtStudio
          onClose={onClose}
          darkMode={darkMode}
          onAddWordArtImage={(dataUrl, title, words, shape, palette, font, layout) => {
            onAddWordArtImage(dataUrl, title, words, shape, palette, font, layout);
            onClose();
          }}
        />
      </div>
    </div>
  );
};
