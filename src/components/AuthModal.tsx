import React, { useState } from 'react';
import { logoSublimStudioSvg, logoSublimStudioPng, faviconPng } from '../assets/logos';
import { User, LogOut, LogIn, Mail, Lock, ShieldCheck, CheckCircle2, X, Sparkles, UserCheck } from 'lucide-react';

export interface UserSession {
  name: string;
  email: string;
  avatarUrl?: string;
  isPro?: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession | null;
  onLogin: (user: UserSession) => void;
  onLogout: () => void;
  darkMode?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  darkMode = true,
}) => {
  const [email, setEmail] = useState('usuario@meudominio.com');
  const [name, setName] = useState('Usuário');
  const [password, setPassword] = useState('usuario');
  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email) return;

    // Check credentials if provided or allow login with default credentials
    if (!isRegister && email === 'usuario@meudominio.com' && password !== 'usuario') {
      setErrorMsg('Senha incorreta para usuario@meudominio.com. A senha configurada é: usuario');
      return;
    }

    onLogin({
      name: name || email.split('@')[0],
      email: email,
      isPro: true,
      avatarUrl: logoSublimStudioPng,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl shadow-2xl border p-6 relative flex flex-col gap-5 ${
          darkMode ? 'bg-[#121620] border-[#2A3447] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-xl transition-colors cursor-pointer ${
            darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4 border-purple-500/20">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg text-white p-1">
            <img
              src={logoSublimStudioSvg}
              alt="SublimStudio"
              className="w-full h-full object-contain rounded-xl"
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
          <div>
            <h2 className="text-lg font-extrabold flex items-center gap-1.5">
              <span>{currentUser ? 'Minha Conta SublimStudio' : isRegister ? 'Criar Conta PRO' : 'Acessar Conta'}</span>
              <Sparkles className="w-4 h-4 text-purple-400 fill-current" />
            </h2>
            <p className="text-xs text-purple-400 font-medium">
              {currentUser ? 'Gerencie seu perfil e licença de impressão' : 'Sincronize projetos e arquivos no nuvem'}
            </p>
          </div>
        </div>

        {/* LOGGED IN VIEW */}
        {currentUser ? (
          <div className="flex flex-col gap-4">
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${
              darkMode ? 'bg-[#181F2E] border-purple-500/30' : 'bg-purple-50 border-purple-200'
            }`}>
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-lg border-2 border-purple-400 shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm truncate">{currentUser.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-purple-500 text-white">PRO</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
              darkMode ? 'bg-[#161B26] border-[#2A3447]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Licença SublimStudio PRO Ativa</span>
              </div>
              <p className="text-slate-400 text-[11px] pl-6">
                Acesso ilimitado a estampas IA, vetorização HQ e perfis de cores ICC Epson.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-200 border-slate-300 hover:bg-slate-300'
                }`}
              >
                Continuar Editando
              </button>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da Conta (Logout)</span>
              </button>
            </div>
          </div>
        ) : (
          /* LOGGED OUT FORM */
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <div className={`p-2.5 rounded-xl border text-[11px] font-medium flex flex-col gap-0.5 ${
              darkMode ? 'bg-purple-950/40 border-purple-500/30 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-800'
            }`}>
              <span className="font-extrabold uppercase text-[10px] tracking-wider text-purple-400">Credenciais configuradas:</span>
              <span><strong>Usuário:</strong> usuario@meudominio.com</span>
              <span><strong>Senha:</strong> usuario</span>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu Nome"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none focus:border-purple-500 ${
                      darkMode ? 'bg-[#181F2E] border-[#2A3447] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none focus:border-purple-500 ${
                    darkMode ? 'bg-[#181F2E] border-[#2A3447] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none focus:border-purple-500 ${
                    darkMode ? 'bg-[#181F2E] border-[#2A3447] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{isRegister ? 'Cadastrar e Entrar' : 'Entrar no SublimStudio'}</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-2 text-slate-400">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="hover:text-purple-400 underline cursor-pointer"
              >
                {isRegister ? 'Já tem conta? Fazer Login' : 'Não tem conta? Cadastrar grátis'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
