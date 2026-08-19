/**
 * Security, Data Validation & XSS Prevention Utilities
 * Auditoria de Segurança para Upload, SVG e Inputs
 */

/**
 * Sanitiza strings de SVG para prevenir injeções de script XSS (<script>, onload, onerror, javascript:)
 */
export function sanitizeSVG(svgString: string): string {
  if (!svgString || typeof svgString !== 'string') return '';
  
  // Remove script tags e seus conteúdos
  let clean = svgString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove atributos inline manipuladores de eventos (onload, onerror, onclick, etc)
  clean = clean.replace(/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');
  
  // Remove links com protocolo javascript:
  clean = clean.replace(/href\s*=\s*["']?\s*javascript:[^"'>]+/gi, 'href="#"');
  
  return clean;
}

/**
 * Valida arquivos enviados antes do carregamento no Canvas
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File, maxSizeBytes: number = 50 * 1024 * 1024): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'Nenhum arquivo selecionado.' };
  }

  // Verifica tamanho máximo
  if (file.size > maxSizeBytes) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return { valid: false, error: `Arquivo muito grande (${sizeMb}MB). O limite é 50MB.` };
  }

  // Permite formatos de imagem válidos
  const allowedMimes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'image/bmp',
    'image/tiff'
  ];

  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.bmp', '.tif', '.tiff', '.sublimation'];
  const fileNameLower = file.name.toLowerCase();

  const isMimeValid = allowedMimes.includes(file.type.toLowerCase());
  const isExtValid = allowedExtensions.some(ext => fileNameLower.endsWith(ext));

  if (!isMimeValid && !isExtValid) {
    return {
      valid: false,
      error: `Formato de arquivo inválido (${file.type || 'desconhecido'}). Envie PNG, JPG, WEBP, SVG ou GIF.`
    };
  }

  return { valid: true };
}

/**
 * Escapa HTML em entradas de texto do usuário para exibição segura
 */
export function escapeHTML(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
