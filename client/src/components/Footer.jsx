import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
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
    <footer className="bg-black text-white border-t-4 border-black py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b-2 border-white/20">
          {/* Brand & Hackathon Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#38bdf8] text-black border-2 border-white shadow-brutal flex items-center justify-center font-vt text-2xl font-black">
                CC
              </div>
              <span className="font-vt text-3xl font-black tracking-wider">
                CAPACITY CONNECT
              </span>
            </div>
            <p className="text-slate-400 font-sans text-sm max-w-md leading-relaxed">
              Smart India Hackathon 2026. Problem Statement ID: <strong>SIH26075</strong> (Smart Education). Engineered with React, Tailwind CSS, and verified skill telemetry.
            </p>
            <div className="font-vt text-lg text-[#38bdf8]">
              TEAM INNOVATEX: Miljot • Prince • Sakshi • Sejal • Bhrigav • Raghav
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-vt text-2xl text-[#f97316] font-bold mb-3">NAVIGATION</h4>
            <ul className="space-y-1.5 font-vt text-lg text-slate-300">
              <li><a onClick={(event) => handleSectionLink(event, 'tracks')} className="hover:text-[#38bdf8]" href="#tracks">• Explore Learning Tracks</a></li>
              <li><a onClick={(event) => handleSectionLink(event, 'how-it-works')} className="hover:text-[#38bdf8]" href="#how-it-works">• How It Works</a></li>
              <li><a onClick={(event) => handleSectionLink(event, 'interactive-demo')} className="hover:text-[#38bdf8]" href="#interactive-demo">• Interactive Demo</a></li>
              <li><a onClick={(event) => handleSectionLink(event, 'roles')} className="hover:text-[#38bdf8]" href="#roles">• Role Access Gateways</a></li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="font-vt text-2xl text-[#38bdf8] font-bold mb-3">COMPLIANCE</h4>
            <ul className="space-y-1.5 font-vt text-lg text-slate-300">
              <li>• GIGW 3.0 Accessible</li>
              <li>• OWASP Top 10 Aligned</li>
              <li>• HTML5 Page Visibility API</li>
              <li>• Single Branch Main Workflow</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between font-vt text-lg text-slate-400">
          <div>
            © 2026 CAPACITY CONNECT | TEAM INNOVATEX | SIH26075
          </div>
          <div className="flex items-center gap-4 mt-3 sm:mt-0 text-[#38bdf8]">
            <span>VERIFIED ON-CHAIN CREDENTIALS</span>
            <span>•</span>
            <span>PALETTE: SKY BLUE / ORANGE / JET BLACK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

