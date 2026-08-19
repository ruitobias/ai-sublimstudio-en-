import React, { useState } from 'react';
import { ICCProfile } from '../../services/printer/PrinterTypes';
import { StorageService } from '../../services/storage/StorageService';
import { FileUp, Check, ShieldCheck, HardDrive } from 'lucide-react';

const SYSTEM_ICC_PROFILES: ICCProfile[] = [
  {
    id: 'subli_vibrant_hd',
    name: 'Sublim Studio — Vibrant HD Sublimation ICC (CMYK)',
    filename: 'subli_vibrant_hd_v4.icc',
    manufacturer: 'Sublim Studio Labs',
    colorSpace: 'CMYK',
    description: 'Perfil otimizado para tintas sublimáticas em papéis tratados 90g/100g. Alta saturação no poliéster.',
    isCustom: false,
  },
  {
    id: 'epson_genuine_subli',
    name: 'Epson Genuine Ink Sublimation Profile (A4/A3)',
    filename: 'epson_subli_gen.icc',
    manufacturer: 'Epson Seiko Corp.',
    colorSpace: 'CMYK',
    description: 'Perfil oficial Epson para tintas originais da linha EcoTank F-Series / L-Series.',
    isCustom: false,
  },
  {
    id: 'genesis_sublimation_pro',
    name: 'Genesis Sublimation Ink Standard',
    filename: 'genesis_subli_v2.icm',
    manufacturer: 'Genesis Inks',
    colorSpace: 'CMYK',
    description: 'Desenvolvido para máxima fidelidade de vermelhos e pretos profundos em tecidos sintéticos.',
    isCustom: false,
  }
];

interface ICCProfileSelectorProps {
  selectedIccId?: string;
  onSelectIcc: (iccId: string) => void;
  isDark?: boolean;
}

export const ICCProfileSelector: React.FC<ICCProfileSelectorProps> = ({
  selectedIccId = 'subli_vibrant_hd',
  onSelectIcc,
  isDark = true,
}) => {
  const [customProfiles, setCustomProfiles] = useState<ICCProfile[]>(() => {
    return StorageService.getItem<ICCProfile[]>('customIccProfilesList', []);
  });

  const allProfiles = [...SYSTEM_ICC_PROFILES, ...customProfiles];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newProfile: ICCProfile = {
      id: 'custom_icc_' + Date.now(),
      name: file.name.replace(/\.(icc|icm)$/i, ''),
      filename: file.name,
      manufacturer: 'Usuário Customizado',
      colorSpace: 'CMYK',
      description: `Perfil importado localmente: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      isCustom: true,
    };

    const next = [newProfile, ...customProfiles];
    setCustomProfiles(next);
    StorageService.setItem('customIccProfilesList', next);
    onSelectIcc(newProfile.id);
  };

  return (
    <div className="space-y-4">
      {/* Upload Header */}
      <div className={`flex items-center justify-between gap-3 p-3.5 border rounded-2xl ${
        isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Importar Perfil ICC Customizado (.icc / .icm)</h5>
            <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Adicione o arquivo fornecido pelo fabricante da sua tinta sublimática.
            </p>
          </div>
        </div>

        <label className="py-2 px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all">
          <FileUp className="w-3.5 h-3.5" />
          <span>Upload ICC</span>
          <input type="file" accept=".icc,.icm" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 gap-3">
        {allProfiles.map((icc) => {
          const isSelected = selectedIccId === icc.id;
          return (
            <div
              key={icc.id}
              onClick={() => onSelectIcc(icc.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? isDark
                    ? 'bg-purple-950/30 border-purple-500 shadow-md'
                    : 'bg-purple-50 border-purple-400 shadow-md'
                  : isDark
                  ? 'bg-[#0a0b10] border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{icc.name}</span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    isDark ? 'bg-slate-800 text-purple-300 border-slate-700' : 'bg-purple-100 text-purple-700 border-purple-200'
                  }`}>
                    {icc.colorSpace}
                  </span>
                  {icc.isCustom && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-500/20 text-amber-500 rounded border border-amber-500/30">
                      Customizado
                    </span>
                  )}
                </div>
                <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{icc.description}</p>
                <span className={`text-[10px] font-mono block ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Arquivo: {icc.filename}</span>
              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-purple-600 border-purple-400 text-white'
                    : isDark
                    ? 'border-slate-700 bg-slate-900'
                    : 'border-slate-300 bg-slate-100'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
