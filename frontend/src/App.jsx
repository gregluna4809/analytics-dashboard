import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import StatsCards from './components/StatsCards.jsx';
import EntryForm from './components/EntryForm.jsx';
import EntriesTable from './components/EntriesTable.jsx';
import EntriesChart from './components/EntriesChart.jsx';
import { fetchEntries, createEntry } from './lib/api.js';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const loadEntries = async () => {
    try {
      setError(null);
      setLoadingEntries(true);
      const data = await fetchEntries();

      const sorted = [...data].sort(
        (a, b) => new Date(b.entryTimestamp) - new Date(a.entryTimestamp)
      );
      setEntries(sorted);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load entries');
    } finally {
      setLoadingEntries(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleCreate = async (payload) => {
    try {
      setError(null);
      setCreating(true);
      const created = await createEntry(payload);

      setEntries((prev) => [
        { ...created, entryTimestamp: created.entryTimestamp },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create entry');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 md:py-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        {loadingEntries ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-100">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-b-transparent" />
              <span className="text-sm text-slate-600">Loading entries…</span>
            </div>
          </div>
        ) : (
          <>
            <StatsCards entries={entries} />

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <EntriesChart entries={entries} />
              <EntryForm onCreate={handleCreate} loading={creating} />
            </div>

            <EntriesTable entries={entries} />
          </>
        )}
      </main>
    </div>
  );
}

