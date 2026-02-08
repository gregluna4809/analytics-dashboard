import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function formatShortDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export default function EntriesChart({ entries }) {
  const data = useMemo(() => {
    if (!entries || entries.length === 0) return [];

    const sorted = [...entries].sort(
      (a, b) => new Date(a.entryTimestamp) - new Date(b.entryTimestamp)
    );

    return sorted.map((e) => ({
      ...e,
      label: formatShortDate(e.entryTimestamp),
    }));
  }, [entries]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Value Over Time</h2>
          <p className="text-xs text-slate-500">
            Line chart of the <span className="font-mono">value</span> field by timestamp.
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Not enough data to render a chart yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fontSize: 11, fill: '#64748B' }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fontSize: 11, fill: '#64748B' }}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  borderColor: '#E5E7EB',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
