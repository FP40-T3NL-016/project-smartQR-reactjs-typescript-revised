import { useEffect, useState } from 'react';
import { applySavedTheme, getSavedTheme, setThemeMode } from '../../utils/smartQR';

function Theme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    applySavedTheme();
    setTheme(getSavedTheme());
  }, []);

  const chooseTheme = (value: 'light' | 'dark') => {
    setThemeMode(value);
    setTheme(value);
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Dark / Light Mode</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">This page controls the project theme. The selected mode is saved in localStorage and applied by adding or removing Tailwind's dark class from the root element.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <button type="button" onClick={() => chooseTheme('light')} className={`${theme === 'light' ? 'ring-4 ring-cyan-300' : ''} rounded-[2rem] border border-cyan-100 bg-white p-8 text-left shadow-soft transition hover:-translate-y-1 dark:border-cyan-900 dark:bg-slate-900`}>
          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-extrabold text-amber-800">Light</span>
          <h2 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">Light Theme</h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Clean white and cyan layout for classroom presentation and normal use.</p>
        </button>
        <button type="button" onClick={() => chooseTheme('dark')} className={`${theme === 'dark' ? 'ring-4 ring-cyan-300' : ''} rounded-[2rem] border border-cyan-100 bg-slate-950 p-8 text-left text-white shadow-soft transition hover:-translate-y-1 dark:border-cyan-900`}>
          <span className="inline-flex rounded-full bg-cyan-900 px-4 py-2 text-sm font-extrabold text-cyan-200">Dark</span>
          <h2 className="mt-6 text-2xl font-black">Dark Theme</h2>
          <p className="mt-3 leading-7 text-slate-300">Dark background with cyan highlights for a modern dashboard-style interface.</p>
        </button>
      </section>

      <section className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Current Theme</h2>
        <p className="mt-3 text-lg font-bold text-slate-700 dark:text-slate-200">{theme === 'dark' ? 'Dark mode is active.' : 'Light mode is active.'}</p>
      </section>
    </main>
  );
}

export default Theme;
