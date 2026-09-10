import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('cc_theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('cc_theme', 'dark'); } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('cc_theme', 'light'); } catch {}
    }
  }, [isDark]);

  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setIsDark(!isDark)}
      className="w-10 h-10 bg-white dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] shadow-brutal dark:shadow-brutal-dark flex items-center justify-center text-xl font-bold cursor-pointer btn-tactile"
      title="Toggle Light/Dark Mode"
    >
      <span>{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}