import React, { useMemo } from 'react';

function formatNumber(n) {
  if (n == null || Number.isNaN(n)) return '—';
  return n.toLocaleString();
}

export default function StatsCards({ entries }) {
  const stats = useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        totalEntries: 0,
        totalValue: 0,
        avgValue: 0,
        lastValue: null,
      };
    }

    const totalEntries = entries.length;
    const totalValue = entries.reduce((sum, e) => sum + (e.value || 0), 0);
    const avgValue = totalValue / totalEntries;
    const last = entries[0];

    return {
      totalEntries,
      totalValue,
      avgValue,
      lastValue: last?.value ?? null,
    };
  }, [entries]);

  const cards = [
    {
      label: 'Total Entries',
      value: formatNumber(stats.totalEntries),
      helper: 'All records for this user',
    },
    {
      label: 'Sum of Values',
      value: formatNumber(stats.totalValue),
      helper: 'Σ of value field',
    },
    {
      label: 'Average Value',
      value: stats.avgValue ? stats.avgValue.toFixed(1) : '—',
      helper: 'Mean across all entries',
    },
    {
      label: 'Latest Value',
      value: stats.lastValue != null ? formatNumber(stats.lastValue) : '—',
      helper: 'From most recent entry',
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
          <p className="mt-1 text-xs text-slate-500">{card.helper}</p>
        </div>
      ))}
    </section>
  );
}
