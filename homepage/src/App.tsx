import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Features from './pages/Features';
import Download from './pages/Download';
import About from './pages/About';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#0F172A]">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/download" element={<Download />} />
          <Route path="/about" element={<About />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
