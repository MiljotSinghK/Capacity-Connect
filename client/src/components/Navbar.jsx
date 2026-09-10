import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionLink = (event, sectionId) => {
    event.preventDefault();
    const scrollToSection = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scrollToSection, 0);
      return;
    }

    scrollToSection();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff]/95 dark:bg-[#0f172a]/95 backdrop-blur border-b-4 border-black px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link className="flex items-center gap-3 group" to="/">
          <div className="w-11 h-11 bg-[#38bdf8] border-2 border-black shadow-brutal flex items-center justify-center font-vt text-2xl font-black transition-transform group-hover:rotate-6">
            CC_
          </div>
          <div>
            <span className="font-vt text-2xl sm:text-3xl font-black tracking-wider block leading-none text-black dark:text-white">
              CAPACITY<span className="text-[#f97316]">CONNECT</span>
            </span>
            <span className="font-vt text-xs tracking-widest text-slate-600 dark:text-[#38bdf8] uppercase font-bold">
              SIH26075 // INNOVATEX
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-vt text-xl text-black dark:text-white">
          <a onClick={(event) => handleSectionLink(event, 'tracks')} className="px-2 py-1 hover:text-[#f97316] hover:underline decoration-2 underline-offset-4" href="#tracks">
            Explore Tracks
          </a>
          <a onClick={(event) => handleSectionLink(event, 'how-it-works')} className="px-2 py-1 hover:text-[#f97316] hover:underline decoration-2 underline-offset-4" href="#how-it-works">
            How It Works
          </a>
          <a onClick={(event) => handleSectionLink(event, 'interactive-demo')} className="px-2 py-1 hover:text-[#f97316] hover:underline decoration-2 underline-offset-4" href="#interactive-demo">
            Interactive Demo
          </a>
          <a onClick={(event) => handleSectionLink(event, 'roles')} className="px-2 py-1 hover:text-[#f97316] hover:underline decoration-2 underline-offset-4" href="#roles">
            Role Gateways
          </a>
          <a onClick={(event) => handleSectionLink(event, 'metrics')} className="px-2 py-1 hover:text-[#f97316] hover:underline decoration-2 underline-offset-4" href="#metrics">
            Metrics
          </a>
        </nav>

        {/* Action Buttons + Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/auth"
            className="hidden sm:inline-flex px-4 py-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] text-black dark:text-white font-vt text-xl font-bold shadow-brutal btn-tactile"
          >
            SIGN IN
          </Link>
          <Link
            to="/auth"
            className="px-5 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-xl font-bold shadow-brutal btn-tactile flex items-center gap-1"
          >
            <span>GET STARTED FREE</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

