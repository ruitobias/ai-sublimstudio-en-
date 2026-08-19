import React, { useState } from 'react';
import { Sparkles, Zap, Image, Scissors, Palette, Wand2, Loader2, RefreshCw } from 'lucide-react';
import { VectorElement } from '../types';
import { AIEngine } from '../utils/aiEngine';

interface FloatingAIConsoleProps {
  setElements: React.Dispatch<React.SetStateAction<VectorElement[]>>;
  setSelectedIds: (ids: string[]) => void;
  onClose?: () => void;
  darkMode?: boolean;
}

export const FloatingAIConsole: React.FC<FloatingAIConsoleProps> = ({
  setElements,
  setSelectedIds,
  onClose,
  darkMode = true
}) => {
  const [prompt, setPrompt] = useState('Tucano tropical em aquarela vibrante');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Pronto para criar');

  const handleExecuteAI = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setStatusMsg('[CALL]:[PRODUCT:Mug]+[UPSCALE:4K] Gerando imagem Pollinations Flux...');

    try {
      const imageUrl = AIEngine.generateSublimationArtUrl(prompt, 1080, 1350);

      const newAiElement: VectorElement = {
        id: `ai_img_${Date.now()}`,
        name: `Estampa IA - ${prompt.slice(0, 15)}...`,
        type: 'image',
        x: 140,
        y: 180,
        w: 800,
        h: 800,
        rotation: 0,
        visible: true,
        locked: false,
        opacity: 100,
        fill: 'transparent',
        stroke: '#00D9FF',
        strokeWidth: 2,
        content: imageUrl
      };

      setElements((prev) => [...prev, newAiElement]);
      setSelectedIds([newAiElement.id]);
      setStatusMsg('Arte adicionada à tela com sucesso!');
    } catch (err) {
      setStatusMsg('Erro ao gerar imagem. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[620px] border rounded-2xl shadow-2xl p-2.5 flex flex-col gap-2 z-30 backdrop-blur-md select-none transition-colors ${
        darkMode ? 'bg-[#0E131F]/90 border-cyan-500/50 text-slate-100' : 'bg-white/95 border-cyan-500/50 text-slate-800 shadow-2xl'
      }`}
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between px-1 text-[11px] font-bold">
        <div className="flex items-center gap-1.5 text-cyan-500">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>IA Studio Copilot [Flux Engine]</span>
        </div>
        <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{statusMsg}</span>
      </div>

      {/* Input Prompt Box */}
      <div
        className={`flex items-center gap-2 border focus-within:border-cyan-500 rounded-xl p-1.5 transition-all ${
          darkMode ? 'bg-[#141A29] border-[#232D3F]' : 'bg-slate-100 border-slate-300'
        }`}
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva a estampa desejada (ex: Pôr do sol retrô 80s, Flores aquarela...)"
          className={`flex-1 bg-transparent px-2 py-1 text-xs font-medium outline-none ${
            darkMode ? 'text-slate-100' : 'text-slate-800'
          }`}
          onKeyDown={(e) => e.key === 'Enter' && handleExecuteAI()}
        />

        <button
          onClick={handleExecuteAI}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:brightness-110 disabled:opacity-50 text-white text-xs font-black rounded-lg shadow-lg cursor-pointer transition-all active:scale-95"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          <span>Gerar IA</span>
        </button>
      </div>

      {/* Quick Tool Tags */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5 text-[10px] font-bold">
        <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Comandos:</span>
        <button
          onClick={() => setPrompt('Floral aquarela delicado com beija-flor')}
          className={`px-2 py-0.5 border rounded-md whitespace-nowrap cursor-pointer ${
            darkMode
              ? 'bg-[#182030] hover:bg-[#232D3F] border-[#2A3447] text-purple-300'
              : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700'
          }`}
        >
          🌸 Floral Aquarela
        </button>
        <button
          onClick={() => setPrompt('Leão tribal dourado com detalhes geométricos')}
          className={`px-2 py-0.5 border rounded-md whitespace-nowrap cursor-pointer ${
            darkMode
              ? 'bg-[#182030] hover:bg-[#232D3F] border-[#2A3447] text-amber-300'
              : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
          }`}
        >
          🦁 Leão Tribal
        </button>
        <button
          onClick={() => setPrompt('Praia tropical neon synthwave 80s')}
          className={`px-2 py-0.5 border rounded-md whitespace-nowrap cursor-pointer ${
            darkMode
              ? 'bg-[#182030] hover:bg-[#232D3F] border-[#2A3447] text-cyan-300'
              : 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200 text-cyan-800'
          }`}
        >
          🌴 Neon Synthwave
        </button>
      </div>
    </div>
  );
};
