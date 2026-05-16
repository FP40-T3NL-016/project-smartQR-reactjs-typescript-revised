import { useEffect, useMemo, useState } from 'react';
import { ScanRecord, categoryCounts, loadHistory, mediumHighRiskCount } from '../../utils/smartQR';

function Analytics() {
  const [records, setRecords] = useState<ScanRecord[]>([]);

  useEffect(() => {
    setRecords(loadHistory());
  }, []);

  const counts = useMemo(() => categoryCounts(records), [records]);
  const categories = Object.keys(counts);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Analytics</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">The analytics page summarizes scanned QR records by category. It uses React TypeScript and localStorage records created from the scanner and dashboard pages.</p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-cyan-700 p-6 text-white shadow-soft"><p className="text-4xl font-black">{records.length}</p><p className="mt-2 font-bold">Total Scans</p></div>
        <div className="rounded-3xl bg-blue-700 p-6 text-white shadow-soft"><p className="text-4xl font-black">{categories.length}</p><p className="mt-2 font-bold">Categories Found</p></div>
        <div className="rounded-3xl bg-amber-600 p-6 text-white shadow-soft"><p className="text-4xl font-black">{mediumHighRiskCount(records)}</p><p className="mt-2 font-bold">Medium/High Risk</p></div>
      </section>

      <section className="overflow-x-auto rounded-3xl border border-cyan-100 bg-white shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-cyan-700 text-white dark:bg-cyan-900">
            <tr>
              <th className="px-4 py-4">QR Data Category</th>
              <th className="px-4 py-4">Total Records</th>
              <th className="px-4 py-4">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-100 dark:divide-slate-800">
            {categories.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">No analytics data available.</td></tr>
            ) : (
              categories.map((category) => {
                const total = counts[category];
                const percent = records.length ? Math.round((total / records.length) * 100) : 0;
                return (
                  <tr key={category} className="hover:bg-cyan-50 dark:hover:bg-slate-800">
                    <td className="px-4 py-4 font-bold">{category}</td>
                    <td className="px-4 py-4">{total}</td>
                    <td className="px-4 py-4">{percent}%</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-slate-900">
          <h3 className="text-xl font-extrabold text-cyan-800 dark:text-cyan-300">URL Detection</h3>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Identifies website links and highlights suspicious words such as login, verify, free, gift, offer and claim.</p>
        </article>
        <article className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-slate-900">
          <h3 className="text-xl font-extrabold text-cyan-800 dark:text-cyan-300">Contact Detection</h3>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Recognizes phone numbers, email addresses and contact-card formats.</p>
        </article>
        <article className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-slate-900">
          <h3 className="text-xl font-extrabold text-cyan-800 dark:text-cyan-300">Risk Suggestion</h3>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Provides basic low, medium or high risk classification according to the detected data pattern.</p>
        </article>
      </section>
    </main>
  );
}

export default Analytics;
