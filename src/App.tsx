import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import Home from './pages/Home/page';
import Dashboard from './pages/Dashboard/page';
import Scanner from './pages/Scanner/page';
import Analytics from './pages/Analytics/page';
import History from './pages/History/page';
import Login from './pages/Login/page';
import Signup from './pages/Signup/page';
import Cart from './pages/Cart/page';
import Reviews from './pages/Reviews/page';
import About from './pages/About/page';
import Profile from './pages/Profile/page';
import Theme from './pages/Theme/page';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-50 via-white to-blue-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 dark:text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
