import React, { useState, useEffect } from 'react';
import { logoSublimStudioSvg, logoSublimStudioPng, faviconPng } from '../assets/logos';
import { Smartphone, Download, CheckCircle2, ShieldCheck, X, Sparkles, Zap, ExternalLink, QrCode, Monitor } from 'lucide-react';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark' | string;
  isAndroidSimulated?: boolean;
  setIsAndroidSimulated?: (val: boolean) => void;
  deferredInstallPrompt?: any;
  onShowSnackbar?: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export function AndroidAppModal({
  isOpen,
  onClose,
  theme = 'dark',
  deferredInstallPrompt,
  onShowSnackbar,
}: AndroidAppModalProps) {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }
  }, []);

  if (!isOpen) return null;

  // Handle Direct Native PWA Install
  const handleInstallPWA = async () => {
    if (deferredInstallPrompt) {
      setIsInstalling(true);
      try {
        deferredInstallPrompt.prompt();
        const choiceResult = await deferredInstallPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          if (onShowSnackbar) onShowSnackbar('Instalação do Sublim Studio PWA iniciada!', 'success');
          setIsStandalone(true);
        } else {
          if (onShowSnackbar) onShowSnackbar('Instalação PWA cancelada.', 'info');
        }
      } catch (err) {
        console.error('PWA Prompt Error:', err);
      } finally {
        setIsInstalling(false);
      }
    } else {
      // If prompt isn't directly available (e.g. inside iframe), open in new tab or trigger WebApp shortcut
      handleOpenInNewTab();
    }
  };

  // Open outside iframe in new tab for native install prompt support
  const handleOpenInNewTab = () => {
    window.open(window.location.origin || window.location.href, '_blank');
    if (onShowSnackbar) {
      onShowSnackbar('Abrindo em nova aba para instalação nativa do Android Chrome!', 'info');
    }
  };

  // Generate and download a WebApp Android/Desktop Shortcut (.url and clean html launcher)
  const handleDownloadAPKLauncher = () => {
    const currentUrl = window.location.origin || window.location.href;
    
    // Clean HTML launcher that redirects directly to HTTPS app
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sublim Studio</title>
  <style>
    body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #090d16; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
    .card { background: #14151a; border: 1px solid #2d2f3a; padding: 32px 24px; border-radius: 24px; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    h1 { font-size: 20px; font-weight: 800; margin-bottom: 8px; color: #10b981; }
    p { font-size: 13px; color: #9ca3af; margin-bottom: 24px; line-height: 1.5; }
    .btn { display: inline-block; width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #10b981, #14b8a6); color: #090d16; font-weight: 800; font-size: 14px; padding: 14px 20px; border-radius: 14px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; }
  </style>
  <script>
    // Redirect directly to HTTPS app URL to prevent local file:// CORS restrictions
    window.location.replace("${currentUrl}");
  </script>
</head>
<body>
  <div class="card">
    <h1>Sublim Studio</h1>
    <p>Redirecionando para o aplicativo completo de sublimação...</p>
    <a class="btn" href="${currentUrl}">ABRIR APLICATIVO AGORA</a>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sublim_Studio_Launcher.html';
    a.click();
    URL.revokeObjectURL(url);

    if (onShowSnackbar) {
      onShowSnackbar('Atalho baixado com sucesso! Clique no arquivo para abrir o app.', 'success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn touch-scroll-y"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full max-w-lg max-h-[90dvh] rounded-3xl shadow-2xl border flex flex-col overflow-hidden transition-all pb-[env(safe-area-inset-bottom,0px)] ${
          theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#14151a] border-[#2d2f3a] text-gray-100'
        }`}
      >
        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-b border-emerald-500/20 text-center flex flex-col items-center shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/30 text-gray-400 hover:text-white hover:bg-black/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative group mb-2">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-2xl blur-md opacity-75"></div>
            <img
              src={logoSublimStudioSvg}
              alt="Sublim Studio Android"
              className="relative w-16 h-16 rounded-2xl object-contain bg-slate-900 border border-emerald-500/40 p-1 shadow-2xl"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                if (!target.dataset.triedPng) {
                  target.dataset.triedPng = 'true';
                  target.src = logoSublimStudioPng;
                } else if (!target.dataset.triedFavicon) {
                  target.dataset.triedFavicon = 'true';
                  target.src = faviconPng;
                }
              }}
            />
          </div>

          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            Instalar App Sublim Studio
          </h2>
          <p className="text-xs text-emerald-300 font-medium mt-1">
            Versão Nativada PWA / APK para Android, iOS e Desktop
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs overflow-y-auto custom-scrollbar">
          {isStandalone ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-emerald-300 font-bold block text-sm">App PWA Já Instalado!</strong>
                <p className="text-gray-300 text-xs">Você está utilizando a versão nativa em modo tela cheia.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Primary Action Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-slate-900/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold text-sm">Instalação Direta (PWA Nativo)</strong>
                    <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">
                      Instale o aplicativo na tela inicial do seu celular Android sem precisar da Play Store!
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                  {deferredInstallPrompt ? (
                    <button
                      disabled={isInstalling}
                      onClick={handleInstallPWA}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isInstalling ? 'Instalando...' : 'INSTALAR AGORA (1 CLIQUE)'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleOpenInNewTab}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>ABRIR EM NOVA ABA E INSTALAR</span>
                    </button>
                  )}

                  <button
                    onClick={handleDownloadAPKLauncher}
                    className="w-full sm:w-auto py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 shrink-0"
                    title="Baixar atalho/wrapper APK nativo para execução offline"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Baixar Atalho WebApp</span>
                  </button>
                </div>
              </div>

              {/* Step by Step instructions */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h3 className="font-bold text-gray-200 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Como Instalar Manualmente no Celular:
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-300 text-[11px] leading-relaxed">
                  <li>Toque nos <strong>três pontinhos (⋮)</strong> no canto superior do Chrome Android ou Edge.</li>
                  <li>Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>.</li>
                  <li>Confirme em <strong>"Adicionar"</strong> para ter o ícone na sua gaveta de apps!</li>
                </ol>
              </div>
            </>
          )}

          {/* Features checklist */}
          <div className="space-y-2 pt-1">
            <h3 className="font-bold text-gray-300 text-xs uppercase tracking-wider">Vantagens do App Instalado:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-gray-300 text-[11px] p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modo Tela Cheia sem barras</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-[11px] p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Controles Touch e Gestos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-[11px] p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Carregamento Rápido Cache</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-[11px] p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Suporte Câmera e Arquivos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <span className="text-[10px] text-gray-400 font-mono">v3.1.0 • Android PWA & APK Wrapper</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
