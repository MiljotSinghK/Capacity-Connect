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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">

        {/* PROFILE HEADER */}
        <section className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#38bdf8] border-2 border-black flex items-center justify-center font-vt text-3xl font-black">
                {t.name.charAt(0)}
              </div>
              <div>
                <h1 className="font-vt text-3xl sm:text-4xl font-black tracking-wide leading-none">{t.name}</h1>
                <p className="font-vt text-sm tracking-widest uppercase text-slate-600 dark:text-[#38bdf8] font-bold mt-1">
                  {t.role} // {t.department}
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="font-vt text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Readiness Score</p>
              <p className="font-vt text-5xl font-black text-[#f97316] leading-none">{t.readinessScore}%</p>
              <button
                onClick={() => setCertOpen(o => !o)}
                className="mt-3 px-4 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile"
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
                  <p className="font-vt text-lg font-black">{c.title}</p>
                  <p className="font-vt text-sm text-slate-600 dark:text-slate-400">{c.issuer} • {c.date}</p>
                  <p className="font-vt text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{c.score}%</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* COMPETENCY PROFILE */}
        <section>
          <h2 className="font-vt text-3xl font-black tracking-wider mb-4">▸ COMPETENCY PROFILE</h2>
          <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 space-y-5">
            {t.competencies.map(c => {
              const pct = Math.min(100, Math.round((c.current / c.benchmark) * 100));
              return (
                <div key={c.skill}>
                  <div className="flex items-center justify-between font-vt text-lg font-bold mb-1">
                    <span>{c.skill}</span>
                    <span className={c.accent}>{c.current}% / <span className="text-slate-500 dark:text-slate-400">{c.benchmark}% target</span></span>
                  </div>
                  <div className="h-5 bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] relative overflow-hidden">
                    <div className={`h-full ${c.color} transition-all`} style={{ width: `${c.current}%` }} />
                    <div className="absolute top-0 bottom-0 border-l-4 border-black dark:border-white" style={{ left: `${c.benchmark}%` }} title="target benchmark" />
                  </div>
                  <p className="font-vt text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {pct >= 100 ? "✓ At target" : `Gap to target: ${c.benchmark - c.current}%`}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTINUE LEARNING */}
        <section>
          <h2 className="font-vt text-3xl font-black tracking-wider mb-4">▸ CONTINUE LEARNING</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {enrolled.map(c => (
              <div key={c.id} className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal card-hover-lift overflow-hidden flex flex-col">
                <div className={`${c.color} border-b-2 border-black dark:border-[#38bdf8] px-5 py-6 flex items-center gap-3`}>
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="font-vt text-sm font-bold text-black tracking-widest uppercase">{c.level} • {c.duration}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-vt text-xl font-black leading-tight">{c.title}</h3>
                  <p className="font-vt text-sm text-slate-600 dark:text-slate-400 mt-1">{c.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between font-vt text-sm font-bold mb-1">
                      <span>PROGRESS</span><span>{c.progress}%</span>
                    </div>
                    <div className="h-4 bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8]">
                      <div className={`h-full ${c.color}`} style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <Link
                    to={`/course/${c.id}`}
                    className="mt-5 text-center px-4 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile"
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
          <h2 className="font-vt text-3xl font-black tracking-wider mb-4">▸ RECOMMENDED FOR YOU <span className="text-[#38bdf8] text-base">[gap-detected]</span></h2>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x">
            {recommended.map(c => {
              const g = gaps.find(x => x.courseId === c.id);
              return (
                <div key={c.id} className="min-w-[280px] snap-start bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal card-hover-lift flex flex-col">
                  <div className={`${c.color} border-b-2 border-black dark:border-[#38bdf8] px-4 py-5 flex items-center gap-2`}>
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="font-vt text-xs font-bold text-black tracking-widest uppercase">GAP {g?.gap}%</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-vt text-lg font-black leading-tight">{c.title}</h3>
                    <p className="font-vt text-xs text-slate-600 dark:text-slate-400 mt-1 flex-1">{c.description}</p>
                    <Link
                      to={`/course/${c.id}`}
                      className="mt-4 text-center px-3 py-2 bg-[#38bdf8] border-2 border-black text-black font-vt text-base font-bold shadow-brutal btn-tactile"
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
