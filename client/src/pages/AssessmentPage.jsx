import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockQuizzes } from '../data/mockQuizzes';
import { mockTrainee } from '../data/mockUsers';
import { mockCourses } from '../data/mockCourses';

const TOTAL_SECONDS = 600; // 10 minutes

export default function AssessmentPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = mockQuizzes.find(q => q.id === quizId);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Pre-score from the trainee's current competency for this quiz
  const comp = mockTrainee.competencies.find(c => c.quizId === quizId);
  const preScore = comp ? comp.current : 0;
  const course = comp ? mockCourses.find(c => c.id === comp.courseId) : null;

  // Countdown timer
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [timeLeft, submitted]);

  // Tab-switch / focus-loss detection (Page Visibility API)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && !submitted) {
        setTabSwitches(n => {
          const next = n + 1;
          if (next >= 3) {
            // auto-submit on 3rd violation
            handleSubmit();
          }
          return next;
        });
        setShowTabWarning(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
    // eslint-disable-next-line
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (!quiz) return;
    const correct = quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const post = Math.round((correct / quiz.questions.length) * 100);
    setScore({ correct, total: quiz.questions.length, post, pre: preScore, gain: post - preScore });
    setSubmitted(true);
  }, [quiz, answers, preScore]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] dark:bg-[#090d16] flex items-center justify-center font-sans">
        <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-8 text-center">
          <p className="font-vt text-2xl font-black">ASSESSMENT NOT FOUND</p>
          <Link to="/dashboard" className="inline-block mt-4 px-4 py-2 bg-[#f97316] border-2 border-black text-black font-vt font-bold shadow-brutal btn-tactile">← BACK</Link>
        </div>
      </div>
    );
  }

  const q = quiz.questions[current];
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const lowTime = timeLeft <= 60;

  const select = (opt) => setAnswers(a => ({ ...a, [q.id]: opt }));

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 dark:bg-[#090d16] dark:text-slate-100 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">

        {/* TEST HEADER */}
        <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-5 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-vt text-xs uppercase tracking-widest text-[#38bdf8] font-bold">ASSESSMENT // {quiz.id}</p>
              <h1 className="font-vt text-2xl font-black tracking-wide leading-tight">{quiz.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-2 border-2 border-black dark:border-[#38bdf8] font-vt text-xl font-black ${lowTime ? 'bg-red-500 text-white animate-pulse' : 'bg-[#f7f9fb] dark:bg-slate-800'}`}>
                ⏱ {mm}:{ss}
              </span>
              <span className="px-3 py-2 border-2 border-black dark:border-[#38bdf8] bg-[#f7f9fb] dark:bg-slate-800 font-vt text-xl font-black">
                {tabSwitches}/3 ⚠
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between font-vt text-sm font-bold mb-1">
              <span>QUESTION {current + 1} OF {quiz.questions.length}</span>
              <span>{Math.round(((current + 1) / quiz.questions.length) * 100)}%</span>
            </div>
            <div className="h-4 bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8]">
              <div className="h-full bg-[#38bdf8]" style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* MCQ CARD */}
        <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6">
          <p className="font-vt text-xl font-black mb-5">{current + 1}. {q.questionText}</p>
          <div className="space-y-3">
            {q.options.map(opt => {
              const selected = answers[q.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => select(opt)}
                  className={`w-full text-left px-4 py-3 border-2 border-black dark:border-[#38bdf8] font-vt text-lg font-bold btn-tactile flex items-center gap-3 ${selected ? 'bg-[#f97316] text-black' : 'bg-[#f7f9fb] dark:bg-slate-800 hover:bg-[#38bdf8] hover:text-black'}`}
                >
                  <span className={`w-5 h-5 border-2 border-black flex items-center justify-center ${selected ? 'bg-black' : 'bg-white dark:bg-slate-900'}`}>
                    {selected && <span className="w-2 h-2 bg-[#f97316]" />}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              disabled={current === 0}
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              className="px-5 py-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] text-black dark:text-white font-vt text-lg font-bold shadow-brutal btn-tactile disabled:opacity-40"
            >
              ← PREV
            </button>

            {current < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrent(c => c + 1)}
                className="px-5 py-2 bg-[#38bdf8] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile"
              >
                NEXT →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile"
              >
                SUBMIT ✓
              </button>
            )}
          </div>
        </div>

        <p className="font-vt text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
          ⚠ Leaving this tab triggers an integrity warning. 3 violations auto-submit your test.
        </p>
      </div>

      {/* TAB-SWITCH WARNING MODAL */}
      {showTabWarning && !submitted && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f97316] text-black border-2 border-black shadow-brutal max-w-sm w-full p-6 text-center">
            <p className="text-4xl">⚠️</p>
            <h2 className="font-vt text-2xl font-black mt-2">TAB SWITCH DETECTED</h2>
            <p className="font-vt text-base font-bold mt-2">
              You left the assessment tab. Violation {tabSwitches} of 3.
            </p>
            <p className="font-vt text-sm mt-1">A 3rd violation will auto-submit your test.</p>
            <button
              onClick={() => setShowTabWarning(false)}
              className="mt-5 px-5 py-2 bg-black text-white border-2 border-black font-vt text-lg font-bold shadow-brutal btn-tactile"
            >
              I UNDERSTAND
            </button>
          </div>
        </div>
      )}

      {/* SCORE MODAL */}
      {submitted && score && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-2 border-black dark:border-[#38bdf8] shadow-brutal max-w-md w-full p-7 text-center">
            <p className="text-5xl">{score.post >= 70 ? '🏆' : '📊'}</p>
            <h2 className="font-vt text-3xl font-black mt-2">ASSESSMENT COMPLETE</h2>
            <p className="font-vt text-sm uppercase tracking-widest text-[#38bdf8] font-bold mt-1">{quiz.title}</p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] p-3">
                <p className="font-vt text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Score</p>
                <p className="font-vt text-3xl font-black text-[#f97316]">{score.post}%</p>
                <p className="font-vt text-xs">{score.correct}/{score.total} correct</p>
              </div>
              <div className="bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] p-3">
                <p className="font-vt text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Pre-Test</p>
                <p className="font-vt text-3xl font-black">{score.pre}%</p>
              </div>
              <div className="bg-[#f7f9fb] dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] p-3">
                <p className="font-vt text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Gain</p>
                <p className={`font-vt text-3xl font-black ${score.gain >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {score.gain >= 0 ? '+' : ''}{score.gain}%
                </p>
              </div>
            </div>

            <p className="font-vt text-sm mt-4 text-slate-600 dark:text-slate-400">
              {score.gain > 0 ? `Competence improved by ${score.gain} points.` : 'No improvement yet — review and retry.'}
            </p>

            <div className="flex gap-3 mt-6">
              <Link to="/dashboard" className="flex-1 px-4 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile">
                DASHBOARD
              </Link>
              {course && (
                <Link to={`/course/${course.id}`} className="flex-1 px-4 py-2 bg-[#38bdf8] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile">
                  REVIEW COURSE
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
