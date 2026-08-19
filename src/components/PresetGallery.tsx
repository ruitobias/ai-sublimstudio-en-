import React, { useState } from "react";
import { PRESET_TEMPLATES } from "../data/presets";
import { PresetTemplate, MugDesignConfig } from "../types";
import { Palette, Sparkles, ArrowRight } from "lucide-react";

interface PresetGalleryProps {
  config?: MugDesignConfig;
  setConfig?: React.Dispatch<React.SetStateAction<MugDesignConfig>>;
  onOpen3DViewer?: () => void;
  onApplyPreset?: (preset: PresetTemplate) => void;
  darkMode?: boolean;
}

export const PresetGallery: React.FC<PresetGalleryProps> = ({
  config,
  setConfig,
  onOpen3DViewer,
  onApplyPreset,
  darkMode = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const CATEGORIES = [
    "Todos",
    "Natal & Festas",
    "Datas Comemorativas",
    "Natureza & Paisagens",
    "Marcas & Empresas",
    "Exemplos do Guia",
    "Pets",
    "Profissões",
    "Gamer",
    "Café & Estilo",
    "Religioso",
  ];

  const filteredPresets =
    activeCategory === "Todos"
      ? PRESET_TEMPLATES
      : PRESET_TEMPLATES.filter((p) => p.category === activeCategory);

  const handleSelectPreset = (preset: PresetTemplate) => {
    if (setConfig) {
      setConfig({
        theme: preset.theme,
        character: preset.character,
        style: preset.style,
        colors: preset.colors,
        lighting: preset.lighting,
        background: preset.background,
        negativePrompt:
          "Texto, letras, palavras, assinatura, marca d'água, baixa resolução, borrado, pixelado, mãos deformadas, objetos cortados, fundo poluído, logotipos, molduras, excesso de elementos, distorções, baixa qualidade, arte incompleta.",
        imageUrl: preset.imageUrl,
        texts: preset.suggestedText
          ? [
              {
                id: "txt-preset",
                text: preset.suggestedText,
                fontFamily: "Montserrat",
                fontSize: 36,
                color: "#FFFFFF",
                strokeColor: "#000000",
                strokeWidth: 2,
                xPercent: 50,
                yPercent: 78,
                curveAmount: 0,
                alignment: "center",
                shadow: true,
              },
            ]
          : [],
      });
    }

    if (onApplyPreset) {
      onApplyPreset(preset);
    }

    if (onOpen3DViewer) {
      onOpen3DViewer();
    }
  };

  return (
    <div className={`space-y-6 pb-8 transition-colors ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
      {/* Intro Header */}
      <div className={`p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border transition-colors ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400 shrink-0" />
            Biblioteca de Modelos Prontos para Canecas
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Artes panorâmicas e prompts pré-configurados prontos para sublimação em diversos nichos.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl transition-all font-semibold cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : darkMode
                  ? "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                  : "bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPresets.map((preset) => (
          <div
            key={preset.id}
            className={`rounded-2xl overflow-hidden border shadow-xl transition-all flex flex-col justify-between group ${
              darkMode
                ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 hover:shadow-purple-500/10'
                : 'bg-white border-slate-200 hover:border-purple-500/50 hover:shadow-purple-500/10'
            }`}
          >
            <div>
              {/* Card Image Thumbnail */}
              <div className="relative aspect-[21/9.5] bg-slate-950 border-b border-slate-800/80 overflow-hidden">
                {!failedImages[preset.id] ? (
                  <img
                    src={preset.imageUrl}
                    alt={preset.title}
                    onError={() => handleImageError(preset.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 text-center border border-slate-800">
                    <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-1.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">{preset.title}</span>
                    <span className="text-[10px] text-purple-400 font-medium">Arte Panorâmica (21 × 9,5 cm)</span>
                  </div>
                )}
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-slate-700/80 text-purple-300 px-2 py-0.5 rounded-full shadow-sm">
                  {preset.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 space-y-2">
                <h3 className="text-sm sm:text-base font-bold group-hover:text-purple-400 transition-colors">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{preset.description}</p>

                <div className="pt-1.5 flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                  <span className={`px-2 py-0.5 rounded border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                    Estilo: {preset.style}
                  </span>
                  <span className={`px-2 py-0.5 rounded border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                    Fundo: {preset.background}
                  </span>
                </div>
              </div>
            </div>

            {/* Use Preset Button */}
            <div className="p-4 sm:p-5 pt-0">
              <button
                onClick={() => handleSelectPreset(preset)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white border border-slate-700 hover:border-purple-500'
                    : 'bg-slate-100 hover:bg-purple-600 text-slate-800 hover:text-white border border-slate-300 hover:border-purple-500'
                }`}
              >
                <span>Usar Este Modelo na Caneca 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
