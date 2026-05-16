import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { applySavedTheme, toggleThemeMode } from '../../utils/smartQR';

const links = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/scanner', label: 'Scanner' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/history', label: 'History' },
  { path: '/cart', label: 'Cart' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/about', label: 'Team' },
  { path: '/profile', label: 'Profile' },
  { path: '/theme', label: 'Theme' },
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'Register' }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeLabel, setThemeLabel] = useState('Dark');

  useEffect(() => {
    applySavedTheme();
    setThemeLabel(document.documentElement.classList.contains('dark') ? 'Light' : 'Dark');
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleTheme = () => {
    const newTheme = toggleThemeMode();
    setThemeLabel(newTheme === 'dark' ? 'Light' : 'Dark');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-100 bg-white/90 px-5 py-4 shadow-sm backdrop-blur dark:border-cyan-900 dark:bg-slate-950/90 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" onClick={closeMenu} className="rounded-xl bg-gradient-to-r from-cyan-700 to-blue-700 px-4 py-2 text-lg font-extrabold text-white shadow-md">
          SmartQR Analyzer
        </Link>

        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl bg-cyan-700 px-4 py-2 font-bold text-white shadow md:hidden">
          Menu
        </button>

        <div className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-20 mx-4 flex-col gap-2 rounded-3xl border border-cyan-100 bg-white p-4 shadow-soft dark:border-cyan-900 dark:bg-slate-900 md:static md:mx-0 md:flex md:flex-row md:flex-wrap md:items-center md:justify-end md:border-0 md:bg-transparent md:p-0 md:shadow-none md:dark:bg-transparent`}>
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={closeMenu} className={({ isActive }) => `${isActive ? 'bg-cyan-700 text-white dark:bg-cyan-500 dark:text-slate-950' : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-300'} rounded-xl px-3 py-2 text-sm font-bold transition`}>
              {link.label}
            </NavLink>
          ))}
          <button type="button" onClick={handleTheme} className="rounded-xl border border-cyan-600 px-3 py-2 text-sm font-bold text-cyan-700 transition hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">
            {themeLabel} Mode
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
