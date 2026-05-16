import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadUsers, setCurrentUser } from '../../utils/smartQR';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Demo tip: register first, then login with the same email and password.');

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const users = loadUsers();
    const matchedUser = users.find((user) => user.email === email.trim().toLowerCase() && user.password === password);

    if (!matchedUser) {
      setMessage('Invalid email or password. Please register first or check your details.');
      return;
    }

    setCurrentUser(matchedUser);
    setMessage('Login successful. Redirecting to dashboard...');
    window.setTimeout(() => navigate('/dashboard'), 700);
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 lg:px-10">
      <section className="grid gap-8 rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900 lg:grid-cols-2 lg:p-10">
        <div className="space-y-5">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-extrabold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">Secure Access Page</span>
          <h1 className="text-4xl font-black text-slate-950 dark:text-white">Login / Sign In</h1>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">This page is added as a compulsory assignment requirement. It provides a clean login interface before the user enters the dashboard area.</p>
          <ul className="space-y-3 text-slate-700 dark:text-slate-200">
            <li className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">Checks email and password fields before login.</li>
            <li className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">Uses localStorage for simple front-end demo authentication.</li>
            <li className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">Keeps the same Tailwind style as the full website.</li>
          </ul>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Welcome Back</h2>
          <p className="text-slate-600 dark:text-slate-300">Sign in to continue to the SmartQR dashboard.</p>
          <div className="space-y-2">
            <label htmlFor="loginEmail" className="font-bold text-slate-700 dark:text-slate-200">Email Address</label>
            <input id="loginEmail" type="email" placeholder="example@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-cyan-950" />
          </div>
          <div className="space-y-2">
            <label htmlFor="loginPassword" className="font-bold text-slate-700 dark:text-slate-200">Password</label>
            <input id="loginPassword" type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-cyan-950" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-2xl bg-cyan-700 px-6 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Login</button>
            <Link to="/register" className="rounded-2xl border border-cyan-600 px-6 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Create Account</Link>
          </div>
          <p className="rounded-2xl bg-white p-4 text-sm font-bold text-cyan-800 dark:bg-slate-900 dark:text-cyan-200">{message}</p>
        </form>
      </section>
    </main>
  );
}

export default Login;
