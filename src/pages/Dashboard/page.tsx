import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import RecordsTable from '../../components/RecordsTable/page';
import { ScanRecord, addRecord, categoryCounts, deleteRecord, loadHistory, mediumHighRiskCount, updateRecord } from '../../utils/smartQR';

const widthClass = (value: number, highest: number) => {
  const percent = highest ? Math.round((value / highest) * 100) : 0;
  if (percent >= 90) return 'w-full';
  if (percent >= 75) return 'w-10/12';
  if (percent >= 60) return 'w-8/12';
  if (percent >= 45) return 'w-6/12';
  if (percent >= 30) return 'w-4/12';
  if (percent >= 15) return 'w-3/12';
  return 'w-2/12';
};

function Dashboard() {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [recordValue, setRecordValue] = useState('');
  const [message, setMessage] = useState('Dashboard is ready. Insert, update, delete or view records.');

  useEffect(() => {
    setRecords(loadHistory());
  }, []);

  const counts = useMemo(() => categoryCounts(records), [records]);
  const categories = Object.keys(counts);
  const highest = Math.max(1, ...Object.values(counts));

  const insertNewRecord = () => {
    if (!recordValue.trim()) {
      setMessage('Please enter QR data before inserting a new record.');
      return;
    }
    const updated = addRecord(recordValue);
    setRecords(updated);
    setRecordValue('');
    setSelectedIndex('');
    setMessage('New QR record inserted successfully.');
  };

  const updateSelectedRecord = () => {
    const index = Number(selectedIndex);
    if (selectedIndex === '' || Number.isNaN(index)) {
      setMessage('Please select a record to update.');
      return;
    }
    if (!recordValue.trim()) {
      setMessage('Please enter updated QR data.');
      return;
    }
    const updated = updateRecord(index, recordValue);
    setRecords(updated);
    setRecordValue('');
    setSelectedIndex('');
    setMessage('Selected QR record updated successfully.');
  };

  const deleteSelectedRecord = () => {
    const index = Number(selectedIndex);
    if (selectedIndex === '' || Number.isNaN(index)) {
      setMessage('Please select a record to delete.');
      return;
    }
    const updated = deleteRecord(index);
    setRecords(updated);
    setSelectedIndex('');
    setRecordValue('');
    setMessage('Selected QR record deleted successfully.');
  };

  const handleSelect = (value: string) => {
    setSelectedIndex(value);
    const index = Number(value);
    setRecordValue(records[index]?.value || '');
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-extrabold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">Main Dashboard</span>
        <h1 className="mt-5 text-4xl font-black text-slate-950 dark:text-white">SmartQR Records Dashboard</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">This dashboard manages QR database records. It contains view, insert, update, delete, graphical view, quick links and record preview features required for the assignment.</p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/history" className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-cyan-900 dark:bg-slate-900">
          <p className="text-3xl font-black text-cyan-700 dark:text-cyan-300">{records.length}</p>
          <h3 className="mt-2 text-lg font-extrabold">View All Records</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Open complete saved QR history.</p>
        </Link>
        <a href="#recordForm" className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-cyan-900 dark:bg-slate-900">
          <p className="text-3xl font-black text-emerald-700 dark:text-emerald-300">+</p>
          <h3 className="mt-2 text-lg font-extrabold">Insert New Record</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Add a QR record manually.</p>
        </a>
        <a href="#recordForm" className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-cyan-900 dark:bg-slate-900">
          <p className="text-3xl font-black text-amber-700 dark:text-amber-300">✎</p>
          <h3 className="mt-2 text-lg font-extrabold">Update Record</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Select and edit saved QR data.</p>
        </a>
        <a href="#recordForm" className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-cyan-900 dark:bg-slate-900">
          <p className="text-3xl font-black text-red-700 dark:text-red-300">×</p>
          <h3 className="mt-2 text-lg font-extrabold">Delete Record</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Remove unnecessary records.</p>
        </a>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-cyan-700 p-6 text-white shadow-soft"><p className="text-4xl font-black">{records.length}</p><p className="mt-2 font-bold">Total QR Records</p></div>
        <div className="rounded-3xl bg-blue-700 p-6 text-white shadow-soft"><p className="text-4xl font-black">{categories.length}</p><p className="mt-2 font-bold">Detected Categories</p></div>
        <div className="rounded-3xl bg-amber-600 p-6 text-white shadow-soft"><p className="text-4xl font-black">{mediumHighRiskCount(records)}</p><p className="mt-2 font-bold">Medium/High Risk</p></div>
      </section>

      <section id="recordForm" className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Quick Record Management</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="recordSelect" className="font-bold text-slate-700 dark:text-slate-200">Select Existing Record</label>
            <select id="recordSelect" value={selectedIndex} onChange={(event) => handleSelect(event.target.value)} className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-950">
              <option value="">No record selected</option>
              {records.map((item, index) => (
                <option key={`${item.date}-${index}`} value={index}>{index + 1}. {item.category} - {item.value.slice(0, 38)}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="dashboardRecordValue" className="font-bold text-slate-700 dark:text-slate-200">QR Data Value</label>
            <input id="dashboardRecordValue" type="text" placeholder="Enter QR data, URL, phone number, WiFi string or text" value={recordValue} onChange={(event) => setRecordValue(event.target.value)} className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-950" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={insertNewRecord} className="rounded-2xl bg-cyan-700 px-5 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Insert New Record</button>
          <button type="button" onClick={updateSelectedRecord} className="rounded-2xl border border-cyan-600 px-5 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Update Selected</button>
          <button type="button" onClick={deleteSelectedRecord} className="rounded-2xl border border-red-500 px-5 py-3 font-extrabold text-red-600 transition hover:-translate-y-1 hover:bg-red-600 hover:text-white dark:text-red-300">Delete Selected</button>
          <Link to="/history" className="rounded-2xl border border-slate-400 px-5 py-3 font-extrabold text-slate-700 transition hover:-translate-y-1 hover:bg-slate-800 hover:text-white dark:border-slate-500 dark:text-slate-200">View All Records</Link>
        </div>
        <p className="mt-5 rounded-2xl bg-cyan-50 p-4 text-sm font-bold text-cyan-800 dark:bg-slate-800 dark:text-cyan-200">{message}</p>
      </section>

      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Graphical View for QR Database Records</h2>
        <div className="mt-6 space-y-4">
          {categories.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-cyan-300 p-6 text-center text-slate-500 dark:border-cyan-800 dark:text-slate-400">No data available for graph. Add or scan QR records first.</p>
          ) : (
            categories.map((category) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between gap-3 text-sm font-bold text-slate-700 dark:text-slate-200"><span>{category}</span><span>{counts[category]} record(s)</span></div>
                <div className="h-4 overflow-hidden rounded-full bg-cyan-100 dark:bg-slate-800"><div className={`${widthClass(counts[category], highest)} h-full rounded-full bg-gradient-to-r from-cyan-600 to-blue-600`} /></div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Recent Records Preview</h2>
        <RecordsTable records={records} limit={5} />
      </section>
    </main>
  );
}

export default Dashboard;
