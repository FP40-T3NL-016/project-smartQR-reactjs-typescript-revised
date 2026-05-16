import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-auto border-t border-cyan-100 bg-slate-950 px-5 py-10 text-white dark:border-cyan-900 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <section className="space-y-3">
          <h2 className="text-2xl font-extrabold text-cyan-300">SmartQR Analyzer</h2>
          <p className="text-sm leading-7 text-slate-300">A React JS TypeScript project for QR scanning, QR data analysis, record management and dashboard reporting using Tailwind CSS.</p>
        </section>
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-cyan-300">Important Pages</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/scanner" className="hover:text-white">Scanner</Link>
            <Link to="/analytics" className="hover:text-white">Analytics</Link>
            <Link to="/history" className="hover:text-white">History</Link>
            <Link to="/cart" className="hover:text-white">Cart</Link>
            <Link to="/profile" className="hover:text-white">Profile</Link>
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-cyan-300">Completed Requirements</h3>
          <p className="text-sm leading-7 text-slate-300">The project includes Tailwind styling, dark/light mode, navbar links, footer, login, register, dashboard, cart, reviews, team/about and profile pages.</p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
