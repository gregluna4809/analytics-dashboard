import React from 'react';

export default function NavBar() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
            AD
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Analytics Dashboard</h1>
            <p className="text-xs text-slate-500">
              Local full-stack demo • MySQL · Express · React
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 text-xs text-slate-500 sm:flex">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live
          </span>
          <span>Backend: http://localhost:4000</span>
          <span className="hidden sm:inline">Frontend: http://localhost:5173</span>
        </div>
      </div>
    </header>
  );
}
