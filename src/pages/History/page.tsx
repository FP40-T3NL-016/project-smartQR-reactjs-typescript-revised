import { useEffect, useState } from 'react';
import RecordsTable from '../../components/RecordsTable/page';
import { ScanRecord, clearAllRecords, loadHistory } from '../../utils/smartQR';

function History() {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [message, setMessage] = useState('Saved QR records will appear below.');

  useEffect(() => {
    setRecords(loadHistory());
  }, []);

  const handleClear = () => {
    clearAllRecords();
    setRecords([]);
    setMessage('Scan history has been cleared.');
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Saved QR History</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">This page shows QR data records saved in browser localStorage. It works like the view-all-records section of the SmartQR database.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => setRecords(loadHistory())} className="rounded-2xl bg-cyan-700 px-5 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Refresh History</button>
          <button type="button" onClick={handleClear} className="rounded-2xl border border-red-500 px-5 py-3 font-extrabold text-red-600 transition hover:-translate-y-1 hover:bg-red-600 hover:text-white dark:text-red-300">Clear History</button>
        </div>
        <p className="mt-5 rounded-2xl bg-cyan-50 p-4 text-sm font-bold text-cyan-800 dark:bg-slate-800 dark:text-cyan-200">{message}</p>
      </section>
      <RecordsTable records={records} />
    </main>
  );
}

export default History;
