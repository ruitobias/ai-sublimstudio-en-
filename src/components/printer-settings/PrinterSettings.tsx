import React, { useState } from 'react';
import { PrinterSettingsModalProps, PrinterSettingsTab } from './PrinterSettings.types';
import { usePrinterStore } from '../../store/usePrinterStore';
import { usePrintSettingsStore } from '../../store/usePrintSettingsStore';
import { usePrintPresetStore } from '../../store/usePrintPresetStore';
import { usePrintJobStore } from '../../store/usePrintJobStore';

import { PrinterList } from './PrinterList';
import { PrinterSelector } from './PrinterSelector';
import { PrinterCapabilitiesView } from './PrinterCapabilitiesView';
import { PrintSettingsForm } from './PrintSettingsForm';
import { ColorManagementSettings } from './ColorManagementSettings';
import { ICCProfileSelector } from './ICCProfileSelector';
import { PrintPresetList } from './PrintPresetList';
import { PrintPresetEditor } from './PrintPresetEditor';
import { PrintTestPanel } from './PrintTestPanel';
import { PrintJobStatusView } from './PrintJobStatus';

import { Printer, PrinterCapabilities, PrintPreset } from '../../services/printer/PrinterTypes';
import { PrinterService } from '../../services/printer/PrinterService';
import { PrinterTestService } from '../../services/printer/PrinterTestService';

import {
  X,
  Printer as PrinterIcon,
  Sliders,
  Palette,
  HardDrive,
  Bookmark,
  TestTube2,
  Clock,
  CheckCircle2,
  Settings2,
} from 'lucide-react';

export const PrinterSettingsModal: React.FC<PrinterSettingsModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
  canvasElement,
  onShowSnackbar,
  onOpenPrintModal,
}) => {
  const isDark = theme !== 'light';
  const [activeTab, setActiveTab] = useState<PrinterSettingsTab>('rip');
  const [isCreatingPreset, setIsCreatingPreset] = useState(false);

  // Stores
  const {
    printers,
    selectedPrinter,
    isLoading,
    capabilities,
    refreshPrinters,
    selectPrinter,
    setAsAppDefault,
  } = usePrinterStore();

  const { settings, updateSettings, resetToDefaults } = usePrintSettingsStore(
    selectedPrinter?.id || 'pwa_epson_l3250'
  );

  const { presets, savePreset, deletePreset } = usePrintPresetStore();
  const { jobs, activeJob, createJob, clearHistory } = usePrintJobStore();

  if (!isOpen) return null;

  const handlePrintCanvasArtwork = async () => {
    if (!selectedPrinter) {
      if (onShowSnackbar) onShowSnackbar('Selecione uma impressora primeiro!', 'error');
      return;
    }
    const targetCanvas = canvasElement || PrinterTestService.generateTestPageCanvas(selectedPrinter, settings);

    const job = await createJob(
      selectedPrinter.id,
      selectedPrinter.displayName,
      `Impressão Sublimática - Arte Atual`,
      settings,
      targetCanvas
    );

    if (onShowSnackbar) {
      if (job.status === 'completed') {
        onShowSnackbar(`Trabalho de impressão enviado com sucesso para ${selectedPrinter.displayName}!`, 'success');
      } else {
        onShowSnackbar(job.error || 'Falha ao enviar impressão.', 'error');
      }
    }
  };

  const handleRunTestPrint = async (customCanvas?: HTMLCanvasElement) => {
    if (!selectedPrinter) return;
    const testCanvas = customCanvas || PrinterTestService.generateTestPageCanvas(selectedPrinter, settings);

    const job = await createJob(
      selectedPrinter.id,
      selectedPrinter.displayName,
      `Teste de Sublimação (${selectedPrinter.displayName})`,
      settings,
      testCanvas
    );

    if (onShowSnackbar) {
      if (job.status === 'completed') {
        onShowSnackbar('Trabalho de teste enviado com sucesso para a impressora!', 'success');
      } else {
        onShowSnackbar(job.error || 'Falha ao enviar impressao.', 'error');
      }
    }
  };

  const handleApplyPreset = (preset: PrintPreset) => {
    updateSettings(preset.settings);
    if (preset.printerId) {
      selectPrinter(preset.printerId);
    }
    if (onShowSnackbar) {
      onShowSnackbar(`Preset "${preset.name}" aplicado com sucesso!`, 'success');
    }
  };

  const handleSavePresetSubmit = (name: string, category: string) => {
    if (!selectedPrinter) return;
    savePreset(name, selectedPrinter.id, settings, category);
    setIsCreatingPreset(false);
    if (onShowSnackbar) {
      onShowSnackbar(`Preset "${name}" salvo com sucesso!`, 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-fadeIn">
      <div className={`w-full max-w-5xl h-[88vh] max-h-[850px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
        isDark ? 'bg-[#12131b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDark ? 'bg-[#0a0b10] border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${
              isDark ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200'
            }`}>
              <PrinterIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-bold text-base sm:text-lg flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Configurações de Impressão e Impressoras
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isDark ? 'bg-purple-950 text-purple-300 border-purple-500/40' : 'bg-purple-100 text-purple-800 border-purple-300'
                }`}>
                  ASDP/PAS PRO v4.0
                </span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Gerenciamento profissional de impressoras, spooler, cores ICC e sublimação
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-2xl transition-all cursor-pointer ${
              isDark ? 'text-gray-400 hover:text-white bg-slate-800/60 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 bg-slate-200 hover:bg-slate-300'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Layout Body: Sidebar Navigation + Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Sub-Menu Sidebar */}
          <div className={`w-full md:w-64 border-b md:border-b-0 md:border-r p-3 space-y-1 shrink-0 overflow-x-auto md:overflow-y-auto flex md:flex-col ${
            isDark ? 'bg-[#0a0b10] border-slate-800/80' : 'bg-slate-50 border-slate-200'
          }`}>
            <button
              onClick={() => setActiveTab('rip')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'rip'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/40'
                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <PrinterIcon className="w-4 h-4 text-emerald-500" />
              <span>0. Imprimir Arte (Central RIP)</span>
            </button>

            <button
              onClick={() => setActiveTab('printers')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'printers'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : isDark ? 'text-gray-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <PrinterIcon className="w-4 h-4" />
              <span>1. Impressoras Disponíveis</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : isDark ? 'text-gray-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>2. Parâmetros de Impressão</span>
            </button>

            <button
              onClick={() => setActiveTab('color')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'color'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : isDark ? 'text-gray-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>3. Gerenciamento de Cores</span>
            </button>

            <button
              onClick={() => setActiveTab('icc')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'icc'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : isDark ? 'text-gray-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span>4. Perfis de Cor ICC</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : isDark ? 'text-gray-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>5. Presets por Produto</span>
            </button>

            <button
              onClick={() => setActiveTab('test')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'test'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : isDark ? 'text-gray-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <TestTube2 className="w-4 h-4" />
              <span>6. Teste de Calibração</span>
            </button>

            <button
              onClick={() => setActiveTab('advanced')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'advanced'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : isDark ? 'text-gray-400 hover:bg-slate-800/60 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>7. Fila e Trabalhos ({jobs.length})</span>
            </button>
          </div>

          {/* Tab Main Content Display */}
          <div className={`flex-1 p-5 overflow-y-auto space-y-5 ${
            isDark ? 'bg-[#12131b]' : 'bg-slate-100/70'
          }`}>
            {/* Active Printer Top Banner Bar */}
            {selectedPrinter && (
              <PrinterSelector
                printers={printers}
                selectedPrinterId={selectedPrinter.id}
                onSelectPrinter={selectPrinter}
                isDark={isDark}
              />
            )}

            {/* TAB 0: IMPRIMIR ARTE (CENTRAL RIP) */}
            {activeTab === 'rip' && (
              <div className="space-y-4">
                <div className={`p-5 rounded-3xl space-y-4 shadow-xl border ${
                  isDark
                    ? 'bg-[#181a26] border-emerald-500/30'
                    : 'bg-white border-emerald-300 shadow-md'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-500/40">
                        IMPRESSÃO DIRETA & GERENCIAMENTO RIP
                      </span>
                      <h4 className={`text-base font-extrabold mt-1 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Central de Impressão Sublimática Unificada
                      </h4>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Envie sua arte para a impressora configurada com fidelidade de cores, alta resolução e espelhamento automático.
                      </p>
                    </div>

                    {selectedPrinter && (
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                          🟢 {selectedPrinter.displayName}
                        </span>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {selectedPrinter.status.toUpperCase()} • {selectedPrinter.port}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Settings quick info grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className={`p-3 rounded-2xl border ${
                      isDark ? 'bg-[#0e1018] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Resolução (DPI)</span>
                      <span className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{settings.dpi || 1200} DPI</span>
                    </div>

                    <div className={`p-3 rounded-2xl border ${
                      isDark ? 'bg-[#0e1018] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Modo Espelho</span>
                      <span className={`font-extrabold text-sm ${settings.mirror ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {settings.mirror ? 'ATIVADO' : 'DESATIVADO'}
                      </span>
                    </div>

                    <div className={`p-3 rounded-2xl border ${
                      isDark ? 'bg-[#0e1018] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Perfil de Cor ICC</span>
                      <span className="font-extrabold text-purple-600 dark:text-purple-300 text-xs truncate block">
                        {settings.iccProfile || 'Subli-Vibrant HD'}
                      </span>
                    </div>

                    <div className={`p-3 rounded-2xl border ${
                      isDark ? 'bg-[#0e1018] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Mídia / Papel</span>
                      <span className={`font-extrabold text-xs truncate block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {settings.mediaType || 'Papel Sublimático Fundo Rosa'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={handlePrintCanvasArtwork}
                      className="w-full sm:w-auto flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-wide"
                    >
                      <PrinterIcon className="w-5 h-5 text-slate-950" />
                      <span>Imprimir Arte Atual Agora</span>
                    </button>

                    {onOpenPrintModal && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenPrintModal();
                        }}
                        className={`w-full sm:w-auto py-3 px-5 border font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isDark
                            ? 'bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 border-purple-500/40'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-300'
                        }`}
                      >
                        <Sliders className="w-4 h-4 text-purple-500" />
                        <span>Abrir Visualizador RIP Touchscreen</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: IMPRESSORAS */}
            {activeTab === 'printers' && (
              <div className="space-y-4">
                <PrinterList
                  printers={printers}
                  selectedPrinter={selectedPrinter}
                  isLoading={isLoading}
                  onRefresh={refreshPrinters}
                  onSelect={selectPrinter}
                  onSetAppDefault={setAsAppDefault}
                  onOpenNativeProperties={(id) => PrinterService.getInstance().openNativeProperties(id)}
                  onRunTest={(p) => {
                    selectPrinter(p.id);
                    setActiveTab('test');
                  }}
                  isDark={isDark}
                />

                <PrinterCapabilitiesView capabilities={capabilities} isDark={isDark} />
              </div>
            )}

            {/* TAB 2: CONFIGURAÇÕES DE IMPRESSÃO */}
            {activeTab === 'settings' && (
              <PrintSettingsForm
                settings={settings}
                capabilities={capabilities}
                onChange={updateSettings}
                onReset={() => selectedPrinter && resetToDefaults(selectedPrinter.id)}
                isDark={isDark}
              />
            )}

            {/* TAB 3: GERENCIAMENTO DE CORES */}
            {activeTab === 'color' && (
              <ColorManagementSettings settings={settings} onChange={updateSettings} isDark={isDark} />
            )}

            {/* TAB 4: PERFIS DE COR ICC */}
            {activeTab === 'icc' && (
              <ICCProfileSelector
                selectedIccId={settings.iccProfile}
                onSelectIcc={(iccId) => updateSettings({ iccProfile: iccId })}
                isDark={isDark}
              />
            )}

            {/* TAB 5: PRESETS POR PRODUTO */}
            {activeTab === 'presets' && (
              <div className="space-y-4">
                {isCreatingPreset ? (
                  <PrintPresetEditor
                    currentSettings={settings}
                    printerId={selectedPrinter?.id || ''}
                    onSave={handleSavePresetSubmit}
                    onCancel={() => setIsCreatingPreset(false)}
                    isDark={isDark}
                  />
                ) : (
                  <PrintPresetList
                    presets={presets}
                    activePresetId={undefined}
                    onApplyPreset={handleApplyPreset}
                    onDeletePreset={deletePreset}
                    onCreateNew={() => setIsCreatingPreset(true)}
                    isDark={isDark}
                  />
                )}
              </div>
            )}

            {/* TAB 6: TESTE DE IMPRESSÃO */}
            {activeTab === 'test' && (
              <PrintTestPanel
                printer={selectedPrinter}
                settings={settings}
                onExecuteTestPrint={handleRunTestPrint}
                isDark={isDark}
              />
            )}

            {/* TAB 7: FILA E TRABALHOS */}
            {activeTab === 'advanced' && (
              <PrintJobStatusView jobs={jobs} activeJob={activeJob} onClearHistory={clearHistory} isDark={isDark} />
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isDark ? 'bg-[#0a0b10] border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-[11px] font-mono ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Sublim Studio Engine v4.0 • Modo Espelho Sublimático:{' '}
            <span className={settings.mirror ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>
              {settings.mirror ? 'ATIVADO' : 'DESATIVADO'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintCanvasArtwork}
              className="py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-wide border border-emerald-400/40"
            >
              <PrinterIcon className="w-4 h-4 text-slate-950" />
              <span>Imprimir Arte</span>
            </button>

            <button
              onClick={() => handleRunTestPrint()}
              className={`py-2 px-3.5 border font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-gray-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <TestTube2 className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Imprimir Teste Rápido</span>
            </button>

            <button
              onClick={onClose}
              className="py-2 px-5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg shadow-purple-600/20"
            >
              Concluído
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
