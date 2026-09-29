import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockTrainee } from '../data/mockUsers';
import { mockCourses } from '../data/mockCourses';

export default function TraineeDashboard() {
  const [certOpen, setCertOpen] = useState(false);
  const t = mockTrainee;

  const enrolled = mockCourses.filter(c => t.enrollments.includes(c.id));

  // Mock gap detection: competencies NOT yet enrolled, ranked by gap (benchmark - current)
  const enrolledSkills = new Set(enrolled.map(c => c.skillTag));
  const gaps = t.competencies
    .filter(c => !enrolledSkills.has(c.skill))
    .map(c => ({ ...c, gap: c.benchmark - c.current }))
    .sort((a, b) => b.gap - a.gap);
  const recommended = gaps.map(g => mockCourses.find(c => c.id === g.courseId)).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 dark:bg-[#090d16] dark:text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">

        {/* PROFILE HEADER */}
        <section className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#38bdf8] border-2 border-black flex items-center justify-center font-display text-2xl sm:text-3xl font-black shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-black tracking-wide leading-none">{t.name}</h1>
                <p className="text-xs sm:text-sm tracking-wider uppercase text-slate-600 dark:text-[#38bdf8] font-bold mt-1">
                  {t.role} // {t.department}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Readiness Score</p>
              <p className="font-display text-3xl sm:text-4xl font-black text-[#f97316] leading-none mt-0.5">{t.readinessScore}%</p>
              <button
                onClick={() => setCertOpen(o => !o)}
                className="mt-2.5 px-3.5 py-1.5 bg-[#f97316] border-2 border-black text-black text-xs sm:text-sm font-bold shadow-brutal btn-tactile"
              >
                🏅 CERTIFICATIONS ({t.certifications.length})
              </button>
            </div>
          </div>

          {/* Certification drawer */}
          {certOpen && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4 border-t-2 border-black dark:border-[#38bdf8] pt-6">
              {t.certifications.map(c => (
                <div key={c.id} className="bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] p-4 card-hover-lift">
                  <p className="font-display text-base font-bold">{c.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{c.issuer} • {c.date}</p>
                  <p className="font-display text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{c.score}%</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* COMPETENCY PROFILE */}
        <section>
          <h2 className="font-display text-xl sm:text-2xl font-black tracking-wide mb-4">▸ COMPETENCY PROFILE</h2>
          <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-5 sm:p-6 space-y-4 sm:space-y-5">
            {t.competencies.map(c => {
              const pct = Math.min(100, Math.round((c.current / c.benchmark) * 100));
              return (
                <div key={c.skill}>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1">
                    <span>{c.skill}</span>
                    <span className={c.accent}>{c.current}% / <span className="text-slate-500 dark:text-slate-400">{c.benchmark}% target</span></span>
                  </div>
                  <div className="h-4 sm:h-5 bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] relative overflow-hidden">
                    <div className={`h-full ${c.color} transition-all`} style={{ width: `${c.current}%` }} />
                    <div className="absolute top-0 bottom-0 border-l-4 border-black dark:border-white" style={{ left: `${c.benchmark}%` }} title="target benchmark" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {pct >= 100 ? "✓ At target" : `Gap to target: ${c.benchmark - c.current}%`}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTINUE LEARNING */}
        <section>
          <h2 className="font-display text-xl sm:text-2xl font-black tracking-wide mb-4">▸ CONTINUE LEARNING</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {enrolled.map(c => (
              <div key={c.id} className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal card-hover-lift overflow-hidden flex flex-col">
                <div className={`${c.color} border-b-2 border-black dark:border-[#38bdf8] px-4 py-4 sm:py-5 flex items-center gap-3`}>
                  <span className="text-2xl sm:text-3xl">{c.emoji}</span>
                  <span className="text-xs font-bold text-black tracking-wider uppercase">{c.level} • {c.duration}</span>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-display text-base sm:text-lg font-bold leading-snug">{c.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{c.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>PROGRESS</span><span>{c.progress}%</span>
                    </div>
                    <div className="h-3.5 bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8]">
                      <div className={`h-full ${c.color}`} style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <Link
                    to={`/course/${c.id}`}
                    className="mt-4 text-center px-4 py-2 bg-[#f97316] border-2 border-black text-black text-xs sm:text-sm font-bold shadow-brutal btn-tactile"
                  >
                    RESUME →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDED FOR YOU */}
        <section>
          <h2 className="font-display text-xl sm:text-2xl font-black tracking-wide mb-4">▸ RECOMMENDED FOR YOU <span className="text-[#38bdf8] text-sm sm:text-base font-normal">[gap-detected]</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map(c => {
              const g = gaps.find(x => x.courseId === c.id);
              return (
                <div key={c.id} className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal card-hover-lift flex flex-col">
                  <div className={`${c.color} border-b-2 border-black dark:border-[#38bdf8] px-4 py-4 flex items-center gap-2`}>
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="text-xs font-bold text-black tracking-wider uppercase">GAP {g?.gap}%</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-display text-base font-bold leading-snug">{c.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex-1">{c.description}</p>
                    <Link
                      to={`/course/${c.id}`}
                      className="mt-4 text-center px-3 py-2 bg-[#38bdf8] border-2 border-black text-black text-xs sm:text-sm font-bold shadow-brutal btn-tactile"
                    >
                      ENROLL →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
