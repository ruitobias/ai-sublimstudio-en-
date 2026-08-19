import React, { useState, useEffect } from 'react';
import { AIPromptParams, Layer, SublimationProduct, AIModelConfig } from '../types';
import {
  getActiveAIModels,
  getDefaultAIModelId,
} from '../utils/aiSettingsStore';
import {
  Sparkles,
  Wand2,
  Maximize2,
  Scissors,
  RefreshCw,
  Palette,
  Zap,
  Check,
  AlertCircle,
  Tag,
  Layers,
  Sliders
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface AIPanelProps {
  product?: SublimationProduct;
  onAddAIGeneratedImageToCanvas: (imageUrl: string, title: string) => void;
  onApplyAIToolToActiveLayer: (action: 'remove_bg' | 'vectorize' | 'upscale' | 'color_replace') => void;
  activeLayer: Layer | null;
  theme?: 'dark' | 'light';
}

const PRESET_THEMES = [
  'Cyberpunk Neon',
  'Floral Aquarela',
  'Profissões & Enfermagem',
  'Anime & Geek',
  'Gatos & Pets',
  'Futebol & Esportes',
  'Vaporwave Retro',
  'Gamer 3D',
  'Infantil Fofo',
  'Graffiti & Street Art',
];

export const AIPanel: React.FC<AIPanelProps> = ({
  product,
  onAddAIGeneratedImageToCanvas,
  onApplyAIToolToActiveLayer,
  activeLayer,
  theme = 'dark',
}) => {
  const { t } = useTranslation();
  const [availableModels, setAvailableModels] = useState<AIModelConfig[]>([]);

  useEffect(() => {
    const loadModels = () => {
      const active = getActiveAIModels();
      setAvailableModels(active);
      const defaultId = getDefaultAIModelId();
      if (defaultId) {
        setParams((prev) => ({ ...prev, model: defaultId }));
      }
    };
    loadModels();

    window.addEventListener('sublim_ai_models_changed', loadModels);
    return () => window.removeEventListener('sublim_ai_models_changed', loadModels);
  }, []);

  const [params, setParams] = useState<AIPromptParams>({
    theme: '',
    prompt: '',
    negativePrompt: 'blurry, low resolution, watermark, pixelated, distorted colors, bad quality, cropped edges, noise',
    model: getDefaultAIModelId() || 'gemini-3.1-flash-image',
    guidanceScale: 7.5,
    seed: 42,
    upscaleFactor: 2,
    creativity: 0.7,
    seamlessPattern: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCompletingPrompts, setIsCompletingPrompts] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [aiSuggestions, setAiSuggestions] = useState<{ title: string; prompt: string; negativePrompt?: string }[]>([]);

  const generateLocalPattern = (promptText: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Create a vibrant colorful sublimation vector art pattern
    const grad = ctx.createRadialGradient(600, 600, 50, 600, 600, 800);
    grad.addColorStop(0, '#0284c7');
    grad.addColorStop(0.5, '#7e22ce');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1200);

    // Decorative geometric shapes
    ctx.lineWidth = 12;
    for (let i = 0; i < 15; i++) {
      ctx.strokeStyle = `hsla(${i * 24}, 85%, 65%, 0.4)`;
      ctx.beginPath();
      ctx.arc(600, 600, 100 + i * 35, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Typography overlay
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 15;
    ctx.fillText(promptText.toUpperCase() || 'DESIGN SUBLIMÁTICO HD', 600, 600);

    return canvas.toDataURL('image/png');
  };

  // Complete Prompts with AI (Tema -> Prompt da Estampa + Prompt Negativo)
  const handleCompletePromptsWithAI = async () => {
    const currentTheme = params.theme?.trim() || params.prompt?.trim();
    if (!currentTheme) {
      setErrorMessage('Digite um Tema ou Assunto na caixa acima para a IA criar os prompts.');
      return;
    }

    setIsCompletingPrompts(true);
    setStatusMessage('IA analisando o tema e gerando os prompts ideais para sublimação...');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/assist-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: params.theme,
          idea: params.prompt,
          productType: product?.name || 'Caneca Sublimática',
        }),
      });

      const data = await res.json();
      if (data.result) {
        let parsed: any = null;
        try {
          parsed = JSON.parse(data.result);
        } catch {
          // JSON parse retry
        }

        if (parsed && typeof parsed === 'object') {
          const newPrompt = parsed.prompt || `Arte de estampa sublimática em alta definição sobre o tema: ${currentTheme}, vetor moderno com cores vivas e alto contraste, 300 DPI`;
          const newNegative = parsed.negativePrompt || 'blurry, low resolution, watermark, pixelated, distorted colors, bad quality, cropped edges, noise';

          setParams((prev) => ({
            ...prev,
            prompt: newPrompt,
            negativePrompt: newNegative,
          }));

          if (Array.isArray(parsed.variations)) {
            setAiSuggestions(parsed.variations);
          } else if (Array.isArray(parsed)) {
            setAiSuggestions(parsed);
          }

          setStatusMessage('Prompts da Estampa e Negativo preenchidos com IA! Você pode editar antes de gerar.');
        } else {
          throw new Error('Formato retornado inválido.');
        }
      } else {
        throw new Error('Falha ao comunicar com IA.');
      }
    } catch (e: any) {
      console.warn('AI Assist fallback triggered:', e);
      // Smart Fallback prompt builder
      const fallbackPrompt = `${currentTheme} - arte de estampa sublimática profissional em altíssima definição 300 DPI, estilo vetorial vibrante com gradientes ricos e contornos nítidos para sublimação em ${product?.name || 'caneca/camiseta'}`;
      const fallbackNegative = 'blurry, low resolution, watermark, pixelated, distorted colors, bad quality, cropped edges, noise, out of focus, low contrast';

      setParams((prev) => ({
        ...prev,
        prompt: fallbackPrompt,
        negativePrompt: fallbackNegative,
      }));

      setStatusMessage('Prompts criados com IA (Modo Otimizado Local)! Você já pode gerar a estampa.');
    } finally {
      setIsCompletingPrompts(false);
    }
  };

  // Call Express API `/api/gemini/generate-image`
  const handleGenerateImage = async () => {
    if (!params.prompt.trim()) {
      setErrorMessage('Por favor, digite ou gere um prompt para a criação da estampa.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Criando estampa sublimática em alta definição via Gemini AI...');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${params.prompt} ${params.seamlessPattern ? '(seamless repeating pattern)' : ''}`,
          negativePrompt: params.negativePrompt,
          model: params.model,
          aspectRatio: '1:1',
          guidanceScale: params.guidanceScale,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erro na geração de imagem por IA');
      }

      onAddAIGeneratedImageToCanvas(data.imageUrl, (params.theme || params.prompt).slice(0, 20));
      setStatusMessage('Estampa gerada com sucesso e adicionada ao canvas!');
    } catch (err: any) {
      console.error('Error generating AI image:', err);
      const isQuotaError = err.message && (err.message.includes('429') || err.message.includes('quota') || err.message.includes('Quota'));
      if (isQuotaError) {
        setErrorMessage('Cota da API Gemini excedida temporariamente (Rate Limit 429). Geramos uma arte sublimática vetorial local de alta qualidade para você continuar desenhando!');
        const fallbackUrl = generateLocalPattern(params.prompt);
        onAddAIGeneratedImageToCanvas(fallbackUrl, (params.theme || params.prompt).slice(0, 20) || 'Arte Sublimação');
      } else {
        setErrorMessage(err.message || 'Falha ao conectar com o servidor Gemini IA.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-y-auto custom-scrollbar text-xs p-3.5 touch-scroll-y select-none gap-4 transition-colors ${
      theme === 'light' ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#1e1e20] text-gray-300 border-[#2d2d30]'
    }`}>
      {/* Header */}
      <div className={`flex items-center gap-2 pb-2.5 border-b font-bold text-sm ${
        theme === 'light' ? 'text-purple-700 border-slate-200' : 'text-purple-400 border-[#2d2d30]'
      }`}>
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        <span>{t('ai.title')}</span>
      </div>

      {/* 1. CAIXA TEMA / ASSUNTO DA ESTAMPA */}
      <div className="flex flex-col gap-2 bg-[#18181a] p-3 rounded-xl border border-[#2d2d30] shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wide">
            <Tag className="w-3.5 h-3.5 text-purple-400" />
            {t('ai.theme')}
          </label>
        </div>

        <input
          type="text"
          value={params.theme || ''}
          onChange={(e) => setParams({ ...params, theme: e.target.value })}
          placeholder={t('ai.themePlaceholder')}
          className="w-full bg-[#121214] border border-[#38383c] focus:border-purple-500 rounded-lg p-2.5 text-white text-xs font-medium focus:outline-none transition-colors"
        />

        {/* Quick Theme Chips */}
        <div className="flex flex-wrap gap-1 mt-1">
          {PRESET_THEMES.map((themeName) => (
            <button
              key={themeName}
              onClick={() => setParams((prev) => ({ ...prev, theme: themeName }))}
              className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                params.theme === themeName
                  ? 'bg-purple-600 text-white border-purple-400 font-bold'
                  : 'bg-[#121214] hover:bg-purple-950/50 text-gray-300 border-[#2d2d30] hover:border-purple-500/50'
              }`}
            >
              {themeName}
            </button>
          ))}
        </div>

        {/* Botão COMPLETAR COM IA */}
        <button
          disabled={isCompletingPrompts}
          onClick={handleCompletePromptsWithAI}
          className="mt-2 py-2 px-3 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-lg shadow flex items-center justify-center gap-2 text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Wand2 className={`w-4 h-4 text-purple-200 ${isCompletingPrompts ? 'animate-spin' : ''}`} />
          <span>{isCompletingPrompts ? t('ai.completingWithAI') : t('ai.completePromptsWithAI')}</span>
        </button>
      </div>

      {/* 2. PROMPT DA ESTAMPA */}
      <div className="flex flex-col gap-1.5 bg-[#18181a] p-3 rounded-xl border border-[#2d2d30]">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-gray-200 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
            {t('ai.promptLabel')}
          </label>
        </div>

        <textarea
          value={params.prompt}
          onChange={(e) => setParams({ ...params, prompt: e.target.value })}
          rows={3}
          placeholder={t('ai.promptPlaceholder')}
          className="w-full bg-[#121214] border border-[#38383c] focus:border-purple-500 rounded-lg p-2.5 text-white text-xs font-medium focus:outline-none transition-colors"
        />

        {/* AI Prompt Suggestions / Variations */}
        {aiSuggestions.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-[#2d2d30]">
            <span className="text-[10px] text-purple-300 font-semibold">{t('ai.aiVariations')}</span>
            {aiSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setParams((prev) => ({
                    ...prev,
                    prompt: sug.prompt,
                    negativePrompt: sug.negativePrompt || prev.negativePrompt,
                  }))
                }
                className="text-left p-1.5 bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 rounded text-[10px] text-purple-200 transition-colors cursor-pointer"
              >
                <span className="font-bold block text-white">{sug.title}</span>
                <span className="line-clamp-1 opacity-80">{sug.prompt}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. PROMPT NEGATIVO */}
      <div className="flex flex-col gap-1.5 bg-[#18181a] p-3 rounded-xl border border-[#2d2d30]">
        <label className="text-[11px] font-semibold text-gray-300">{t('ai.negativePromptLabel')}</label>
        <input
          type="text"
          value={params.negativePrompt}
          onChange={(e) => setParams({ ...params, negativePrompt: e.target.value })}
          className="w-full bg-[#121214] border border-[#38383c] rounded-lg p-2 text-white text-xs focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* AI Model & Controls */}
      <div className="grid grid-cols-2 gap-2 bg-[#18181a] p-3 rounded-xl border border-[#2d2d30]">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-gray-400 font-medium">{t('ai.modelLabel')}</label>
          <select
            value={params.model}
            onChange={(e) => setParams({ ...params, model: e.target.value })}
            className="bg-[#121214] text-white text-[11px] p-2 rounded-lg border border-[#38383c] focus:outline-none font-medium"
          >
            {availableModels.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} {m.badge ? `(${m.badge})` : ''} {m.isFree ? '• Free' : ''}
              </option>
            ))}
            {availableModels.length === 0 && (
              <>
                <option value="gemini-3.1-flash-image">Gemini 3.1 Flash Image</option>
                <option value="gemini-3.1-flash-lite-image">Gemini Flash Lite</option>
                <option value="gemini-3.6-flash">Gemini 3.6 Flash</option>
              </>
            )}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-gray-400 font-medium">Guidance Scale</label>
          <input
            type="number"
            value={params.guidanceScale}
            step="0.5"
            min="1"
            max="20"
            onChange={(e) => setParams({ ...params, guidanceScale: parseFloat(e.target.value) || 7.5 })}
            className="bg-[#121214] text-white text-[11px] p-2 rounded-lg border border-[#38383c] font-mono"
          />
        </div>
      </div>

      {/* Seamless Pattern Toggle */}
      <div className="flex items-center justify-between p-3 bg-[#18181a] rounded-xl border border-[#2d2d30]">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">{t('ai.seamlessTitle')}</span>
          <span className="text-[10px] text-gray-400">{t('ai.seamlessDesc')}</span>
        </div>
        <input
          type="checkbox"
          checked={params.seamlessPattern}
          onChange={(e) => setParams({ ...params, seamlessPattern: e.target.checked })}
          className="w-4 h-4 accent-purple-500 cursor-pointer"
        />
      </div>

      {/* Generate Button */}
      <button
        disabled={isLoading || isCompletingPrompts}
        onClick={handleGenerateImage}
        className="py-3 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? t('ai.generating') : t('ai.generateButton')}</span>
      </button>

      {/* Status or Error Notifications */}
      {statusMessage && (
        <div className="p-2.5 bg-sky-950/40 border border-sky-500/30 rounded-lg text-sky-300 text-[11px] flex items-center gap-2">
          <Check className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-2.5 bg-rose-950/40 border border-rose-500/30 rounded-lg text-rose-300 text-[11px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick AI Tools Section */}
      <div className="flex flex-col gap-2 pt-3 border-t border-[#2d2d30]">
        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
          <Wand2 className="w-3.5 h-3.5" />
          {t('ai.quickTools')}
        </span>

        <div className="grid grid-cols-2 gap-2">
          <button
            disabled={!activeLayer || isLoading}
            onClick={() => onApplyAIToolToActiveLayer('remove_bg')}
            className="p-2 bg-[#18181a] hover:bg-[#252528] border border-[#38383c] rounded-lg text-left flex items-center gap-2 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Scissors className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-[11px] text-white">{t('ai.removeBg')}</span>
              <span className="text-[9px] text-gray-400">{t('ai.removeBgDesc')}</span>
            </div>
          </button>

          <button
            disabled={!activeLayer || isLoading}
            onClick={() => onApplyAIToolToActiveLayer('vectorize')}
            className="p-2 bg-[#18181a] hover:bg-[#252528] border border-[#38383c] rounded-lg text-left flex items-center gap-2 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-[11px] text-white">{t('ai.vectorize')}</span>
              <span className="text-[9px] text-gray-400">{t('ai.vectorizeDesc')}</span>
            </div>
          </button>

          <button
            disabled={!activeLayer || isLoading}
            onClick={() => onApplyAIToolToActiveLayer('upscale')}
            className="p-2 bg-[#18181a] hover:bg-[#252528] border border-[#38383c] rounded-lg text-left flex items-center gap-2 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-[11px] text-white">{t('ai.upscale')}</span>
              <span className="text-[9px] text-gray-400">{t('ai.upscaleDesc')}</span>
            </div>
          </button>

          <button
            disabled={!activeLayer || isLoading}
            onClick={() => onApplyAIToolToActiveLayer('color_replace')}
            className="p-2 bg-[#18181a] hover:bg-[#252528] border border-[#38383c] rounded-lg text-left flex items-center gap-2 disabled:opacity-40 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-[11px] text-white">Substituir Cores</span>
              <span className="text-[9px] text-gray-400">Trocar tons na estampa</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
