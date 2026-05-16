import type { RiskLevel, ScanRecord } from '../../utils/smartQR';

type Props = {
  records: ScanRecord[];
  limit?: number;
};

const riskBadge = (risk: RiskLevel) => {
  if (risk === 'High') return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
  if (risk === 'Medium') return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200';
  return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200';
};

function RecordsTable({ records, limit }: Props) {
  const shownRecords = typeof limit === 'number' ? records.slice(0, limit) : records;

  return (
    <div className="overflow-x-auto rounded-3xl border border-cyan-100 bg-white shadow-soft dark:border-cyan-900 dark:bg-slate-900">
      <table className="min-w-[820px] w-full text-left text-sm">
        <thead className="bg-cyan-700 text-white dark:bg-cyan-900">
          <tr>
            <th className="px-4 py-4">#</th>
            <th className="px-4 py-4">Category</th>
            <th className="px-4 py-4">Risk</th>
            <th className="px-4 py-4">Detected Data</th>
            <th className="px-4 py-4">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cyan-100 dark:divide-slate-800">
          {shownRecords.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">No records available.</td>
            </tr>
          ) : (
            shownRecords.map((item, index) => (
              <tr key={`${item.date}-${index}`} className="hover:bg-cyan-50 dark:hover:bg-slate-800">
                <td className="px-4 py-4 font-bold">{index + 1}</td>
                <td className="px-4 py-4">{item.category}</td>
                <td className="px-4 py-4"><span className={`${riskBadge(item.risk)} rounded-full px-3 py-1 text-xs font-extrabold`}>{item.risk}</span></td>
                <td className="max-w-sm break-words px-4 py-4">{item.value.slice(0, 100)}</td>
                <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{item.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecordsTable;
