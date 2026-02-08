import React from 'react';

function formatDate(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString();
}

export default function EntriesTable({ entries }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Recent Entries</h2>
          <p className="text-xs text-slate-500">
            Latest records first. Limited to what the API returns.
          </p>
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-slate-100">
        <div className="max-h-72 overflow-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">Timestamp</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium text-right">Value</th>
                <th className="px-3 py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {entries.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-6 text-center text-xs text-slate-400"
                  >
                    No entries yet. Add one above to get started.
                  </td>
                </tr>
              )}

              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                    {formatDate(entry.entryTimestamp)}
                  </td>
                  <td className="px-3 py-2 text-slate-700">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      {entry.category}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right text-slate-900 font-semibold">
                    {entry.value}
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {entry.notes || <span className="text-slate-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
