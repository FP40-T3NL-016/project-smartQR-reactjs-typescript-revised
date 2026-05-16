import type { RiskLevel, ScanRecord } from '../../utils/smartQR';

type Props = {
  record: ScanRecord | null;
  emptyText: string;
};

const riskBadge = (risk: RiskLevel) => {
  if (risk === 'High') return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
  if (risk === 'Medium') return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200';
  return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200';
};

function AnalysisResult({ record, emptyText }: Props) {
  if (!record) {
    return <div className="rounded-3xl border border-dashed border-cyan-300 bg-white/80 p-6 text-center text-slate-600 shadow-sm dark:border-cyan-800 dark:bg-slate-900/70 dark:text-slate-300">{emptyText}</div>;
  }

  return (
    <section className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-extrabold text-cyan-800 dark:text-cyan-300">Analysis Result</h3>
        <span className={`${riskBadge(record.risk)} rounded-full px-4 py-1 text-sm font-extrabold`}>{record.risk} Risk</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Category</p>
          <p className="break-words text-lg font-bold text-slate-900 dark:text-white">{record.category}</p>
        </div>
        <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Length</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{record.length} characters</p>
        </div>
        <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800 md:col-span-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Detected Data</p>
          <p className="break-words text-sm leading-7 text-slate-800 dark:text-slate-200">{record.value}</p>
        </div>
        <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800 md:col-span-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Suggestion</p>
          <p className="text-sm leading-7 text-slate-800 dark:text-slate-200">{record.suggestion}</p>
        </div>
      </div>
    </section>
  );
}

export default AnalysisResult;
