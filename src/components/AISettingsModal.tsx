import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Check,
  Plus,
  Trash2,
  RotateCcw,
  Bot,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Info,
  CheckCircle2,
  Sliders,
  AlertTriangle,
} from 'lucide-react';
import { AIModelConfig } from '../types';
import {
  getStoredAIModels,
  saveAIModels,
  resetAIModels,
  getDefaultAIModelId,
  setDefaultAIModelId,
  getOllamaKey,
  saveOllamaKey,
  getOllamaEndpoint,
  saveOllamaEndpoint,
} from '../utils/aiSettingsStore';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light' | string;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
}) => {
  const [models, setModels] = useState<AIModelConfig[]>([]);
  const [defaultModelId, setDefaultModelIdState] = useState<string>('gemini-3.1-flash-image');
  const [filterType, setFilterType] = useState<'all' | 'free' | 'image' | 'text' | 'ollama'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Ollama credentials state
  const [ollamaKey, setOllamaKeyState] = useState<string>('');
  const [ollamaEndpoint, setOllamaEndpointState] = useState<string>('');
  const [showKey, setShowKey] = useState(false);

  // New model form state
  const [newModelName, setNewModelName] = useState('');
  const [newModelId, setNewModelId] = useState('');
  const [newModelProvider, setNewModelProvider] = useState('Ollama');
  const [newModelType, setNewModelType] = useState<'image' | 'text' | 'multimodal'>('text');
  const [newModelIsFree, setNewModelIsFree] = useState(true);
  const [newModelBadge, setNewModelBadge] = useState('Ollama');
  const [newModelDesc, setNewModelDesc] = useState('');

  useEffect(() => {
    if (isOpen) {
      setModels(getStoredAIModels());
      setDefaultModelIdState(getDefaultAIModelId());
      setOllamaKeyState(getOllamaKey());
      setOllamaEndpointState(getOllamaEndpoint());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleActive = (id: string) => {
    const updated = models.map((m) =>
      m.id === id ? { ...m, active: !m.active } : m
    );
    setModels(updated);
  };

  const handleToggleFree = (id: string) => {
    const updated = models.map((m) =>
      m.id === id ? { ...m, isFree: !m.isFree } : m
    );
    setModels(updated);
  };

  const handleDeleteModel = (id: string) => {
    if (models.length <= 1) {
      alert('É necessário manter pelo menos 1 modelo de IA ativo.');
      return;
    }
    const updated = models.filter((m) => m.id !== id);
    setModels(updated);
    if (defaultModelId === id && updated.length > 0) {
      setDefaultModelIdState(updated[0].id);
    }
  };

  const handleSetDefault = (id: string) => {
    setDefaultModelIdState(id);
  };

  const handleSave = () => {
    saveAIModels(models);
    setDefaultAIModelId(defaultModelId);
    saveOllamaKey(ollamaKey);
    saveOllamaEndpoint(ollamaEndpoint);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (confirm('Deseja restaurar os modelos de IA originais de fábrica?')) {
      const resetList = resetAIModels();
      setModels(resetList);
      setDefaultAIModelId('gemini-3.1-flash-image');
      setDefaultModelIdState('gemini-3.1-flash-image');
    }
  };

  const handleAddNewModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelName.trim() || !newModelId.trim()) {
      alert('Informe o Nome e o ID do modelo.');
      return;
    }

    const exists = models.some((m) => m.id.toLowerCase() === newModelId.trim().toLowerCase());
    if (exists) {
      alert('Já existe um modelo com este ID.');
      return;
    }

    const newModel: AIModelConfig = {
      id: newModelId.trim(),
      name: newModelName.trim(),
      provider: newModelProvider,
      type: newModelType,
      isFree: newModelIsFree,
      active: true,
      badge: newModelBadge.trim() || 'Custom',
      description: newModelDesc.trim() || 'Modelo de IA personalizado adicionado pelo usuário',
    };

    const updated = [...models, newModel];
    setModels(updated);

    // Reset form
    setNewModelName('');
    setNewModelId('');
    setNewModelBadge('Novo');
    setNewModelDesc('');
    setShowAddForm(false);
  };

  const filteredModels = models.filter((m) => {
    if (filterType === 'free') return m.isFree;
    if (filterType === 'image') return m.type === 'image';
    if (filterType === 'text') return m.type === 'text';
    if (filterType === 'ollama')
      return (
        m.provider?.toLowerCase() === 'ollama' ||
        m.id.toLowerCase().includes('ollama')
      );
    return true;
  });

  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl border overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#161720] border-[#2c2e3f] text-gray-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            isLight ? 'bg-purple-50/80 border-slate-200' : 'bg-[#1b1c28] border-[#2c2e3f]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <span>CONFIGURAÇÕES DE IA</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono uppercase tracking-wider">
                  Padronização
                </span>
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                Gerencie modelos de IA, chaves Ollama e preferências no SublimStudio Pro
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${
              isLight
                ? 'hover:bg-slate-200 border-slate-300 text-slate-600'
                : 'hover:bg-[#282a3c] border-[#2c2e3f] text-gray-400 hover:text-white'
            }`}
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          {/* Quick Info Alert */}
          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="text-xs text-purple-200 leading-relaxed">
              <strong>Lista Unificada de Modelos:</strong> Marque os modelos que deseja habilitar no
              Painel IA e nas ferramentas automáticas. Suporta Gemini e provedor Ollama com chave.
            </div>
          </div>

          {/* Ollama Key & Config Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1a1b29] to-[#141522] border border-purple-500/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-purple-600/30 text-purple-300 font-bold text-[10px] uppercase tracking-wider">
                  OLLAMA PROVIDER
                </div>
                <h4 className="text-xs font-extrabold text-white">Chave de Acesso e Servidor Ollama</h4>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                Ativo
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-purple-300 mb-1 flex items-center justify-between">
                  <span>Chave de API / Token Ollama</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Configurada</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={ollamaKey}
                    onChange={(e) => setOllamaKeyState(e.target.value)}
                    placeholder="Cole aqui a chave de API Ollama"
                    className="w-full bg-[#11121a] border border-[#2d2f44] rounded-xl py-2 pl-3 pr-16 text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2 text-[10px] font-bold text-purple-300 hover:text-white px-2 py-1 rounded bg-purple-900/40 border border-purple-500/30"
                  >
                    {showKey ? 'Ocultar' : 'Exibir'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                  Servidor / Host Ollama (URL Base)
                </label>
                <input
                  type="text"
                  value={ollamaEndpoint}
                  onChange={(e) => setOllamaEndpointState(e.target.value)}
                  placeholder="http://localhost:11434"
                  className="w-full bg-[#11121a] border border-[#2d2f44] rounded-xl p-2 text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Chave salva e pronta para uso nos modelos Ollama Llama 3 e Mistral.</span>
            </p>
          </div>

          {/* Controls Bar: Filters & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-700/50">
            <div className="flex items-center gap-1 bg-[#111218] p-1 rounded-xl border border-[#232535]">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === 'all'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Todos ({models.length})
              </button>
              <button
                onClick={() => setFilterType('free')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  filterType === 'free'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Gratuitos ({models.filter((m) => m.isFree).length})
              </button>
              <button
                onClick={() => setFilterType('ollama')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === 'ollama'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Ollama ({models.filter((m) => m.provider?.toLowerCase() === 'ollama' || m.id.toLowerCase().includes('ollama')).length})
              </button>
              <button
                onClick={() => setFilterType('image')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === 'image'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Imagem ({models.filter((m) => m.type === 'image').length})
              </button>
              <button
                onClick={() => setFilterType('text')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === 'text'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Texto ({models.filter((m) => m.type === 'text').length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Incluir Novo Modelo</span>
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-xl border border-transparent hover:border-amber-500/30 transition-all"
                title="Restaurar Modelos Padrão de Fábrica"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form to Add New Custom Model */}
          {showAddForm && (
            <form
              onSubmit={handleAddNewModel}
              className="p-4 rounded-2xl bg-[#1b1c28] border border-purple-500/40 space-y-3 animate-fadeIn"
            >
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <h4 className="text-xs font-extrabold text-purple-300 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  Cadastrar Novo Modelo de IA
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Gemini Flash Lite Custom"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    className="w-full bg-[#12131a] border border-[#2d2f42] rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    ID do Modelo API
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: gemini-3.1-flash-lite-image"
                    value={newModelId}
                    onChange={(e) => setNewModelId(e.target.value)}
                    className="w-full bg-[#12131a] border border-[#2d2f42] rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Provedor / Marca
                  </label>
                  <select
                    value={newModelProvider}
                    onChange={(e) => {
                      setNewModelProvider(e.target.value);
                      if (e.target.value === 'Ollama') {
                        setNewModelBadge('Ollama');
                      } else if (e.target.value === 'Gemini') {
                        setNewModelBadge('Gemini');
                      }
                    }}
                    className="w-full bg-[#12131a] border border-[#2d2f42] rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Ollama">Ollama (Local / Remote API Key)</option>
                    <option value="Gemini">Gemini (Google AI)</option>
                    <option value="OpenAI">OpenAI / Compatible</option>
                    <option value="Custom">Outro Provedor Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Tipo de Recurso
                  </label>
                  <select
                    value={newModelType}
                    onChange={(e) =>
                      setNewModelType(e.target.value as 'image' | 'text' | 'multimodal')
                    }
                    className="w-full bg-[#12131a] border border-[#2d2f42] rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="text">Texto (Assistente Prompts & Chat)</option>
                    <option value="multimodal">Multimodal (Texto & Visão)</option>
                    <option value="image">Imagem (Gerador de Estampas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Selo / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Recomendado, Rápido, Gratuito, Pro"
                    value={newModelBadge}
                    onChange={(e) => setNewModelBadge(e.target.value)}
                    className="w-full bg-[#12131a] border border-[#2d2f42] rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                  Descrição Curta
                </label>
                <input
                  type="text"
                  placeholder="Ex: Excelente para geração de artes rápidas e sem custo extra"
                  value={newModelDesc}
                  onChange={(e) => setNewModelDesc(e.target.value)}
                  className="w-full bg-[#12131a] border border-[#2d2f42] rounded-lg p-2 text-white text-xs focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-400">
                  <input
                    type="checkbox"
                    checked={newModelIsFree}
                    onChange={(e) => setNewModelIsFree(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-0"
                  />
                  <span>Disponível no Plano Gratuito</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow"
                  >
                    Salvar Modelo
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Model Cards List */}
          <div className="space-y-3">
            {filteredModels.map((m) => {
              const isDefault = m.id === defaultModelId;

              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    m.active
                      ? isLight
                        ? 'bg-slate-50 border-purple-200 shadow-sm'
                        : 'bg-[#1b1c28] border-purple-500/30'
                      : isLight
                      ? 'bg-slate-100/50 border-slate-200 opacity-60'
                      : 'bg-[#13141c] border-[#222433] opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div
                      className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                        m.active
                          ? 'bg-purple-600/20 text-purple-400 border-purple-500/30'
                          : 'bg-gray-800 text-gray-500 border-gray-700'
                      }`}
                    >
                      <Cpu className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <h4 className="font-extrabold text-sm text-white truncate">{m.name}</h4>

                        {m.badge && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-[10px] border border-purple-500/30">
                            {m.badge}
                          </span>
                        )}

                        {m.isFree ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                            IA Gratuita
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                            Pro / Premium
                          </span>
                        )}

                        {isDefault && (
                          <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-[10px] shadow">
                            Padrão Ativo
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{m.description}</p>
                      <span className="text-[10px] font-mono text-gray-500 block mt-0.5">
                        ID: {m.id} | Tipo: {m.type}
                      </span>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleSetDefault(m.id)}
                      disabled={!m.active}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isDefault
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                          : 'bg-[#12131a] hover:bg-purple-900/40 text-gray-300 border-[#2b2d40] disabled:opacity-30'
                      }`}
                      title="Definir como modelo principal padrão no App"
                    >
                      {isDefault ? 'Padrão' : 'Tornar Padrão'}
                    </button>

                    <button
                      onClick={() => handleToggleFree(m.id)}
                      className={`p-2 rounded-xl border transition-all text-xs font-semibold ${
                        m.isFree
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      }`}
                      title="Alternar entre Gratuito ou Pro"
                    >
                      {m.isFree ? 'Gratuito' : 'Pro'}
                    </button>

                    <button
                      onClick={() => handleToggleActive(m.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 ${
                        m.active
                          ? 'bg-purple-600 hover:bg-purple-500 border-purple-400 text-white shadow'
                          : 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-400'
                      }`}
                    >
                      {m.active ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Habilitado</span>
                        </>
                      ) : (
                        <span>Desabilitado</span>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteModel(m.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/30 transition-all"
                      title="Excluir Modelo da Lista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-t ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#1b1c28] border-[#2c2e3f]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            {savedSuccess && (
              <span className="flex items-center gap-1 text-emerald-400 font-bold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" /> Configurações de IA salvas com sucesso!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isLight
                  ? 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
                  : 'bg-[#222433] border-[#2d2f42] text-gray-300 hover:text-white hover:bg-[#2a2c3d]'
              }`}
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Padronização</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
