import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionLink = (event, sectionId) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    const scrollToSection = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scrollToSection, 0);
      return;
    }

    scrollToSection();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff]/95 dark:bg-[#0f172a]/95 backdrop-blur border-b-4 border-black px-4 sm:px-6 lg:px-8 py-3 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link className="flex items-center gap-2.5 sm:gap-3 group shrink-0" to="/">
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#38bdf8] border-2 border-black shadow-brutal flex items-center justify-center font-display text-lg sm:text-xl font-black transition-transform group-hover:rotate-6 shrink-0">
            CC_
          </div>
          <div>
            <span className="font-display text-lg sm:text-2xl font-black tracking-wide block leading-none text-black dark:text-white">
              CAPACITY<span className="text-[#f97316]">CONNECT</span>
            </span>
            <span className="font-sans text-[10px] sm:text-xs tracking-wider sm:tracking-widest text-slate-600 dark:text-[#38bdf8] uppercase font-bold block mt-0.5">
              SIH26075 // INNOVATEX
            </span>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-slate-800 dark:text-slate-200">
          <a onClick={(event) => handleSectionLink(event, 'tracks')} className="px-2 py-1 hover:text-[#f97316] transition-colors whitespace-nowrap" href="#tracks">
            Explore Tracks
          </a>
          <a onClick={(event) => handleSectionLink(event, 'how-it-works')} className="px-2 py-1 hover:text-[#f97316] transition-colors whitespace-nowrap" href="#how-it-works">
            How It Works
          </a>
          <a onClick={(event) => handleSectionLink(event, 'interactive-demo')} className="px-2 py-1 hover:text-[#f97316] transition-colors whitespace-nowrap" href="#interactive-demo">
            Interactive Demo
          </a>
          <a onClick={(event) => handleSectionLink(event, 'roles')} className="px-2 py-1 hover:text-[#f97316] transition-colors whitespace-nowrap" href="#roles">
            Role Gateways
          </a>
          <a onClick={(event) => handleSectionLink(event, 'metrics')} className="px-2 py-1 hover:text-[#f97316] transition-colors whitespace-nowrap" href="#metrics">
            Metrics
          </a>
        </nav>

        {/* Action Buttons + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          <Link
            to="/auth"
            className="hidden sm:inline-flex px-3.5 py-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] text-black dark:text-white text-xs sm:text-sm font-bold shadow-brutal btn-tactile whitespace-nowrap"
          >
            SIGN IN
          </Link>
          <Link
            to="/auth"
            className="px-3 sm:px-4 py-2 bg-[#f97316] border-2 border-black text-black text-xs sm:text-sm font-bold shadow-brutal btn-tactile flex items-center gap-1 whitespace-nowrap"
          >
            <span>GET STARTED</span>
            <span className="hidden xs:inline text-xs">→</span>
          </Link>
          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 bg-white dark:bg-slate-800 border-2 border-black dark:border-white shadow-brutal flex items-center justify-center text-black dark:text-white font-bold text-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t-2 border-black dark:border-slate-700 bg-white dark:bg-[#0f172a] rounded shadow-lg p-4 space-y-3">
          <a onClick={(event) => handleSectionLink(event, 'tracks')} className="block py-2 text-base font-bold text-slate-900 dark:text-slate-100 hover:text-[#f97316] border-b border-slate-200 dark:border-slate-800" href="#tracks">
            Explore Tracks
          </a>
          <a onClick={(event) => handleSectionLink(event, 'how-it-works')} className="block py-2 text-base font-bold text-slate-900 dark:text-slate-100 hover:text-[#f97316] border-b border-slate-200 dark:border-slate-800" href="#how-it-works">
            How It Works
          </a>
          <a onClick={(event) => handleSectionLink(event, 'interactive-demo')} className="block py-2 text-base font-bold text-slate-900 dark:text-slate-100 hover:text-[#f97316] border-b border-slate-200 dark:border-slate-800" href="#interactive-demo">
            Interactive Demo
          </a>
          <a onClick={(event) => handleSectionLink(event, 'roles')} className="block py-2 text-base font-bold text-slate-900 dark:text-slate-100 hover:text-[#f97316] border-b border-slate-200 dark:border-slate-800" href="#roles">
            Role Gateways
          </a>
          <a onClick={(event) => handleSectionLink(event, 'metrics')} className="block py-2 text-base font-bold text-slate-900 dark:text-slate-100 hover:text-[#f97316]" href="#metrics">
            Metrics
          </a>
          <div className="pt-2 flex gap-2">
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center bg-white dark:bg-slate-800 border-2 border-black text-black dark:text-white font-bold text-sm shadow-brutal"
            >
              SIGN IN
            </Link>
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center bg-[#f97316] border-2 border-black text-black font-bold text-sm shadow-brutal"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

