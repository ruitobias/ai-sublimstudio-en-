import { useState } from 'react';
import { StorageService } from '../services/storage/StorageService';
import { PrintJob, PrintSettings } from '../services/printer/PrinterTypes';
import { PrinterService } from '../services/printer/PrinterService';

export function usePrintJobStore() {
  const [jobs, setJobs] = useState<PrintJob[]>(() => {
    return StorageService.getItem<PrintJob[]>('printJobsHistory', []);
  });

  const [activeJob, setActiveJob] = useState<PrintJob | null>(null);

  const createJob = async (
    printerId: string,
    printerName: string,
    documentTitle: string,
    settings: PrintSettings,
    canvasElement?: HTMLCanvasElement
  ): Promise<PrintJob> => {
    const newJob: PrintJob = {
      id: 'job_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      documentId: 'doc_' + Date.now(),
      documentTitle,
      printerId,
      printerName,
      status: 'queued',
      progressPercent: 0,
      createdAt: new Date().toISOString(),
      pageCount: 1,
      settingsUsed: settings,
    };

    setJobs((prev) => {
      const next = [newJob, ...prev.slice(0, 49)];
      StorageService.setItem('printJobsHistory', next);
      return next;
    });

    setActiveJob(newJob);

    // Dispatch job to PrinterService
    try {
      newJob.status = 'preparing';
      newJob.startedAt = new Date().toISOString();
      newJob.progressPercent = 30;

      const success = await PrinterService.getInstance().executePrint(newJob, canvasElement);

      if (success) {
        newJob.status = 'completed';
        newJob.completedAt = new Date().toISOString();
        newJob.progressPercent = 100;
      } else {
        newJob.status = 'failed';
        newJob.error = 'Falha ao comunicar com a impressora ou envio cancelado pelo spooler.';
      }
    } catch (err: any) {
      newJob.status = 'failed';
      newJob.error = err?.message || 'Erro no envio do trabalho de impressão.';
    } finally {
      setJobs((prev) => {
        const next = prev.map((j) => (j.id === newJob.id ? { ...newJob } : j));
        StorageService.setItem('printJobsHistory', next);
        return next;
      });
      setActiveJob(null);
    }

    return newJob;
  };

  const cancelJob = (jobId: string) => {
    setJobs((prev) => {
      const next = prev.map((j) =>
        j.id === jobId ? { ...j, status: 'cancelled' as const, completedAt: new Date().toISOString() } : j
      );
      StorageService.setItem('printJobsHistory', next);
      return next;
    });
  };

  const clearHistory = () => {
    setJobs([]);
    StorageService.setItem('printJobsHistory', []);
  };

  return {
    jobs,
    activeJob,
    createJob,
    cancelJob,
    clearHistory,
  };
}
