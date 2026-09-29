import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);

  const [activeModuleId, setActiveModuleId] = useState(course?.modules?.[0]?.id || null);
  const [completed, setCompleted] = useState({});
  const [indexOpen, setIndexOpen] = useState(true);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] dark:bg-[#090d16] flex items-center justify-center font-sans px-4">
        <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 sm:p-8 text-center max-w-sm w-full">
          <p className="font-display text-xl sm:text-2xl font-black">COURSE NOT FOUND</p>
          <Link to="/dashboard" className="inline-block mt-4 px-4 py-2 bg-[#f97316] border-2 border-black text-black text-sm font-bold shadow-brutal btn-tactile">← BACK</Link>
        </div>
      </div>
    );
  }

  const activeModule = course.modules.find(m => m.id === activeModuleId);
  const doneCount = Object.values(completed).filter(Boolean).length;
  const allDone = doneCount === course.modules.filter(m => m.type !== 'quiz').length;

  const handleTakeAssessment = () => navigate(`/assessment/${course.quizId}`);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 dark:bg-[#090d16] dark:text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">

        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link to="/dashboard" className="text-xs sm:text-sm font-bold text-[#38bdf8] hover:underline">← BACK TO DASHBOARD</Link>
            <h1 className="font-display text-xl sm:text-3xl font-black tracking-wide mt-1">{course.emoji} {course.title}</h1>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-slate-600 dark:text-[#38bdf8] font-bold mt-0.5">{course.level} • {course.duration} • {course.category}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal px-3.5 py-1.5 text-xs sm:text-sm font-bold shrink-0 self-start sm:self-auto">
            {doneCount}/{course.modules.filter(m => m.type !== 'quiz').length} MODULES ✓
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: content player */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal">
              <div className="border-b-2 border-black dark:border-[#38bdf8] px-4 sm:px-5 py-3 font-display text-base sm:text-lg font-bold tracking-wide">
                ▶ {activeModule?.title}
              </div>

              <div className="p-4 sm:p-5">
                {activeModule?.type === 'video' && (
                  <div className="aspect-video border-2 border-black dark:border-[#38bdf8]">
                    <iframe
                      className="w-full h-full"
                      src={activeModule.videoUrl}
                      title={activeModule.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {activeModule?.type === 'reading' && (
                  <div className="prose max-w-none">
                    <div className="bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] p-4 sm:p-6 text-sm sm:text-base leading-relaxed">
                      <span className="text-[#38bdf8] font-mono font-bold text-xs sm:text-sm block">$ cat notes.md</span>
                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm mt-3 text-slate-800 dark:text-slate-200">{activeModule.readingContent}</pre>
                    </div>
                  </div>
                )}

                {activeModule?.type === 'quiz' && (
                  <div className="text-center py-8 sm:py-10">
                    <p className="text-4xl sm:text-5xl">🎯</p>
                    <p className="font-display text-lg sm:text-xl font-bold mt-2">CAPSTONE ASSESSMENT</p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Validate your competence. 10-minute timed MCQ.</p>
                    <button onClick={handleTakeAssessment} className="mt-4 px-5 py-2.5 bg-[#f97316] border-2 border-black text-black font-display text-sm sm:text-base font-bold shadow-brutal btn-tactile">
                      TAKE ASSESSMENT →
                    </button>
                  </div>
                )}

                {activeModule && activeModule.type !== 'quiz' && (
                  <button
                    onClick={() => setCompleted(c => ({ ...c, [activeModule.id]: !c[activeModule.id] }))}
                    className={`mt-4 px-4 py-2 border-2 border-black text-xs sm:text-sm font-bold shadow-brutal btn-tactile ${completed[activeModule.id] ? 'bg-emerald-500 text-black' : 'bg-white dark:bg-slate-800 text-black dark:text-white'}`}
                  >
                    {completed[activeModule.id] ? '✓ MARKED COMPLETE' : 'MARK AS COMPLETE'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: collapsible module index */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal">
              <button
                onClick={() => setIndexOpen(o => !o)}
                className="w-full flex items-center justify-between border-b-2 border-black dark:border-[#38bdf8] px-4 sm:px-5 py-3 font-display text-sm sm:text-base font-bold tracking-wide"
              >
                <span>▸ MODULE INDEX</span>
                <span>{indexOpen ? '▼' : '▶'}</span>
              </button>

              {indexOpen && (
                <ul className="divide-y-2 divide-black dark:divide-[#38bdf8]">
                  {course.modules.map((m, i) => (
                    <li key={m.id}>
                      <button
                        onClick={() => setActiveModuleId(m.id)}
                        className={`w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 btn-tactile ${activeModuleId === m.id ? 'bg-[#38bdf8] text-black font-bold' : 'hover:bg-[#f7f9fb] dark:hover:bg-slate-800'}`}
                      >
                        <span className="text-xs">{m.type === 'video' ? '🎬' : m.type === 'reading' ? '📄' : '🎯'}</span>
                        <span className="flex-1 truncate">{m.title}</span>
                        {completed[m.id] && <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="p-4 sm:p-5 border-t-2 border-black dark:border-[#38bdf8] space-y-3">
                <button
                  onClick={handleTakeAssessment}
                  className="w-full px-4 py-2.5 bg-[#f97316] border-2 border-black text-black font-display text-sm sm:text-base font-bold shadow-brutal btn-tactile"
                >
                  TAKE ASSESSMENT →
                </button>
                {allDone && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center">✓ ALL MODULES COMPLETE</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
