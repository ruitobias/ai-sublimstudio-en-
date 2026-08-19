import { AIModelConfig } from '../types';

const AI_MODELS_STORAGE_KEY = 'sublim_studio_ai_models_config_v1';
const AI_DEFAULT_MODEL_KEY = 'sublim_studio_ai_default_model_v1';

export const DEFAULT_AI_MODELS: AIModelConfig[] = [
  {
    id: 'gemini-3.1-flash-image',
    name: 'Gemini 3.1 Flash Image',
    provider: 'Gemini',
    type: 'image',
    isFree: true,
    active: true,
    badge: 'Recomendado',
    description: 'Geração de estampas HD para canecas, camisetas e almofadas',
  },
  {
    id: 'gemini-3.1-flash-lite-image',
    name: 'Gemini Flash Lite',
    provider: 'Gemini',
    type: 'image',
    isFree: true,
    active: true,
    badge: 'Rápido',
    description: 'Geração ultrarrápida para rascunhos e prévias de artes',
  },
  {
    id: 'gemini-3.6-flash',
    name: 'Gemini 3.6 Flash',
    provider: 'Gemini',
    type: 'text',
    isFree: true,
    active: true,
    badge: 'Gratuito',
    description: 'Completador de prompts, palavras para Nuvem e assistente de IA',
  },
  {
    id: 'ollama-llama3',
    name: 'Ollama Llama 3 / Vision',
    provider: 'Ollama',
    type: 'multimodal',
    isFree: true,
    active: true,
    badge: 'Ollama Key',
    description: 'Servidor Ollama para prompts, visão e criação de textos',
  },
  {
    id: 'ollama-mistral',
    name: 'Ollama Mistral 7B',
    provider: 'Ollama',
    type: 'text',
    isFree: true,
    active: true,
    badge: 'Ollama',
    description: 'Modelo leve para geração rápida de idéias de estampas',
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro',
    provider: 'Gemini',
    type: 'multimodal',
    isFree: false,
    active: true,
    badge: 'Pro',
    description: 'Raciocínio avançado e geração de estampas vetoriais complexas',
  },
  {
    id: 'gemini-3-pro-image',
    name: 'Gemini 3 Pro Image',
    provider: 'Gemini',
    type: 'image',
    isFree: false,
    active: true,
    badge: 'Pro HD',
    description: 'Imagens ultra detalhadas em até 4K para sublimação',
  },
];

export function getStoredAIModels(): AIModelConfig[] {
  try {
    const raw = localStorage.getItem(AI_MODELS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load stored AI models', e);
  }
  return DEFAULT_AI_MODELS;
}

export function saveAIModels(models: AIModelConfig[]): void {
  try {
    localStorage.setItem(AI_MODELS_STORAGE_KEY, JSON.stringify(models));
    // Trigger custom event so active components re-render immediately
    window.dispatchEvent(new Event('sublim_ai_models_changed'));
  } catch (e) {
    console.error('Failed to save AI models', e);
  }
}

export function getActiveAIModels(): AIModelConfig[] {
  return getStoredAIModels().filter((m) => m.active);
}

export function resetAIModels(): AIModelConfig[] {
  saveAIModels(DEFAULT_AI_MODELS);
  return DEFAULT_AI_MODELS;
}

export function getDefaultAIModelId(): string {
  try {
    const stored = localStorage.getItem(AI_DEFAULT_MODEL_KEY);
    if (stored) return stored;
  } catch (e) {}
  return 'gemini-3.1-flash-image';
}

export function setDefaultAIModelId(modelId: string): void {
  try {
    localStorage.setItem(AI_DEFAULT_MODEL_KEY, modelId);
    window.dispatchEvent(new Event('sublim_ai_models_changed'));
  } catch (e) {}
}

const OLLAMA_KEY_STORAGE_KEY = 'sublim_studio_ollama_key_v1';
const OLLAMA_ENDPOINT_STORAGE_KEY = 'sublim_studio_ollama_endpoint_v1';

export const DEFAULT_OLLAMA_KEY = '3486f3dfecaf445a9d9836014e836751.KKgyKhpt-wNaw3L2sJCUHb2z';
export const DEFAULT_OLLAMA_ENDPOINT = 'http://localhost:11434';

export function getOllamaKey(): string {
  try {
    const key = localStorage.getItem(OLLAMA_KEY_STORAGE_KEY);
    if (key !== null) return key;
  } catch (e) {}
  return DEFAULT_OLLAMA_KEY;
}

export function saveOllamaKey(key: string): void {
  try {
    localStorage.setItem(OLLAMA_KEY_STORAGE_KEY, key);
    window.dispatchEvent(new Event('sublim_ai_models_changed'));
  } catch (e) {}
}

export function getOllamaEndpoint(): string {
  try {
    const ep = localStorage.getItem(OLLAMA_ENDPOINT_STORAGE_KEY);
    if (ep) return ep;
  } catch (e) {}
  return DEFAULT_OLLAMA_ENDPOINT;
}

export function saveOllamaEndpoint(endpoint: string): void {
  try {
    localStorage.setItem(OLLAMA_ENDPOINT_STORAGE_KEY, endpoint);
    window.dispatchEvent(new Event('sublim_ai_models_changed'));
  } catch (e) {}
}
