import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';


// --- MOCK ROSTER DATA ---
const initialRoster = [
  {
    id: "trn-01",
    name: "Sakshi",
    empId: "EMP-4102",
    department: "Engineering Pod 4",
    courseId: "c101",
    courseTitle: "Fullstack Web Engineering & Cloud Architecture",
    completionPct: 78,
    avgQuizScore: 88,
    certStatus: "CERTIFIED",
    lastActive: "2 hours ago",
    avatar: "S"
  },
  {
    id: "trn-02",
    name: "Raghav",
    empId: "EMP-3921",
    department: "Cyber Defense Team",
    courseId: "c102",
    courseTitle: "OWASP Top 10 API Security & Pentesting",
    completionPct: 92,
    avgQuizScore: 94,
    certStatus: "CERTIFIED",
    lastActive: "Yesterday",
    avatar: "R"
  },
  {
    id: "trn-03",
    name: "Miljot",
    empId: "EMP-5088",
    department: "Operations & DevOps",
    courseId: "c103",
    courseTitle: "Kubernetes Orchestration & CI/CD Pipelines",
    completionPct: 45,
    avgQuizScore: 68,
    certStatus: "IN_PROGRESS",
    lastActive: "3 days ago",
    avatar: "M"
  },
  {
    id: "trn-04",
    name: "Prince",
    empId: "EMP-2104",
    department: "Data Intelligence Hub",
    courseId: "c104",
    courseTitle: "LLM Fine-Tuning & Vector Embeddings (RAG)",
    completionPct: 30,
    avgQuizScore: 55,
    certStatus: "NEEDS_ATTENTION",
    lastActive: "5 days ago",
    avatar: "P"
  },
  {
    id: "trn-05",
    name: "Sejal",
    empId: "EMP-4890",
    department: "Finance & Treasury Tech",
    courseId: "c101",
    courseTitle: "Fullstack Web Engineering & Cloud Architecture",
    completionPct: 62,
    avgQuizScore: 82,
    certStatus: "IN_PROGRESS",
    lastActive: "Today",
    avatar: "S"
  }
];

// ============================================================================
// COMPONENT 1: CourseForm
// ============================================================================
export function CourseForm({ onSaveCourse, openQuizBuilder, draftQuizQuestions }) {
  const [title, setTitle] = useState('');
  const [skillTag, setSkillTag] = useState('React & Web');
  const [category, setCategory] = useState('Software Development');
  const [level, setLevel] = useState('INTERMEDIATE');
  const [duration, setDuration] = useState('4 WEEKS');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [readingNotes, setReadingNotes] = useState('');
  const [previewVideo, setPreviewVideo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a Course Title.");
      return;
    }

    const newCourse = {
      id: `c${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      category,
      skillTag,
      level,
      duration,
      progress: 0,
      targetBenchmark: 85,
      quizId: `q_${Date.now()}`,
      emoji: category === 'Cybersecurity' ? '🛡️' : category === 'Cloud' ? '☸️' : category === 'Data / AI' ? '🧠' : '⚛️',
      color: category === 'Cybersecurity' ? 'bg-[#f97316]' : category === 'Cloud' ? 'bg-[#38bdf8]' : category === 'Data / AI' ? 'bg-purple-500' : 'bg-emerald-500',
      description: description.trim() || 'Comprehensive course designed to build competency.',
      videoUrl: videoUrl.trim() || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      quizQuestions: draftQuizQuestions,
      modules: [
        {
          id: "m1",
          title: `Module 1: Introduction to ${title}`,
          type: "video",
          videoUrl: videoUrl.trim() || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
          id: "m2",
          title: "Module 2: Core Concepts & Practice",
          type: "reading",
          readingContent: readingNotes.trim() || "Read through the standard technical guidelines and apply best practices."
        },
        {
          id: "m3",
          title: "Module 3: Capstone Assessment",
          type: "quiz"
        }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSaveCourse(newCourse);

    // Reset Form
    setTitle('');
    setDescription('');
    setReadingNotes('');
    setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
    setPreviewVideo(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 space-y-6">
      <div className="border-b-2 border-black/10 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl text-[#f97316]">add_box</span>
          <h3 className="font-vt text-2xl font-black tracking-wide text-black dark:text-white">
            AUTHOR NEW COMPETENCY COURSE
          </h3>
        </div>
        <p className="font-vt text-sm text-slate-600 dark:text-slate-400 mt-1">
          Draft structured modules, embed verified video lectures, and bind competency benchmarks
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 font-vt">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Course Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Distributed Cloud Architecture & Zero-Trust Networks"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          />
        </div>

        {/* Competency Tag & Category & Level */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Competency Tag
            </label>
            <select
              value={skillTag}
              onChange={(e) => setSkillTag(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 text-sm focus:outline-none"
            >
              <option value="React & Web">React & Web</option>
              <option value="Cloud Security">Cloud Security</option>
              <option value="Kubernetes">Kubernetes</option>
              <option value="LLM & RAG">LLM & RAG</option>
              <option value="DevSecOps">DevSecOps</option>
              <option value="Data Architecture">Data Architecture</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 text-sm focus:outline-none"
            >
              <option value="Software Development">Software Development</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Cloud">Cloud</option>
              <option value="Data / AI">Data / AI</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Difficulty & Duration
            </label>
            <div className="flex gap-2">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-1/2 px-2 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 text-sm focus:outline-none"
              >
                <option value="BEGINNER">BEGINNER</option>
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="ADVANCED">ADVANCED</option>
              </select>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-1/2 px-2 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 text-sm focus:outline-none"
              >
                <option value="2 WEEKS">2 WEEKS</option>
                <option value="4 WEEKS">4 WEEKS</option>
                <option value="6 WEEKS">6 WEEKS</option>
                <option value="8 WEEKS">8 WEEKS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Course Description
          </label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize course goals, prerequisite competencies, and intended enterprise outcomes..."
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          />
        </div>

        {/* YouTube Embed Link */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              YouTube Embed Link (Video Lecture)
            </label>
            <button
              type="button"
              onClick={() => setPreviewVideo(v => !v)}
              className="text-xs text-[#38bdf8] hover:text-[#f97316] font-bold underline"
            >
              {previewVideo ? "Hide Video Preview" : "Show Video Preview"}
            </button>
          </div>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          />
          {previewVideo && (
            <div className="mt-3 border-2 border-black aspect-video max-w-lg overflow-hidden shadow-brutal">
              <iframe
                title="Video Preview"
                src={videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Reading Notes */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Module Reading Notes & Syllabus Text
          </label>
          <textarea
            rows="4"
            value={readingNotes}
            onChange={(e) => setReadingNotes(e.target.value)}
            placeholder="Provide technical reference notes, architectural diagrams notes, and documentation for trainees to read..."
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          />
        </div>

        {/* Quiz Builder Trigger Bar */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-black dark:border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-[#38bdf8]">quiz</span>
              <span className="font-vt text-lg font-black text-black dark:text-white">
                Capstone MCQ Assessment
              </span>
            </div>
            <p className="font-vt text-xs text-slate-600 dark:text-slate-400">
              {draftQuizQuestions.length > 0
                ? `${draftQuizQuestions.length} questions attached to this course.`
                : "No assessment authored yet. Add questions to evaluate competencies."}
            </p>
          </div>
          <button
            type="button"
            onClick={openQuizBuilder}
            className="px-4 py-2 bg-[#38bdf8] hover:bg-[#0284c7] border-2 border-black text-black font-vt text-base font-bold shadow-brutal btn-tactile flex items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span>{draftQuizQuestions.length > 0 ? `EDIT QUIZ (${draftQuizQuestions.length})` : "AUTHOR QUIZ"}</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] border-2 border-black text-black font-vt text-xl font-bold shadow-brutal btn-tactile flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">publish</span>
            <span>PUBLISH COURSE TO ENTERPRISE CATALOG</span>
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// COMPONENT 2: QuizBuilderModal
// ============================================================================
export function QuizBuilderModal({ isOpen, onClose, onSaveQuestions, existingQuestions }) {
  const [questions, setQuestions] = useState(existingQuestions || []);
  const [qTitle, setQTitle] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    setQuestions(existingQuestions || []);
  }, [existingQuestions]);

  if (!isOpen) return null;

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!qTitle.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      alert("Please fill in Question title and all 4 options.");
      return;
    }

    const newQ = {
      id: `q_${Date.now()}`,
      title: qTitle.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctAnswer: parseInt(correctIdx, 10),
      explanation: explanation.trim() || "Competency verification assessment question."
    };

    setQuestions(prev => [...prev, newQ]);

    // Clear question form
    setQTitle('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectIdx(0);
    setExplanation('');
  };

  const handleRemoveQuestion = (idx) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleDone = () => {
    onSaveQuestions(questions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border-4 border-black dark:border-[#38bdf8] shadow-brutal-lg max-w-3xl w-full p-6 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-black/20 dark:border-white/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#38bdf8]">quiz</span>
            <h3 className="font-vt text-2xl sm:text-3xl font-black text-black dark:text-white">
              QUIZ AUTHORING STUDIO
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-black bg-rose-400 font-vt font-bold flex items-center justify-center hover:bg-rose-500"
          >
            ✕
          </button>
        </div>

        {/* Existing Authored Questions List */}
        {questions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-vt text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
              Authored Questions ({questions.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800 border border-black/40 dark:border-white/30 flex items-start justify-between gap-3"
                >
                  <div className="font-vt">
                    <p className="text-base font-bold text-black dark:text-white">
                      {idx + 1}. {q.title}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      ✓ Correct: Option {String.fromCharCode(65 + q.correctAnswer)} ({q.options[q.correctAnswer]})
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(idx)}
                    className="text-xs font-vt text-rose-600 hover:underline shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Question Form */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-2 border-black dark:border-slate-700 space-y-4 font-vt">
          <h4 className="text-base font-black uppercase tracking-wide text-black dark:text-white flex items-center gap-1.5">
            <span className="material-symbols-outlined text-lg text-[#f97316]">add_circle</span>
            <span>Add MCQ Item</span>
          </h4>

          <div>
            <label className="block text-xs uppercase font-bold text-slate-600 dark:text-slate-400 mb-1">
              Question Title *
            </label>
            <input
              type="text"
              value={qTitle}
              onChange={(e) => setQTitle(e.target.value)}
              placeholder="e.g. Which HTTP response code must an API gateway return when rate limit is exceeded?"
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-slate-600 dark:text-slate-400">
              Answer Options & Radio Selector for Correct Answer *
            </label>
            {[
              { label: 'Option A', val: optA, set: setOptA, idx: 0 },
              { label: 'Option B', val: optB, set: setOptB, idx: 1 },
              { label: 'Option C', val: optC, set: setOptC, idx: 2 },
              { label: 'Option D', val: optD, set: setOptD, idx: 3 }
            ].map(opt => (
              <div key={opt.idx} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctOpt"
                  id={`radio_${opt.idx}`}
                  checked={correctIdx === opt.idx}
                  onChange={() => setCorrectIdx(opt.idx)}
                  className="w-4 h-4 text-[#f97316] border-2 border-black"
                />
                <span className="w-6 font-bold text-sm">{String.fromCharCode(65 + opt.idx)}:</span>
                <input
                  type="text"
                  value={opt.val}
                  onChange={(e) => opt.set(e.target.value)}
                  placeholder={`Enter ${opt.label} text`}
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-xs focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-slate-600 dark:text-slate-400 mb-1">
              Technical Explanation / Rationale
            </label>
            <input
              type="text"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="e.g. HTTP 429 Too Many Requests indicates rate-limiting per RFC 6585."
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-xs focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-[#38bdf8] border-2 border-black text-black font-vt text-sm font-bold shadow-brutal btn-tactile"
          >
            + ADD THIS QUESTION TO DRAFT
          </button>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-black/10 dark:border-white/10 font-vt">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 border-2 border-black text-black dark:text-white font-bold"
          >
            CANCEL
          </button>
          <button
            onClick={handleDone}
            className="px-6 py-2 bg-[#f97316] border-2 border-black text-black font-bold shadow-brutal btn-tactile"
          >
            SAVE & ATTACH QUIZ ({questions.length} QUESTIONS)
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 3: LearnerRosterTable
// ============================================================================
export function LearnerRosterTable({ roster, onNudgeLearner }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = roster.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search trainee name, department, or course..."
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-white/40 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          />
        </div>
        <span className="font-vt text-sm font-bold text-slate-600 dark:text-slate-400">
          Showing {filtered.length} of {roster.length} Enrolled Learners
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal overflow-x-auto">
        <table className="w-full text-left border-collapse font-vt">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 border-b-2 border-black dark:border-white/20 text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200">
              <th className="p-4">Trainee / Identification</th>
              <th className="p-4">Assigned Course</th>
              <th className="p-4">Completion %</th>
              <th className="p-4">Avg Quiz Score</th>
              <th className="p-4">Cert Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(learner => {
              let certBadge = "bg-emerald-100 border-emerald-700 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300";
              if (learner.certStatus === "IN_PROGRESS") {
                certBadge = "bg-amber-100 border-amber-700 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300";
              } else if (learner.certStatus === "NEEDS_ATTENTION") {
                certBadge = "bg-rose-100 border-rose-700 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300";
              }

              return (
                <tr
                  key={learner.id}
                  className="border-b-2 border-black/10 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 border-2 border-black bg-[#38bdf8] text-black font-bold flex items-center justify-center text-lg">
                        {learner.avatar}
                      </div>
                      <div>
                        <div className="text-base font-black text-black dark:text-white leading-tight">
                          {learner.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {learner.empId} • {learner.department}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-sm font-bold text-slate-800 dark:text-slate-200 max-w-xs truncate">
                    {learner.courseTitle}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-3 bg-slate-200 dark:bg-slate-700 border border-black overflow-hidden">
                        <div
                          className="h-full bg-[#f97316]"
                          style={{ width: `${learner.completionPct}%` }}
                        />
                      </div>
                      <span className="font-bold text-sm">{learner.completionPct}%</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`text-base font-black ${
                      learner.avgQuizScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                      learner.avgQuizScore >= 60 ? 'text-amber-500' : 'text-rose-600'
                    }`}>
                      {learner.avgQuizScore}%
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 border text-xs font-bold ${certBadge}`}>
                      {learner.certStatus.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => onNudgeLearner(learner)}
                      className="px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 border-2 border-black text-black dark:text-white text-xs font-bold shadow-sm btn-tactile"
                    >
                      Nudge Trainee
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN EXPORT: TrainerStudio
// ============================================================================
export default function TrainerStudio() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [roster, setRoster] = useState(initialRoster);
  const [activeTab, setActiveTab] = useState('COURSES'); // 'COURSES' | 'CREATOR' | 'ROSTER'
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [draftQuizQuestions, setDraftQuizQuestions] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize from mockCourses + localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('capacity_connect_trainer_courses');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCourses([...mockCourses, ...parsed]);
      } else {
        setCourses(mockCourses);
      }
    } catch {
      setCourses(mockCourses);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save new course
  const handleSaveCourse = (newCourse) => {
    try {
      const currentStored = JSON.parse(localStorage.getItem('capacity_connect_trainer_courses') || '[]');
      const updatedStored = [newCourse, ...currentStored];
      localStorage.setItem('capacity_connect_trainer_courses', JSON.stringify(updatedStored));
      setCourses(prev => [newCourse, ...prev]);
      setDraftQuizQuestions([]);
      showToast(`Course "${newCourse.title}" successfully published!`);
      setActiveTab('COURSES');
    } catch {
      setCourses(prev => [newCourse, ...prev]);
      showToast(`Course "${newCourse.title}" published to current session.`);
      setActiveTab('COURSES');
    }
  };

  const handleNudge = (learner) => {
    showToast(`Nudge notification dispatched to ${learner.name} (${learner.empId})`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 dark:bg-[#090d16] dark:text-slate-100 font-sans pb-16">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#38bdf8] border-2 border-black shadow-brutal p-4 max-w-md animate-bounce">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-black font-bold">verified</span>
            <p className="font-vt text-lg font-bold text-black">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* QUIZ BUILDER MODAL */}
      <QuizBuilderModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        existingQuestions={draftQuizQuestions}
        onSaveQuestions={(qs) => {
          setDraftQuizQuestions(qs);
          showToast(`${qs.length} quiz questions configured for draft course.`);
        }}
      />

      {/* TOP HEADER */}
      <section className="bg-white dark:bg-slate-900 border-b-4 border-black px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#38bdf8] text-black font-vt text-xs font-black uppercase border border-black">
                PAIR 3 // SEJAL & BHRIGAV
              </span>
              <span className="font-vt text-xs tracking-widest text-[#f97316] uppercase font-bold">
                TRAINER STUDIO & PEDAGOGY HUB
              </span>
            </div>
            <h1 className="font-vt text-3xl sm:text-5xl font-black tracking-wide leading-none mt-2">
              TRAINER COMMAND & CURRICULUM STUDIO
            </h1>
            <p className="font-vt text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
              Author Competency Tracks • Build Multi-Stage MCQs • Track Workforce Mastery
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin"
              className="px-4 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-lg">monitoring</span>
              <span>ADMIN ANALYTICS</span>
            </Link>
            <Link
              to="/auth"
              className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] text-black dark:text-white font-vt text-lg font-bold shadow-brutal btn-tactile flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span>SIGN OUT</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* TRAINER STATS BANNER */}
        <section className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-vt">
            <div>
              <span className="text-xs uppercase text-slate-500 font-bold block">Authored Tracks</span>
              <span className="text-3xl sm:text-4xl font-black text-black dark:text-white">{courses.length}</span>
              <span className="text-xs text-slate-500 block">Catalog Content</span>
            </div>
            <div>
              <span className="text-xs uppercase text-slate-500 font-bold block">Enrolled Trainees</span>
              <span className="text-3xl sm:text-4xl font-black text-[#38bdf8]">248</span>
              <span className="text-xs text-slate-500 block">Across 6 Units</span>
            </div>
            <div>
              <span className="text-xs uppercase text-slate-500 font-bold block">Cohort Pass Rate</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">88.4%</span>
              <span className="text-xs text-slate-500 block">MCQ Benchmark</span>
            </div>
            <div>
              <span className="text-xs uppercase text-slate-500 font-bold block">Certificates Awarded</span>
              <span className="text-3xl sm:text-4xl font-black text-[#f97316]">194</span>
              <span className="text-xs text-slate-500 block">GIGW Verified</span>
            </div>
          </div>
        </section>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap items-center gap-3 border-b-2 border-black dark:border-white/20 pb-2 font-vt text-lg">
          <button
            onClick={() => setActiveTab('COURSES')}
            className={`px-5 py-2 border-2 border-black font-bold transition-all ${
              activeTab === 'COURSES'
                ? 'bg-[#38bdf8] text-black shadow-brutal'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            [ 01 // MY AUTHORED COURSES ({courses.length}) ]
          </button>
          <button
            onClick={() => setActiveTab('CREATOR')}
            className={`px-5 py-2 border-2 border-black font-bold transition-all ${
              activeTab === 'CREATOR'
                ? 'bg-[#f97316] text-black shadow-brutal'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            [ 02 // COURSE CREATOR & QUIZ BUILDER ]
          </button>
          <button
            onClick={() => setActiveTab('ROSTER')}
            className={`px-5 py-2 border-2 border-black font-bold transition-all ${
              activeTab === 'ROSTER'
                ? 'bg-emerald-400 text-black shadow-brutal'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            [ 03 // TRAINEE PERFORMANCE ROSTER ({roster.length}) ]
          </button>
        </div>

        {/* TAB 1: TRAINER CONTENT LIST */}
        {activeTab === 'COURSES' && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-vt text-2xl sm:text-3xl font-black tracking-wider">
                  AUTHORED COURSE INVENTORY
                </h2>
                <p className="font-vt text-sm text-slate-600 dark:text-slate-400">
                  Select "Preview Course as Student" to verify trainee player experience
                </p>
              </div>
              <button
                onClick={() => setActiveTab('CREATOR')}
                className="px-4 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-base font-bold shadow-brutal btn-tactile inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                <span>CREATE NEW COURSE</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal overflow-x-auto">
              <table className="w-full text-left border-collapse font-vt">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 border-b-2 border-black dark:border-white/20 text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    <th className="p-4">Course Info & Level</th>
                    <th className="p-4">Competency Tag</th>
                    <th className="p-4">Modules Attached</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Student Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr
                      key={course.id}
                      className="border-b-2 border-black/10 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{course.emoji || '⚛️'}</span>
                          <div>
                            <div className="text-lg font-black text-black dark:text-white leading-tight">
                              {course.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {course.category} • <span className="font-mono">{course.duration}</span> • {course.level}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 border border-black bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                          {course.skillTag}
                        </span>
                      </td>

                      <td className="p-4 text-sm font-mono">
                        {course.modules?.length || 3} Modules (Video + Reading + MCQ)
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-emerald-700 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                          ● ACTIVE / LIVE
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="px-4 py-1.5 bg-[#38bdf8] hover:bg-[#0284c7] border-2 border-black text-black text-sm font-bold shadow-brutal btn-tactile inline-flex items-center gap-1"
                        >
                          <span>Preview Course as Student</span>
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: COURSE CREATOR FORM */}
        {activeTab === 'CREATOR' && (
          <section className="space-y-4">
            <CourseForm
              onSaveCourse={handleSaveCourse}
              openQuizBuilder={() => setQuizModalOpen(true)}
              draftQuizQuestions={draftQuizQuestions}
            />
          </section>
        )}

        {/* TAB 3: TRAINEE PERFORMANCE ROSTER */}
        {activeTab === 'ROSTER' && (
          <section className="space-y-4">
            <div>
              <h2 className="font-vt text-2xl sm:text-3xl font-black tracking-wider">
                TRAINEE COMPETENCY & COMPLETION ROSTER
              </h2>
              <p className="font-vt text-sm text-slate-600 dark:text-slate-400">
                Live monitoring of student progress, automated quiz scores, and certification triggers
              </p>
            </div>
            <LearnerRosterTable roster={roster} onNudgeLearner={handleNudge} />
          </section>
        )}

        {/* FOOTER BAR */}
        <section className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-vt">
          <div>
            <p className="text-lg font-black text-black dark:text-white">
              Trainer Studio // Microlearning & Assessment Engine
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-persisted to Local Storage • Verified for SIH2026 Smart Education Standards
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 border-2 border-black bg-slate-100 hover:bg-slate-200 text-black font-bold shadow-brutal btn-tactile"
            >
              ← RETURN HOME
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

