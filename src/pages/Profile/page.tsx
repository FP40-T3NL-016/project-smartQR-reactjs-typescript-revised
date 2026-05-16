import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DemoUser, getCurrentUser, loadHistory, logoutUser } from '../../utils/smartQR';

function Profile() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [recordCount, setRecordCount] = useState(0);
  const [message, setMessage] = useState('Profile information is loaded from browser localStorage.');

  useEffect(() => {
    setUser(getCurrentUser());
    setRecordCount(loadHistory().length);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setMessage('You have been logged out from the demo profile.');
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">User Profile</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">This profile page displays the current demo user and basic SmartQR activity. It is part of the new required pages in the follow-up assignment.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900 lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-700 text-4xl font-black text-white">{user?.name?.slice(0, 1).toUpperCase() || 'G'}</div>
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">{user?.name || 'Guest User'}</h2>
              <p className="mt-1 font-bold text-cyan-700 dark:text-cyan-300">{user?.email || 'No account logged in'}</p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{user?.role || 'Visitor'}</p>
            </div>
          </div>
          <p className="mt-6 rounded-2xl bg-cyan-50 p-4 text-sm font-bold text-cyan-800 dark:bg-slate-800 dark:text-cyan-200">{message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {user ? <button type="button" onClick={handleLogout} className="rounded-2xl border border-red-500 px-5 py-3 font-extrabold text-red-600 transition hover:-translate-y-1 hover:bg-red-600 hover:text-white dark:text-red-300">Logout</button> : <Link to="/login" className="rounded-2xl bg-cyan-700 px-5 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Login Now</Link>}
            <Link to="/register" className="rounded-2xl border border-cyan-600 px-5 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Register New Account</Link>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-cyan-700 p-6 text-white shadow-soft"><p className="text-4xl font-black">{recordCount}</p><p className="mt-2 font-bold">Saved QR Records</p></div>
          <div className="rounded-3xl bg-blue-700 p-6 text-white shadow-soft"><p className="text-4xl font-black">4</p><p className="mt-2 font-bold">Available Tools</p></div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
