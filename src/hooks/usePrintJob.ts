import { usePrintJobStore } from '../store/usePrintJobStore';

export function usePrintJob() {
  const { jobs, activeJob, createJob, cancelJob, clearHistory } = usePrintJobStore();
  return { jobs, activeJob, createJob, cancelJob, clearHistory };
}
