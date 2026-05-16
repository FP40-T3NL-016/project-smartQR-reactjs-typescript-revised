import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 lg:px-10">
      <section className="grid items-center gap-10 rounded-[2rem] border border-cyan-100 bg-white/85 p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900/80 lg:grid-cols-2 lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-extrabold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">React TypeScript + Tailwind CSS</span>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white md:text-6xl">Smart QR Code Reader and Data Analyzer</h1>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">This web application reads QR code data through camera, uploaded QR image and manual input. It analyzes embedded information and classifies URLs, phone numbers, emails, WiFi records, product codes, payment data and plain text.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/scanner" className="rounded-2xl bg-cyan-700 px-6 py-3 font-extrabold text-white shadow-lg transition hover:-translate-y-1 hover:bg-cyan-800">Open Scanner</Link>
            <Link to="/dashboard" className="rounded-2xl border border-cyan-600 px-6 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">View Dashboard</Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-3xl bg-cyan-50 p-6 shadow-sm dark:bg-slate-800">
            <h3 className="text-xl font-extrabold text-cyan-800 dark:text-cyan-300">QR Reader</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Scan QR images, use camera mode or paste QR text manually.</p>
          </article>
          <article className="rounded-3xl bg-blue-50 p-6 shadow-sm dark:bg-slate-800">
            <h3 className="text-xl font-extrabold text-blue-800 dark:text-blue-300">Data Analyzer</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Classifies scanned content and shows useful safety suggestions.</p>
          </article>
          <article className="rounded-3xl bg-teal-50 p-6 shadow-sm dark:bg-slate-800">
            <h3 className="text-xl font-extrabold text-teal-800 dark:text-teal-300">Dashboard</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Insert, update, delete and view saved QR records with charts.</p>
          </article>
          <article className="rounded-3xl bg-amber-50 p-6 shadow-sm dark:bg-slate-800">
            <h3 className="text-xl font-extrabold text-amber-800 dark:text-amber-300">Theme Mode</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Switch between light and dark display modes using Tailwind styling.</p>
          </article>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-slate-900">
          <p className="text-4xl font-black text-cyan-700 dark:text-cyan-300">12+</p>
          <p className="mt-2 font-bold text-slate-700 dark:text-slate-200">Linked pages in navbar</p>
        </div>
        <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-slate-900">
          <p className="text-4xl font-black text-cyan-700 dark:text-cyan-300">3</p>
          <p className="mt-2 font-bold text-slate-700 dark:text-slate-200">QR input methods</p>
        </div>
        <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-slate-900">
          <p className="text-4xl font-black text-cyan-700 dark:text-cyan-300">100%</p>
          <p className="mt-2 font-bold text-slate-700 dark:text-slate-200">Tailwind page styling</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
