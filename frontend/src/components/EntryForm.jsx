import React, { useState } from 'react';

const CATEGORY_OPTIONS = ['general', 'health', 'finance', 'productivity'];

export default function EntryForm({ onCreate, loading }) {
  const [category, setCategory] = useState('general');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;

    await onCreate({
      category,
      value: Number(value),
      notes: notes.trim() || null,
    });

    setValue('');
    setNotes('');
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">New Entry</h2>
          <p className="text-xs text-slate-500">
            Add a data point and see the chart update instantly.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="space-y-1 md:col-span-1">
          <label className="text-xs font-medium text-slate-600">Category</label>
          <select
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500/0 transition focus:border-indigo-500 focus:bg-white focus:ring-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt[0].toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 md:col-span-1">
          <label className="text-xs font-medium text-slate-600">Value</label>
          <input
            type="number"
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500/0 transition focus:border-indigo-500 focus:bg-white focus:ring-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 42"
            required
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-slate-600">Notes (optional)</label>
          <textarea
            className="block w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500/0 transition focus:border-indigo-500 focus:bg-white focus:ring-2"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Short description of this entry…"
          />
        </div>

        <div className="md:col-span-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/40 transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {loading && (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-b-transparent" />
            )}
            <span>{loading ? 'Saving…' : 'Add Entry'}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
