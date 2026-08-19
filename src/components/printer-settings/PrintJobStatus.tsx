import React from 'react';
import { PrintJob } from '../../services/printer/PrinterTypes';
import { Clock, CheckCircle2, AlertTriangle, XCircle, Trash2, Printer } from 'lucide-react';

interface PrintJobStatusProps {
  jobs: PrintJob[];
  activeJob: PrintJob | null;
  onClearHistory: () => void;
  isDark?: boolean;
}

export const PrintJobStatusView: React.FC<PrintJobStatusProps> = ({
  jobs,
  activeJob,
  onClearHistory,
  isDark = true,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
          isDark ? 'text-gray-300' : 'text-slate-700'
        }`}>
          <Clock className="w-4 h-4 text-purple-400" />
          Fila e Histórico de Trabalhos de Impressão (Print Queue)
        </h4>

        {jobs.length > 0 && (
          <button
            onClick={onClearHistory}
            className={`text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
              isDark ? 'text-gray-400 hover:text-red-400' : 'text-slate-500 hover:text-red-600'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Histórico</span>
          </button>
        )}
      </div>

      {/* Active Spooler Job */}
      {activeJob && (
        <div className={`p-4 border rounded-2xl space-y-2 animate-pulse ${
          isDark ? 'bg-purple-950/40 border-purple-500/60' : 'bg-purple-50 border-purple-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Printer className="w-4 h-4 text-purple-500" />
              Processando: {activeJob.documentTitle}
            </span>
            <span className="text-xs font-mono font-bold text-purple-600">{activeJob.progressPercent}%</span>
          </div>

          <div className={`w-full rounded-full h-2 overflow-hidden border ${
            isDark ? 'bg-slate-900 border-purple-500/30' : 'bg-slate-200 border-purple-300'
          }`}>
            <div
              className="bg-purple-600 h-full transition-all duration-300"
              style={{ width: `${activeJob.progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Job List Table */}
      {jobs.length === 0 ? (
        <div className={`p-8 text-center border rounded-2xl text-xs ${
          isDark ? 'bg-[#0a0b10] border-slate-800 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          Nenhum trabalho de impressão enviado nesta sessão.
        </div>
      ) : (
        <div className={`border rounded-2xl overflow-hidden divide-y ${
          isDark
            ? 'bg-[#0a0b10] border-slate-800 divide-slate-800/60'
            : 'bg-white border-slate-200 divide-slate-100'
        }`}>
          {jobs.map((job) => (
            <div key={job.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>{job.documentTitle}</span>
                <span className={`text-[10px] font-mono block ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  Impressora: {job.printerName} • {new Date(job.createdAt).toLocaleTimeString('pt-BR')}
                </span>
                {job.error && <span className="text-[10px] text-red-500 block">{job.error}</span>}
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 shrink-0 ${
                  job.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                    : job.status === 'printing' || job.status === 'preparing'
                    ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                    : job.status === 'failed'
                    ? 'bg-red-500/20 text-red-500 border-red-500/30'
                    : isDark
                    ? 'bg-slate-800 text-gray-400 border-slate-700'
                    : 'bg-slate-200 text-slate-600 border-slate-300'
                }`}
              >
                {job.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                {job.status === 'failed' && <XCircle className="w-3 h-3" />}
                {(job.status === 'printing' || job.status === 'preparing') && <AlertTriangle className="w-3 h-3" />}
                <span>
                  {job.status === 'completed'
                    ? 'Concluído'
                    : job.status === 'printing'
                    ? 'Imprimindo'
                    : job.status === 'preparing'
                    ? 'Preparando'
                    : job.status === 'failed'
                    ? 'Falhou'
                    : 'Cancelado'}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
