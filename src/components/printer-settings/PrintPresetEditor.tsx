import React, { useState } from 'react';
import { PrintSettings } from '../../services/printer/PrinterTypes';

interface PrintPresetEditorProps {
  currentSettings: PrintSettings;
  printerId: string;
  onSave: (name: string, category: string) => void;
  onCancel: () => void;
  isDark?: boolean;
}

export const PrintPresetEditor: React.FC<PrintPresetEditorProps> = ({
  onSave,
  onCancel,
  isDark = true,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('CANECAS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), category);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 border rounded-2xl space-y-3 ${
      isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>Novo Preset de Impressão</h5>

      <div className="space-y-1">
        <label className={`text-[11px] font-bold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Nome do Preset</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Caneca Porcelana 325ml - Papel Havir 100g"
          className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-500 ${
            isDark
              ? 'bg-[#12131b] border-slate-700 text-white placeholder:text-gray-500'
              : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
          }`}
          required
        />
      </div>

      <div className="space-y-1">
        <label className={`text-[11px] font-bold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Categoria do Produto Sublimático</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-500 ${
            isDark
              ? 'bg-[#12131b] border-slate-700 text-white'
              : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <option value="CANECAS">Canecas & Xícaras</option>
          <option value="CAMISETAS">Camisetas & Vestuário Poliéster</option>
          <option value="SQUEEZES">Squeezes & Garrafas Térmicas</option>
          <option value="AZULEJOS">Azulejos & Placas Cerâmicas</option>
          <option value="CHINELOS">Chinelos & Capas de Almofada</option>
          <option value="GERAL">Outros Produtos Sublimáticos</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
            isDark
              ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          Salvar Preset
        </button>
      </div>
    </form>
  );
};
