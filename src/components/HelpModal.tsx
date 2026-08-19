import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Star,
  Box,
  Sparkles,
  Lightbulb,
  Printer,
  Shapes,
  Flame,
  Wand2,
  Image as ImageIcon,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  Search,
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark' | string;
}

export function HelpModal({ isOpen, onClose, theme = 'dark' }: HelpModalProps) {
  const [activeCategory, setActiveTab] = useState<'elementos' | 'produtos' | 'estudio_ia' | 'atalhos'>('elementos');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full max-w-5xl max-h-[92dvh] h-full rounded-3xl shadow-2xl border flex flex-col overflow-hidden transition-all pb-[env(safe-area-inset-bottom,0px)] ${
          theme === 'light'
            ? 'bg-slate-100 border-slate-300 text-slate-800'
            : 'bg-[#0f1118] border-[#2d2f3a] text-gray-100'
        }`}
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-purple-500/20 bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide flex items-center gap-2">
                CENTRAL DE AJUDA & GUIA TÉCNICO
              </h2>
              <p className="text-xs text-purple-300 font-medium hidden sm:block">
                Explicação Completa: Elementos Vetoriais • Produtos Sublimáveis • Estúdio IA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800/80 bg-slate-900/60 overflow-x-auto custom-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('elementos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'elementos'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Shapes className="w-4 h-4" />
            <span>1. Elementos &amp; Formas Vetoriais</span>
          </button>

          <button
            onClick={() => setActiveTab('produtos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'produtos'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>2. Produtos Sublimáveis (8)</span>
          </button>

          <button
            onClick={() => setActiveTab('estudio_ia')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'estudio_ia'
                ? 'bg-gradient-to-r from-purple-500 via-pink-600 to-amber-500 text-white shadow-md'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Estúdio IA (Gemini 3.1)</span>
          </button>

          <button
            onClick={() => setActiveTab('atalhos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'atalhos'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Atalhos &amp; Dicas</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar touch-scroll-y p-4 sm:p-6 space-y-6 selection:bg-purple-500/30">
          {/* TAB 1: ELEMENTOS E FORMAS VETORIAIS */}
          {activeCategory === 'elementos' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 border border-amber-500/30 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Shapes className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">BIBLIOTECA DE ELEMENTOS E FORMAS VETORIAIS</h3>
                    <p className="text-xs text-amber-300/80">
                      Crie layouts profissionais com linhas, setas, emblemas e polígonos totalmente personalizáveis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Categorias de Formas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Categorias Disponíveis de Formas
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    <li className="flex items-start gap-2 bg-slate-800/50 p-2 rounded-lg">
                      <span className="text-amber-400 font-bold shrink-0">• Linhas &amp; Setas:</span>
                      <span>Linha Simples, Setas Direcionais, Seta Dupla e Curva Suave para apontar e conectar detalhes da estampa.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-800/50 p-2 rounded-lg">
                      <span className="text-amber-400 font-bold shrink-0">• Formas Geométricas:</span>
                      <span>Retângulo, Círculo, Triângulo, Estrela de 5 Pontas, Hexágono e Distintivos.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-800/50 p-2 rounded-lg">
                      <span className="text-amber-400 font-bold shrink-0">• Elementos Riscados:</span>
                      <span>Molduras artísticas, riscos em aquarela, bordas tracejadas e traços decorativos.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Propriedades e Estilização Vetorial
                  </h4>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                      <strong className="text-white block mb-0.5">🎨 Preenchimento &amp; Gradiente:</strong>
                      <span>Escolha cores sólidas (HEX, RGB) ou gradientes suaves com ângulo ajustável para fundos de canecas e capas.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                      <strong className="text-white block mb-0.5">✏️ Bordas &amp; Tracejado:</strong>
                      <span>Ajuste espessura de borda (Stroke Width) de 0px a 50px e alterne entre contorno contínuo, pontilhado ou tracejado.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                      <strong className="text-white block mb-0.5">🔳 Arredondamento (Corner Radius):</strong>
                      <span>Transforme retângulos pontudos em caixas suavizadas para criar botões e placas de presente.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recursos Especiais */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <strong className="text-amber-300 font-bold block mb-1">⭐ Usados Recentemente:</strong>
                  <p className="text-gray-300">
                    O aplicativo grava automaticamente os últimos 12 elementos utilizados para acelerar seu fluxo de criação em lote.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                  <strong className="text-purple-300 font-bold block mb-1">📑 Gestão de Camadas:</strong>
                  <p className="text-gray-300">
                    Traga formas para a frente ou envie para trás. Use opacidade (0-100%) e cadeado para travar elementos no fundo.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                  <strong className="text-sky-300 font-bold block mb-1">🔍 Busca e Filtros:</strong>
                  <p className="text-gray-300">
                    Digite palavras-chave como "Coração", "Estrela", "Seta" para filtrar instantaneamente a galeria de elementos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUTOS SUBLIMÁVEIS (8) */}
          {activeCategory === 'produtos' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">CATÁLOGO DE PRODUTOS SUBLIMÁVEIS (8 MODELOS)</h3>
                    <p className="text-xs text-purple-300/80">
                      Gabaritos calibrados com áreas de impressão em milímetros/centímetros e renderização 3D em tempo real.
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid dos 8 Produtos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    name: 'Caneca Cerâmica 11oz',
                    area: '20.0 x 9.5 cm',
                    desc: 'Wrap Panorâmico 360° com alça.',
                    tag: 'Mais Vendido',
                    color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                  },
                  {
                    name: 'Camiseta Poliéster',
                    area: '29.7 x 42.0 cm (A3)',
                    desc: 'Estampa frontal ou costas completa.',
                    tag: 'Vestuário',
                    color: 'bg-blue-500/20 text-sky-300 border-blue-500/40',
                  },
                  {
                    name: 'Garrafa Inox 500ml',
                    area: '22.5 x 18.0 cm',
                    desc: 'Squeeze térmico envoltório.',
                    tag: 'Inox / Aço',
                    color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                  },
                  {
                    name: 'Skinny Tumbler 20oz',
                    area: '23.0 x 20.5 cm',
                    desc: 'Copo reto sem emenda (Seamless).',
                    tag: 'Copo Térmico',
                    color: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
                  },
                  {
                    name: 'Mouse Pad Gaming XL',
                    area: '70.0 x 30.0 cm',
                    desc: 'Desk Mat estendido em tecido.',
                    tag: 'Acessório',
                    color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
                  },
                  {
                    name: 'Ecobag Poliéster',
                    area: '35.0 x 40.0 cm',
                    desc: 'Bolsa ecológica canvas sublimável.',
                    tag: 'Ecológico',
                    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                  },
                  {
                    name: 'Boné Trucker',
                    area: '12.0 x 6.5 cm',
                    desc: 'Testa frontal em poliéster branco.',
                    tag: 'Acessórios',
                    color: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
                  },
                  {
                    name: 'Azulejo Cerâmico',
                    area: '15.0 x 15.0 cm',
                    desc: 'Quadro quadrado resinado 100%.',
                    tag: 'Decoração',
                    color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
                  },
                ].map((item) => (
                  <div key={item.name} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.color}`}>{item.tag}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-white">{item.name}</h4>
                      <p className="text-[11px] text-purple-300 font-mono font-bold mt-0.5">{item.area}</p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabela de Tempo e Temperatura */}
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Tabela Prática de Prensa Térmica (Tempo &amp; Temperatura)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <strong className="text-white block font-bold">Caneca Cerâmica</strong>
                    <p className="text-amber-300 font-mono mt-1 font-bold">200°C / 180 seg</p>
                    <span className="text-[10px] text-gray-400">Pressão Média-Forte</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <strong className="text-white block font-bold">Squeeze / Garrafa Inox</strong>
                    <p className="text-amber-300 font-mono mt-1 font-bold">180°C / 160 seg</p>
                    <span className="text-[10px] text-gray-400">Pressão Média</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <strong className="text-white block font-bold">Camiseta Poliéster</strong>
                    <p className="text-amber-300 font-mono mt-1 font-bold">200°C / 25 seg</p>
                    <span className="text-[10px] text-gray-400">Pressão Média</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <strong className="text-white block font-bold">Azulejo Cerâmico</strong>
                    <p className="text-amber-300 font-mono mt-1 font-bold">200°C / 240 seg</p>
                    <span className="text-[10px] text-gray-400">Pressão Suave</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Importante:</strong> Verifique sempre o estado da resina do produto e mantenha a chave <strong>"ESPELHAR: SIM"</strong> ativada na barra superior para exportar a imagem espelhada pronta para a imprensa!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ESTÚDIO IA (GEMINI 3.1) */}
          {activeCategory === 'estudio_ia' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-950/40 via-pink-950/40 to-amber-950/40 border border-purple-500/40 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">ESTÚDIO IA GENERATIVO (GEMINI 3.1 FLASH IMAGE)</h3>
                    <p className="text-xs text-purple-300/80">
                      Gere estampas exclusivas em alta resolução (300 DPI) usando inteliência artificial diretamente no canvas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guia do Estúdio IA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    Como Escrever Bons Prompts
                  </h4>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                      <span className="text-emerald-400 font-bold block">✓ Exemplo de Prompt Eficiente:</span>
                      <p className="text-gray-300 italic font-mono text-[11px]">
                        "Leão majestoso em aquarela vibrante, flores tropicais, cores vivas, fundo branco limpo, alta definição 300 DPI para sublimação"
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                      <span className="text-amber-400 font-bold block">🚫 Prompt Negativo Automático:</span>
                      <p className="text-gray-400 text-[11px]">
                        Exclui automaticamente marcas d'água, imagens borradas, ruído pixelado e baixa resolução.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-1">
                      <span className="text-purple-300 font-bold block">🔄 Estampa Repetível (Seamless):</span>
                      <p className="text-gray-300 text-[11px]">
                        Ative a opção <strong>"Seamless"</strong> para criar estampas infinitas em padrão contínuo sem emendas laterais.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-purple-400" />
                    Ferramentas Rápidas com IA
                  </h4>

                  <div className="space-y-2.5 text-xs text-gray-300">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <strong className="text-white block font-bold mb-0.5">✂️ Remover Fundo (1-Clique):</strong>
                      <p className="text-gray-400 text-[11px]">
                        Remove o fundo de fotos ou artes geradas, transformando a imagem em PNG transparente perfeito para sobreposição.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <strong className="text-white block font-bold mb-0.5">📐 Vetorizar para SVG:</strong>
                      <p className="text-gray-400 text-[11px]">
                        Converte imagens raster em formas vetoriais limpas escaláveis para qualquer tamanho sem perder nitidez.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <strong className="text-white block font-bold mb-0.5">🚀 Upscale HD (300 DPI):</strong>
                      <p className="text-gray-400 text-[11px]">
                        Melhora o contraste e reamostra os pixels para garantir nitidez cristalina na hora da impressão sublimática.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Exemplo Rápido */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-gray-200">
                    Todas as imagens geradas pela IA ficam disponíveis na aba <strong>Camadas</strong> para edição individual.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATALHOS E DICAS */}
          {activeCategory === 'atalhos' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">ATALHOS DE TECLADO &amp; PRODUTIVIDADE</h3>
                    <p className="text-xs text-emerald-300/80">
                      Acelere sua criação com os atalhos universais do estúdio de sublimação.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {[
                  { key: 'Ctrl + N', desc: 'Criar Novo Projeto' },
                  { key: 'Ctrl + O', desc: 'Abrir Projeto Existente' },
                  { key: 'Ctrl + S', desc: 'Salvar Projeto Localmente' },
                  { key: 'Ctrl + E', desc: 'Exportar Imagem PNG 300 DPI' },
                  { key: 'Ctrl + P', desc: 'Imprimir (Central RIP)' },
                  { key: 'Ctrl + Z', desc: 'Desfazer Última Ação' },
                  { key: 'Ctrl + Y / Ctrl+Shift+Z', desc: 'Refazer Ação' },
                  { key: 'Delete / Supr', desc: 'Excluir Elemento Selecionado' },
                  { key: 'Setas Teclado', desc: 'Mover Elemento em 1px' },
                ].map((item) => (
                  <div key={item.key} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-gray-300">{item.desc}</span>
                    <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-emerald-400 font-mono text-[11px] font-bold">
                      {item.key}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
                <strong className="text-amber-300 block font-bold">💡 Suporte e PWA Android:</strong>
                <p className="text-gray-300 leading-relaxed">
                  O Sublim Studio é totalmente otimizado para celulares e tablets Android PWA/APK com suporte a gestos de toque, rotação 3D e câmera integrada para transformar fotos do aparelho direto em estampas sublimáveis.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-900/80 flex items-center justify-between text-xs text-gray-400 shrink-0">
          <span>Sublim Studio v7.0 • dibiTECh® Rui e Rodrigo</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all cursor-pointer shadow-md"
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
}
