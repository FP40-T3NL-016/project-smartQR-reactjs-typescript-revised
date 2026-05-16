import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadUsers, saveUsers, setCurrentUser } from '../../utils/smartQR';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('Your demo account will be saved locally in this browser.');

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalName = name.trim();
    const finalEmail = email.trim().toLowerCase();

    if (!finalName || !finalEmail || !password || !confirmPassword) {
      setMessage('Please complete all fields.');
      return;
    }

    if (password.length < 4) {
      setMessage('Password should contain at least 4 characters for this demo.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Password and confirm password do not match.');
      return;
    }

    const users = loadUsers();
    const existingUser = users.find((user) => user.email === finalEmail);

    if (existingUser) {
      setMessage('This email is already registered. Please login instead.');
      return;
    }

    const newUser = { name: finalName, email: finalEmail, password, role: 'Student User' };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    setMessage('Account created successfully. Redirecting to dashboard...');
    window.setTimeout(() => navigate('/dashboard'), 900);
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 lg:px-10">
      <section className="grid gap-8 rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900 lg:grid-cols-2 lg:p-10">
        <div className="space-y-5">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-extrabold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">New User Page</span>
          <h1 className="text-4xl font-black text-slate-950 dark:text-white">Register / Sign Up</h1>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">This page allows a new user to create a simple account for the SmartQR Analyzer project. It is suitable for a front-end Web Systems and Technology assignment.</p>
          <ul className="space-y-3 text-slate-700 dark:text-slate-200">
            <li className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">Collects full name, email and password.</li>
            <li className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">Validates that both password fields match.</li>
            <li className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">Saves demo account data in browser localStorage.</li>
          </ul>
        </div>

        <form onSubmit={handleRegister} className="space-y-5 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Create Account</h2>
          <div className="space-y-2">
            <label htmlFor="registerName" className="font-bold text-slate-700 dark:text-slate-200">Full Name</label>
            <input id="registerName" type="text" placeholder="Enter full name" value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-cyan-950" />
          </div>
          <div className="space-y-2">
            <label htmlFor="registerEmail" className="font-bold text-slate-700 dark:text-slate-200">Email Address</label>
            <input id="registerEmail" type="email" placeholder="example@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-cyan-950" />
          </div>
          <div className="space-y-2">
            <label htmlFor="registerPassword" className="font-bold text-slate-700 dark:text-slate-200">Password</label>
            <input id="registerPassword" type="password" placeholder="Create password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-cyan-950" />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="font-bold text-slate-700 dark:text-slate-200">Confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required className="w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-cyan-950" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-2xl bg-cyan-700 px-6 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Register</button>
            <Link to="/login" className="rounded-2xl border border-cyan-600 px-6 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Already Registered?</Link>
          </div>
          <p className="rounded-2xl bg-white p-4 text-sm font-bold text-cyan-800 dark:bg-slate-900 dark:text-cyan-200">{message}</p>
        </form>
      </section>
    </main>
  );
}

export default Register;
