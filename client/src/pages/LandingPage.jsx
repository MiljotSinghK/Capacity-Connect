import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import capacityConnectLogo from '../assets/CapacityConnect.svg';

export default function LandingPage() {
  const navigate = useNavigate();

  // Filter state for skill tracks catalog
  const [activeCategory, setActiveCategory] = useState('all');

  // Interactive Simulator state in Hero section
  const [simCount, setSimCount] = useState(412);
  const [bar1Width, setBar1Width] = useState(62);
  const [currentMentorIdx, setCurrentMentorIdx] = useState(0);

  const mentorsList = [
    { name: "Dr. Bhrigav (Principal Security Architect)", score: "98.4%" },
    { name: "Prince Sharma (Senior Cloud Engineer)", score: "97.8%" },
    { name: "Miljot Singh (Distributed Systems Lead)", score: "90.2%" },
    { name: "Sejal Gupta (AI & MLOps Specialist)", score: "96.5%" }
  ];

  const handleRunHeroSimulation = () => {
    setSimCount(prev => prev + Math.floor(Math.random() * 15) + 3);
    setCurrentMentorIdx(prev => (prev + 1) % mentorsList.length);
    const newWidth = Math.floor(Math.random() * 20) + 60;
    setBar1Width(newWidth);
  };

  // Feature Showcase tab state
  const [activeFeatureTab, setActiveFeatureTab] = useState(1);

  // MCQ Engine Interactive State
  const [secondsLeft, setSecondsLeft] = useState(522);
  const [selectedOption, setSelectedOption] = useState(null);
  const [mcqFeedback, setMcqFeedback] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleMcqSelect = (optionIndex, isCorrect) => {
    setSelectedOption(optionIndex);
    if (isCorrect) {
      setMcqFeedback({
        isCorrect: true,
        text: "✓ CORRECT! IDOR / BOLA occurs when user-supplied input is used to access objects directly without authorization checks."
      });
    } else {
      setMcqFeedback({
        isCorrect: false,
        text: "✕ INCORRECT. Parameter manipulation of object references violates Authorization checks (BOLA - API1:2023)."
      });
    }
  };

  // Matchmaker Demo State
  const [matchmakerResult, setMatchmakerResult] = useState({
    loading: false,
    matched: true,
    name: "DR. BHRIGAV (MENTOR #104)",
    score: "99.1%",
    desc: "Principal Security Architect • Certified CKS / CISSP • 8+ Hackathon Mentoring Cohorts",
    slot: "✓ Available for 1-on-1 sprint review this Thursday"
  });

  const handleRunMatchmaker = () => {
    setMatchmakerResult(prev => ({ ...prev, loading: true }));
    setTimeout(() => {
      setMatchmakerResult({
        loading: false,
        matched: true,
        name: "SEJAL GUPTA (MENTOR #208)",
        score: "99.7%",
        desc: "Lead DevOps Specialist • Kubernetes CKA/CKAD certified • 6 cohorts graduated with 98% pre/post gain",
        slot: "✓ Cohort calendar slot matched: Friday 4:00 PM IST"
      });
    }, 450);
  };

  // Skill Heatmap State
  const [heatmapValues, setHeatmapValues] = useState({ b1: 92, b2: 74, b3: 58 });

  const handleRefreshHeatmap = () => {
    setHeatmapValues({
      b1: Math.floor(Math.random() * 15) + 85,
      b2: Math.floor(Math.random() * 20) + 70,
      b3: Math.floor(Math.random() * 25) + 55
    });
  };

  // Track & Syllabus Modal State
  const [modalTrack, setModalTrack] = useState(null);
  const [syllabusTrack, setSyllabusTrack] = useState(null);
  const [authAlert, setAuthAlert] = useState(null);

  const handleSimLogin = (role) => {
    setAuthAlert(`Simulating ${role} Sign In: Session created & redirecting to workspace portal...`);
    setTimeout(() => {
      if (role === 'Trainee') navigate('/dashboard');
      else if (role === 'Trainer') navigate('/trainer');
      else if (role === 'Admin') navigate('/admin');
      else navigate('/auth');
    }, 1200);
  };

  // Tracks data catalog
  const tracksData = [
    {
      id: 1,
      title: "OWASP Top 10 API Security & Pentesting",
      category: "cyber",
      badge: "ADVANCED • 4 WEEKS",
      rating: "★ 4.9 (320 ENROLLED)",
      desc: "Identify SQL injections, broken authentication, and implement rate limiting across modern REST and GraphQL APIs.",
      target: "85%",
      targetColor: "text-[#f97316]",
      barColor: "bg-[#f97316]",
      mentor: "Dr. Bhrigav"
    },
    {
      id: 2,
      title: "Kubernetes Orchestration & CI/CD Pipelines",
      category: "cloud",
      badge: "INTERMEDIATE • 6 WEEKS",
      rating: "★ 4.8 (415 ENROLLED)",
      desc: "Automate multi-stage docker deployments, secret injection, helm templating, and Prometheus cluster observability.",
      target: "90%",
      targetColor: "text-[#38bdf8]",
      barColor: "bg-[#38bdf8]",
      mentor: "Prince Sharma"
    },
    {
      id: 3,
      title: "Full-Stack React, Node.js & Microservices",
      category: "web",
      badge: "BEGINNER-INTERMEDIATE • 5 WEEKS",
      rating: "★ 5.0 (650 ENROLLED)",
      desc: "Build resilient, distributed web systems with JWT token rotation, Tailwind styling, and real-time WebSocket state.",
      target: "88%",
      targetColor: "text-emerald-600 dark:text-emerald-400",
      barColor: "bg-emerald-500",
      mentor: "Miljot Singh"
    },
    {
      id: 4,
      title: "LLM Fine-Tuning & Vector Embeddings (RAG)",
      category: "data",
      badge: "INTERMEDIATE • 4 WEEKS",
      rating: "★ 4.9 (280 ENROLLED)",
      desc: "Deploy local LLM inference engines, build Pinecone/Chroma semantic pipelines, and eliminate model hallucination.",
      target: "92%",
      targetColor: "text-purple-600 dark:text-purple-400",
      barColor: "bg-purple-500",
      mentor: "Sejal Gupta"
    },
    {
      id: 5,
      title: "Zero-Trust Cloud Architecture & IAM",
      category: "cloud",
      badge: "ADVANCED • 6 WEEKS",
      rating: "★ 4.9 (390 ENROLLED)",
      desc: "Design least-privilege IAM policies, encrypted storage enclaves, and automated terraform security guardrails.",
      target: "94%",
      targetColor: "text-[#38bdf8]",
      barColor: "bg-[#38bdf8]",
      mentor: "Raghav Mehrotra"
    },
    {
      id: 6,
      title: "GIGW 3.0 & Enterprise Compliance Audit",
      category: "cyber",
      badge: "INTERMEDIATE • 3 WEEKS",
      rating: "★ 4.7 (195 ENROLLED)",
      desc: "Master web content accessibility guidelines (WCAG 2.1 AA), government portal compliance, and vulnerability logs.",
      target: "90%",
      targetColor: "text-[#f97316]",
      barColor: "bg-[#f97316]",
      mentor: "Sakshi Jha"
    }
  ];

  const filteredTracks = activeCategory === 'all'
    ? tracksData
    : tracksData.filter(t => t.category === activeCategory);

  const scrollToTracks = () => {
    document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 dark:bg-[#090d16] dark:text-slate-100 font-sans">
      
      {/* TOP LIVE ANNOUNCEMENT MARQUEE BANNER */}
      <div className="bg-[#f97316] text-black font-vt text-lg font-bold border-b-2 border-black px-4 py-1.5 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          <span>⚡ LIVE COHORTS ENROLLING NOW: FULL-STACK, CLOUD &amp; CYBERSECURITY TRACKS</span>
          <span>• 10-MIN DIAGNOSTIC GAP ENGINE READY</span>
          <span>• MATCH WITH 450+ VERIFIED MENTORS</span>
          <span>• 100% CHEAT-PROOF VERIFIED CREDENTIALS</span>
          <span>• SMART INDIA HACKATHON 2026 [ID: SIH26075]</span>
          <span>⚡ LIVE COHORTS ENROLLING NOW: FULL-STACK, CLOUD &amp; CYBERSECURITY TRACKS</span>
          <span>• 10-MIN DIAGNOSTIC GAP ENGINE READY</span>
          <span>• MATCH WITH 450+ VERIFIED MENTORS</span>
          <span>• 100% CHEAT-PROOF VERIFIED CREDENTIALS</span>
          <span>• SMART INDIA HACKATHON 2026 [ID: SIH26075]</span>
        </div>
      </div>

      {/* HERO SECTION WITH RETRO NEUBRUTALIST ANIMATIONS & SIMULATOR */}
      <section className="relative retro-grid border-b-4 border-black py-12 lg:py-20 overflow-hidden">
        {/* Decorative Radar Badges */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#38bdf8]/20 border-2 border-dashed border-[#38bdf8] rounded-full animate-orbit pointer-events-none"></div>
        <div className="absolute bottom-12 left-10 hidden lg:block animate-float1 pointer-events-none z-10">
          <div className="bg-white dark:bg-slate-900 border-2 border-black p-3 shadow-brutal font-vt text-lg flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
            <span>LIVE GAP: Cloud Security (-32% in Tech Pod 4)</span>
          </div>
        </div>
        <div className="absolute top-16 right-8 hidden lg:block animate-float2 pointer-events-none z-10">
          <div className="bg-[#38bdf8] text-black border-2 border-black p-3 shadow-brutal font-vt text-lg font-bold">
            🛡️ GIGW 3.0 &amp; OWASP VERIFIED
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="w-full h-16 bg-gradient-to-b from-transparent via-[#38bdf8] to-transparent scanline-bar"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={capacityConnectLogo}
                  alt="Capacity Connect logo"
                  className="w-14 h-14 sm:w-20 sm:h-20 object-contain animate-logo shrink-0"
                />
                <div>
                  <p className="font-display text-2xl sm:text-4xl font-black tracking-wide text-black dark:text-white leading-none">
                    CAPACITY<span className="text-[#f97316]">CONNECT</span>
                  </p>
                  <p className="text-xs sm:text-sm tracking-[0.2em] text-slate-600 dark:text-[#38bdf8] font-bold mt-1">
                    BUILD. CONNECT. PROVE.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 border-2 border-black shadow-brutal text-xs sm:text-sm text-[#f97316] font-bold">
                <span className="animate-pulse">●</span> ADAPTIVE SKILLS &amp; MENTORSHIP ECOSYSTEM
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1] text-black dark:text-white break-words">
                ENGINEER REAL CAPABILITY.<br />
                <span className="text-[#38bdf8] bg-black px-2 py-0.5 inline-block -rotate-1 shadow-brutal mt-1.5 text-2xl sm:text-4xl lg:text-5xl">
                  MASTER IN-DEMAND SKILLS.
                </span><br />
                <span className="text-[#f97316] underline decoration-4 underline-offset-8 inline-block mt-1">
                  PROVE AUDIT-READY READINESS.
                </span>
              </h1>

              <p className="text-base sm:text-lg font-sans text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                Capacity Connect provides adaptive skill pathways, real-time diagnostic gap detection, and expert mentor matchmaking for fast-growing technical teams and learners.
              </p>

              {/* Working CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link
                  to="/auth"
                  className="px-6 py-3.5 bg-[#f97316] border-2 sm:border-4 border-black text-black font-display text-base sm:text-lg font-black shadow-brutal-lg btn-tactile flex items-center justify-center gap-2"
                >
                  <span>GET STARTED FREE</span>
                  <span className="text-lg">🚀</span>
                </Link>
                <button
                  type="button"
                  onClick={scrollToTracks}
                  className="px-5 py-3.5 bg-[#38bdf8] border-2 sm:border-4 border-black text-black font-display text-base sm:text-lg font-bold shadow-brutal-lg btn-tactile flex items-center justify-center gap-2"
                >
                  <span>EXPLORE LEARNING TRACKS</span>
                  <span>📚</span>
                </button>
              </div>

              {/* Quick Proof Points */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">✓</span> 10-Min Diagnostic Quizzes
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">✓</span> Tab-Visibility Anti-Cheating
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">✓</span> 450+ Verified Mentors
                </div>
              </div>
            </div>

            {/* Right Hero Visual: INTERACTIVE SIMULATOR */}
            <div className="lg:col-span-5 w-full">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#38bdf8] to-[#f97316] rounded-none blur opacity-40 animate-pulse"></div>
                
                <div className="relative bg-white dark:bg-slate-900 border-2 sm:border-4 border-black shadow-brutal-lg p-4 sm:p-5">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-3 h-3 bg-red-500 border border-black rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 border border-black rounded-full"></div>
                      <div className="w-3 h-3 bg-emerald-500 border border-black rounded-full"></div>
                      <span className="ml-1 font-mono font-bold uppercase tracking-wider text-black dark:text-white text-xs">
                        CAPACITY_DIAGNOSTIC.EXE
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-[#38bdf8] text-black text-[11px] font-bold border border-black">
                      SYS: ONLINE
                    </span>
                  </div>

                  {/* Telemetry Metrics */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm font-bold mb-1">
                        <span className="truncate pr-2">CYBERSECURITY &amp; OWASP API</span>
                        <span className="text-[#f97316] shrink-0">
                          GAP: {100 - bar1Width}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-5 border-2 border-black relative overflow-hidden">
                        <div
                          className="bg-[#f97316] h-full transition-all duration-500"
                          style={{ width: `${bar1Width}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-black">
                          {bar1Width}% BENCHMARK MET (+{100 - bar1Width}% GAP)
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs sm:text-sm font-bold mb-1">
                        <span className="truncate pr-2">CONTAINER &amp; KUBERNETES</span>
                        <span className="text-[#38bdf8] shrink-0">91% READY</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-5 border-2 border-black relative overflow-hidden">
                        <div className="bg-[#38bdf8] h-full" style={{ width: '91%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-black">
                          91% CERTIFIED PROFICIENT
                        </div>
                      </div>
                    </div>

                    {/* Interactive Matchmaker Simulation Box */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 border-2 border-black space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                          Automated Mentor Match
                        </span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-1 border border-black font-bold">
                          Tag-Based
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-black dark:text-white leading-tight">
                        Paired with <strong>{mentorsList[currentMentorIdx].name}</strong> • Match Score:{' '}
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {mentorsList[currentMentorIdx].score}
                        </span>
                      </p>
                      <button
                        onClick={handleRunHeroSimulation}
                        className="w-full py-2 bg-[#38bdf8] hover:bg-[#7bd0ff] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal btn-tactile cursor-pointer"
                      >
                        ⚡ RE-RUN REAL-TIME GAP SIMULATION
                      </button>
                    </div>

                    {/* Radar Scanner Display */}
                    <div className="relative h-20 bg-black border-2 border-black flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-[#38bdf8]/40"></div>
                        <div className="w-10 h-10 rounded-full border border-[#38bdf8]/40"></div>
                      </div>
                      <div className="absolute w-20 h-20 rounded-full border-t-2 border-r-2 border-[#38bdf8] animate-orbit"></div>
                      <div className="z-10 text-xs sm:text-sm text-[#38bdf8] font-mono tracking-wider text-center animate-pulse px-2">
                        [REAL-TIME LEARNER RADAR ACTIVE]<br />
                        <span className="text-[11px] text-white">
                          {simCount} LEARNERS ACTIVELY MONITORED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR SKILL TRACKS & CAPABILITIES (Course Catalog) */}
      <section className="py-16 sm:py-20 border-b-4 border-black bg-white dark:bg-[#0f172a]" id="tracks">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="px-3 py-1 bg-[#38bdf8] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal inline-block mb-3">
                VERIFIED LEARNING PATHWAYS
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-black dark:text-white">
                POPULAR SKILL TRACKS &amp; CERTIFICATIONS
              </h2>
            </div>
            <p className="font-sans text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md">
              Hands-on tracks with verified skill outcomes, timed diagnostic milestones, and mentor feedback.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 text-xs sm:text-sm font-bold">
            {[
              { id: 'all', label: 'ALL TRACKS (6)' },
              { id: 'cyber', label: 'CYBERSECURITY & OWASP' },
              { id: 'cloud', label: 'CLOUD & DEVOPS' },
              { id: 'web', label: 'FULL-STACK ARCHITECTURE' },
              { id: 'data', label: 'AI & DATA OPS' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 border-2 border-black shadow-brutal btn-tactile ${
                  activeCategory === tab.id
                    ? 'bg-black text-white'
                    : 'bg-white dark:bg-slate-800 text-black dark:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map(track => (
              <div
                key={track.id}
                className="bg-[#f7f9fb] dark:bg-slate-900 border-2 sm:border-4 border-black p-5 sm:p-6 shadow-brutal-lg card-hover-lift flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 text-xs font-bold border border-black">
                      {track.badge}
                    </span>
                    <span className="text-xs text-[#f97316] font-bold">
                      {track.rating}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
                    {track.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    {track.desc}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>BENCHMARK TARGET</span>
                      <span className={`font-bold ${track.targetColor}`}>{track.target} SCORE</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 border border-black">
                      <div className={`${track.barColor} h-full`} style={{ width: track.target }}></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="truncate">Lead Mentor: {track.mentor}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setModalTrack(track)}
                      className="flex-1 py-2 bg-[#38bdf8] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal btn-tactile"
                    >
                      START TRACK →
                    </button>
                    <button
                      onClick={() => setSyllabusTrack(track)}
                      className="px-3 py-2 bg-white dark:bg-slate-800 text-black dark:text-white text-xs sm:text-sm font-bold border-2 border-black shadow-brutal btn-tactile"
                    >
                      SYLLABUS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (User Journey: Practical 3 Steps) */}
      <section className="py-16 sm:py-20 border-b-4 border-black bg-[#f7f9fb] dark:bg-[#090d16] retro-grid" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-[#f97316] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal inline-block mb-3">
              SIMPLE &amp; RIGOROUS LEARNER EXPERIENCE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-black dark:text-white">
              HOW CAPACITY CONNECT WORKS FOR YOU
            </h2>
            <p className="font-sans text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base">
              No endless passive videos. A clean, three-step execution workflow to master competencies and get verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 border-2 sm:border-4 border-black p-5 sm:p-6 shadow-brutal-lg card-hover-lift relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 bg-[#38bdf8] text-black border-2 border-black shadow-brutal flex items-center justify-center font-display text-xl font-black">
                  01
                </div>
                <span className="text-xs bg-black text-white px-2 py-1 font-bold">10-MIN BASELINE</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
                Take 10-Min Diagnostic Assessment
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                Start with a fast, timed diagnostic MCQ exam protected by Tab-Switch Page Visibility detection. Immediately discover your exact skill gaps before spending a single minute studying.
              </p>
              <div className="p-3 bg-sky-50 dark:bg-slate-800 border-2 border-black text-xs sm:text-sm space-y-1">
                <div className="text-[#00668a] dark:text-[#38bdf8] font-bold">✓ Automatic Skill Baseline</div>
                <div className="text-slate-600 dark:text-slate-300">✓ Instant Heatmap Generation</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 border-2 sm:border-4 border-black p-5 sm:p-6 shadow-brutal-lg card-hover-lift relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 bg-[#f97316] text-black border-2 border-black shadow-brutal flex items-center justify-center font-display text-xl font-black">
                  02
                </div>
                <span className="text-xs bg-[#f97316] text-black px-2 py-1 font-bold border border-black">MICRO-LEARNING</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
                Learn via Micro-Modules &amp; 1-on-1 Mentors
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                Dive into bite-sized curated video lessons and hands-on lab exercises. Get automatically matched with certified mentors based on your specific gap tags for rapid code reviews.
              </p>
              <div className="p-3 bg-amber-50 dark:bg-slate-800 border-2 border-black text-xs sm:text-sm space-y-1">
                <div className="text-[#9d4300] dark:text-[#f97316] font-bold">✓ Tag-Matched Expert Mentors</div>
                <div className="text-slate-600 dark:text-slate-300">✓ Hands-On Code Sandboxes</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 border-2 sm:border-4 border-black p-5 sm:p-6 shadow-brutal-lg card-hover-lift relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 bg-emerald-400 text-black border-2 border-black shadow-brutal flex items-center justify-center font-display text-xl font-black">
                  03
                </div>
                <span className="text-xs bg-emerald-500 text-black px-2 py-1 font-bold border border-black">AUDIT PROOF</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
                Earn Verifiable Digital Credentials
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                Complete the post-learning assessment to calculate real pre/post skill gain. Receive cryptographic verifiable certificates ready for company audits, recruiters, and portfolios.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-slate-800 border-2 border-black text-xs sm:text-sm space-y-1">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Tamper-Proof Cryptographic ID</div>
                <div className="text-slate-600 dark:text-slate-300">✓ Real Skill Delta Calculations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE FEATURE SHOWCASE */}
      <section className="py-16 sm:py-20 border-b-4 border-black bg-white dark:bg-[#0f172a]" id="interactive-demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3 py-1 bg-[#38bdf8] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal inline-block mb-3">
              TEST RUN PLATFORM CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-black dark:text-white">
              LIVE INTERACTIVE FEATURE SHOWCASE
            </h2>
            <p className="font-sans text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base">
              Click through live working prototypes of our assessment engine, mentor matchmaker, and analytics heatmap.
            </p>
          </div>

          {/* Feature Showcase Widget */}
          <div className="max-w-5xl mx-auto border-2 sm:border-4 border-black bg-[#f7f9fb] dark:bg-slate-900 shadow-brutal-lg overflow-hidden">
            
            {/* Feature Tab Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-b-2 sm:border-b-4 border-black bg-black text-xs sm:text-sm font-bold">
              <button
                onClick={() => setActiveFeatureTab(1)}
                className={`p-3 sm:p-4 text-center border-b-2 sm:border-b-0 sm:border-r-2 border-black flex items-center justify-center gap-1.5 sm:gap-2 ${
                  activeFeatureTab === 1
                    ? 'bg-[#38bdf8] text-black font-black'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>📝</span> 1. DIAGNOSTIC MCQ ENGINE
              </button>
              <button
                onClick={() => setActiveFeatureTab(2)}
                className={`p-3 sm:p-4 text-center border-b-2 sm:border-b-0 sm:border-r-2 border-black flex items-center justify-center gap-1.5 sm:gap-2 ${
                  activeFeatureTab === 2
                    ? 'bg-[#38bdf8] text-black font-black'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>🤝</span> 2. TRAINER MATCHMAKER
              </button>
              <button
                onClick={() => setActiveFeatureTab(3)}
                className={`p-3 sm:p-4 text-center flex items-center justify-center gap-1.5 sm:gap-2 ${
                  activeFeatureTab === 3
                    ? 'bg-[#38bdf8] text-black font-black'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>📊</span> 3. LIVE SKILL HEATMAP
              </button>
            </div>

            {/* Panel 1: Diagnostic MCQ Engine Simulator */}
            {activeFeatureTab === 1 && (
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-black">
                  <div>
                    <div className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">Sample Diagnostic Question 03 of 10</div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-black dark:text-white">OWASP API Security &amp; Authorization Bypass</h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="px-2.5 py-1 bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-xs sm:text-sm font-bold border-2 border-black flex items-center gap-1.5">
                      <span>⏱️</span>
                      <span>{formatTimer(secondsLeft)}</span> REMAINING
                    </div>
                    <div className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border-2 border-black flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span>TAB LOCK: ACTIVE</span>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <strong>Prompt:</strong> A client requests <code>/api/v1/users/402/invoices</code> by substituting the URL parameter with <code>403</code> and receives full private invoices of another account. What vulnerability is actively present?
                </p>

                <div className="space-y-2.5 font-sans text-xs sm:text-sm">
                  {[
                    { text: "A) Unrestricted Resource Consumption (API4:2023)", isCorrect: false },
                    { text: "B) Broken Object Level Authorization (BOLA / IDOR - API1:2023)", isCorrect: true },
                    { text: "C) Server-Side Request Forgery (SSRF)", isCorrect: false },
                    { text: "D) Lack of Rate Limiting in Web API", isCorrect: false }
                  ].map((opt, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleMcqSelect(idx, opt.isCorrect)}
                      className={`p-3 border-2 border-black cursor-pointer shadow-brutal transition-all flex items-center ${
                        selectedOption === idx
                          ? opt.isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-600'
                            : 'bg-red-100 dark:bg-red-950 border-red-600'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mcq"
                        checked={selectedOption === idx}
                        onChange={() => {}}
                        className="mr-3 text-[#f97316]"
                      />
                      <span>{opt.text}</span>
                    </div>
                  ))}
                </div>

                {mcqFeedback && (
                  <div className={`p-3.5 border-2 border-black text-xs sm:text-sm font-semibold ${
                    mcqFeedback.isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200'
                      : 'bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-200'
                  }`}>
                    {mcqFeedback.text}
                  </div>
                )}
              </div>
            )}

            {/* Panel 2: Trainer Matchmaker Simulator */}
            {activeFeatureTab === 2 && (
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black">
                  <div>
                    <div className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">Algorithmic Pairing Engine</div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-black dark:text-white">Instant Mentor-Trainee Competency Match</h4>
                  </div>
                  <span className="px-2.5 py-1 bg-[#38bdf8] text-black text-xs font-bold border-2 border-black">
                    TAG HEURISTIC v2.4
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                  <div className="p-4 bg-white dark:bg-slate-800 border-2 border-black space-y-3 font-sans">
                    <div className="text-xs sm:text-sm font-bold text-black dark:text-white uppercase">DEFICIT CRITERIA INPUT</div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/60 border border-black">#KubernetesSecurity</span>
                      <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/60 border border-black">DevOps Cohort B</span>
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/60 border border-black">Current Gap: 42%</span>
                    </div>
                    <button
                      onClick={handleRunMatchmaker}
                      className="w-full py-2.5 bg-[#f97316] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal btn-tactile cursor-pointer"
                    >
                      🎯 RUN REAL-TIME MATCHER
                    </button>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-slate-800 border-2 border-black space-y-2">
                    {matchmakerResult.loading ? (
                      <div className="text-xs sm:text-sm font-bold text-[#f97316] animate-pulse py-4 text-center">
                        Running heuristic match against 450 mentors...
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase text-emerald-800 dark:text-emerald-300 font-bold">MATCH FOUND IN 0.03s</span>
                          <span className="text-[11px] bg-black text-white px-2 py-0.5 font-mono">{matchmakerResult.score} MATCH</span>
                        </div>
                        <div className="font-display text-base sm:text-lg font-black text-black dark:text-white">{matchmakerResult.name}</div>
                        <div className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                          {matchmakerResult.desc}
                        </div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                          {matchmakerResult.slot}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Panel 3: Live Skill Heatmap Telemetry */}
            {activeFeatureTab === 3 && (
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black">
                  <div>
                    <div className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">Institutional Telemetry</div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-black dark:text-white">Real-Time Team Skill Heatmap &amp; Readiness</h4>
                  </div>
                  <button
                    onClick={handleRefreshHeatmap}
                    className="px-3 py-1 bg-white dark:bg-slate-800 border-2 border-black text-xs font-bold hover:bg-slate-100 btn-tactile cursor-pointer"
                  >
                    🔄 REFRESH METRICS
                  </button>
                </div>

                <div className="space-y-3 font-sans">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm font-bold mb-1">
                      <span>FRONTEND &amp; ACCESSIBILITY (GIGW 3.0)</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{heatmapValues.b1}% PROFICIENT</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-5 border-2 border-black">
                      <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${heatmapValues.b1}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs sm:text-sm font-bold mb-1">
                      <span>MICROSERVICES &amp; EVENT STREAMING</span>
                      <span className="text-[#38bdf8]">{heatmapValues.b2}% ON TRACK</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-5 border-2 border-black">
                      <div className="bg-[#38bdf8] h-full transition-all duration-500" style={{ width: `${heatmapValues.b2}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs sm:text-sm font-bold mb-1">
                      <span>API THREAT MODELING &amp; PEN TESTING</span>
                      <span className="text-[#f97316]">{heatmapValues.b3}% ({100 - heatmapValues.b3}% GAP)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-5 border-2 border-black">
                      <div className="bg-[#f97316] h-full transition-all duration-500" style={{ width: `${heatmapValues.b3}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ROLE-BASED ACCESS GATEWAYS */}
      <section className="py-16 sm:py-20 border-b-4 border-black bg-[#f7f9fb] dark:bg-[#090d16] retro-grid" id="roles">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-[#38bdf8] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal inline-block mb-3">
              PERSONALIZED WORKSPACES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-black dark:text-white">
              TAILORED EXPERIENCES FOR EVERY USER
            </h2>
            <p className="font-sans text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base">
              Whether you are a developer mastering a new track, an expert instructor mentoring batches, or a manager tracking readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Trainee Gateway */}
            <div className="border-2 sm:border-4 border-black bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-brutal-lg flex flex-col justify-between card-hover-lift">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl sm:text-4xl">👨‍🎓</span>
                  <span className="text-xs bg-[#38bdf8] text-black px-2 py-1 border border-black font-bold">
                    LEARNER GATEWAY
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black dark:text-white">TRAINEE PORTAL</h3>
                <p className="text-xs sm:text-sm text-[#f97316] font-bold mb-4">"Learn. Practice. Prove."</p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-sans mb-6">
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Personalized Dashboard:</strong> Live gap analysis</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Modular Video Player:</strong> Interactive syllabus</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Assessment Engine:</strong> 10-min timed MCQs</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Tab-Switch Lock:</strong> Protected exam mode</li>
                </ul>
              </div>
              <button
                onClick={() => handleSimLogin('Trainee')}
                className="w-full py-3 bg-[#38bdf8] text-black font-display text-sm sm:text-base font-bold border-2 border-black shadow-brutal btn-tactile cursor-pointer"
              >
                START YOUR TRACK →
              </button>
            </div>

            {/* Trainer Gateway */}
            <div className="border-2 sm:border-4 border-black bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-brutal-lg flex flex-col justify-between card-hover-lift">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl sm:text-4xl">👨‍🏫</span>
                  <span className="text-xs bg-[#f97316] text-black px-2 py-1 border border-black font-bold">
                    MENTOR STUDIO
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black dark:text-white">TRAINER STUDIO</h3>
                <p className="text-xs sm:text-sm text-[#38bdf8] font-bold mb-4">"Teach. Assess. Mentor."</p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-sans mb-6">
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Curriculum Studio:</strong> Author modular tracks</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>MCQ Builder:</strong> Custom tests &amp; answer keys</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Learner Rosters:</strong> Score percentiles</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Instant Matching:</strong> Deficit cohort pairing</li>
                </ul>
              </div>
              <button
                onClick={() => handleSimLogin('Trainer')}
                className="w-full py-3 bg-[#f97316] text-black font-display text-sm sm:text-base font-bold border-2 border-black shadow-brutal btn-tactile cursor-pointer"
              >
                AUTHOR &amp; MENTOR →
              </button>
            </div>

            {/* Admin Gateway */}
            <div className="border-2 sm:border-4 border-black bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-brutal-lg flex flex-col justify-between card-hover-lift">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl sm:text-4xl">🛡️</span>
                  <span className="text-xs bg-black text-white px-2 py-1 border border-black font-bold">
                    ORGANIZATION SUITE
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black dark:text-white">ORG ANALYTICS</h3>
                <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold mb-4">"Govern. Verify. Certify."</p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-sans mb-6">
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Department Heatmaps:</strong> Visual gap breakdown</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Trainer Allocation:</strong> Algorithmic staffing</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>GIGW 3.0 Compliance:</strong> Accessibility audit</li>
                  <li className="flex items-center gap-2"><span>▸</span> <strong>Evidence Export:</strong> Audit-ready proof logs</li>
                </ul>
              </div>
              <button
                onClick={() => handleSimLogin('Admin')}
                className="w-full py-3 bg-white dark:bg-slate-800 text-black dark:text-white font-display text-sm sm:text-base font-bold border-2 border-black dark:border-[#38bdf8] shadow-brutal btn-tactile cursor-pointer"
              >
                ORG ANALYTICS →
              </button>
            </div>
          </div>

          {/* Live Mock Auth Alert Box */}
          {authAlert && (
            <div className="mt-8 p-4 bg-emerald-100 dark:bg-emerald-950 border-2 sm:border-4 border-black shadow-brutal text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-2xl">🔑</span>
                <span>{authAlert}</span>
              </div>
              <button
                onClick={() => setAuthAlert(null)}
                className="px-3 py-1 bg-black text-white text-xs font-bold border border-black cursor-pointer shrink-0"
              >
                DISMISS
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PLATFORM STATS & METRICS */}
      <section className="py-12 sm:py-14 bg-[#38bdf8] border-b-4 border-black text-black" id="metrics">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-4 bg-white border-2 sm:border-4 border-black shadow-brutal">
              <div className="font-display text-3xl sm:text-5xl font-black">94%</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-1">Course Completion</div>
            </div>
            <div className="p-4 bg-white border-2 sm:border-4 border-black shadow-brutal">
              <div className="font-display text-3xl sm:text-5xl font-black text-[#f97316]">10 MIN</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-1">Skill Diagnostic</div>
            </div>
            <div className="p-4 bg-white border-2 sm:border-4 border-black shadow-brutal">
              <div className="font-display text-3xl sm:text-5xl font-black">100%</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-1">Tab-Switch Deterrence</div>
            </div>
            <div className="p-4 bg-white border-2 sm:border-4 border-black shadow-brutal">
              <div className="font-display text-3xl sm:text-5xl font-black text-[#f97316]">450+</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-1">Verified Mentors</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & TRUST PROOF */}
      <section className="py-16 sm:py-20 border-b-4 border-black bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 bg-[#f97316] text-black text-xs sm:text-sm font-bold border-2 border-black shadow-brutal inline-block mb-3">
              TESTIMONIALS &amp; VALIDATION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-black dark:text-white">
              TRUSTED BY ENGINEERS &amp; TEAM LEADS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f7f9fb] dark:bg-slate-900 border-2 sm:border-4 border-black p-5 sm:p-6 shadow-brutal font-sans">
              <div className="flex items-center gap-1 text-[#f97316] text-lg mb-3">
                ★★★★★
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                "The diagnostic MCQ immediately showed our team where API security holes were slipping through. In two weeks, 40 engineers hit 90%+ readiness scores."
              </p>
              <div className="pt-3 border-t-2 border-black/10 dark:border-white/10">
                <div className="font-display text-sm sm:text-base font-black text-black dark:text-white">RAJESH VERMA</div>
                <div className="text-xs text-[#38bdf8] font-bold">DIRECTOR OF DIGITAL SKILLING, NIC</div>
              </div>
            </div>

            <div className="bg-[#f7f9fb] dark:bg-slate-900 border-2 sm:border-4 border-black p-5 sm:p-6 shadow-brutal font-sans">
              <div className="flex items-center gap-1 text-[#f97316] text-lg mb-3">
                ★★★★★
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                "The 10-minute MCQ timer combined with tab-switch detection eliminated bogus quiz scores. The automatic pre- vs post-gain metric provides real proof of training ROI."
              </p>
              <div className="pt-3 border-t-2 border-black/10 dark:border-white/10">
                <div className="font-display text-sm sm:text-base font-black text-black dark:text-white">DR. ANANYA SEN</div>
                <div className="text-xs text-[#f97316] font-bold">HEAD OF TALENT DEVELOPMENT</div>
              </div>
            </div>

            <div className="bg-[#f7f9fb] dark:bg-slate-900 border-2 sm:border-4 border-black p-5 sm:p-6 shadow-brutal font-sans">
              <div className="flex items-center gap-1 text-[#f97316] text-lg mb-3">
                ★★★★★
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                "The tag-based matchmaker matched our certified cloud architects directly to underperforming DevOps batches in under 3 minutes. Truly transformative for hackathons."
              </p>
              <div className="pt-3 border-t-2 border-black/10 dark:border-white/10">
                <div className="font-display text-sm sm:text-base font-black text-black dark:text-white">VIKRAM MALHOTRA</div>
                <div className="text-xs text-[#38bdf8] font-bold">SENIOR TECHNICAL ADVISOR, SIH</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK ENROLLMENT / DETAILS MODAL */}
      {modalTrack && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border-2 sm:border-4 border-black shadow-brutal-lg max-w-lg w-full p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <h3 className="font-display text-xl sm:text-2xl font-black text-black dark:text-white">{modalTrack.title}</h3>
              <button
                onClick={() => setModalTrack(null)}
                className="w-7 h-7 bg-[#f97316] text-black text-lg font-bold border-2 border-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between"><span className="text-slate-500">CATEGORY:</span> <span className="font-bold uppercase">{modalTrack.category}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">ESTIMATED DURATION:</span> <span className="font-bold">{modalTrack.badge.split('•')[1] || '4 Weeks'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">PASS BENCHMARK:</span> <span className="font-bold text-[#f97316]">{modalTrack.target}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">LEAD MENTOR:</span> <span className="font-bold text-[#38bdf8]">{modalTrack.mentor}</span></div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Ready to start your diagnostic assessment? Your baseline score will immediately populate your personal learning path.
            </p>
            <div className="pt-3 flex gap-3">
              <button
                onClick={() => {
                  setModalTrack(null);
                  handleSimLogin('Trainee');
                }}
                className="flex-1 py-2.5 bg-[#38bdf8] text-black font-display text-sm sm:text-base font-bold border-2 border-black shadow-brutal btn-tactile cursor-pointer"
              >
                LAUNCH DIAGNOSTIC ⚡
              </button>
              <button
                onClick={() => setModalTrack(null)}
                className="px-4 py-2.5 bg-white dark:bg-slate-800 text-black dark:text-white text-xs sm:text-sm font-bold border-2 border-black shadow-brutal btn-tactile cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SYLLABUS MODAL */}
      {syllabusTrack && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border-2 sm:border-4 border-black shadow-brutal-lg max-w-lg w-full p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <h3 className="font-display text-xl sm:text-2xl font-black text-black dark:text-white">SYLLABUS PREVIEW</h3>
              <button
                onClick={() => setSyllabusTrack(null)}
                className="w-7 h-7 bg-[#f97316] text-black text-lg font-bold border-2 border-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="font-display text-lg text-[#38bdf8] font-bold">{syllabusTrack.title}</div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
              <li>• <strong>Module 1:</strong> Baseline Diagnostic Assessment &amp; Setup</li>
              <li>• <strong>Module 2:</strong> Core Architectural Patterns &amp; Threat Modeling</li>
              <li>• <strong>Module 3:</strong> Hands-On Laboratory Sandboxes &amp; Live Code Drills</li>
              <li>• <strong>Module 4:</strong> 1-on-1 Mentor Sprint Review with {syllabusTrack.mentor}</li>
              <li>• <strong>Module 5:</strong> Post-Test Milestone &amp; Digital Verification</li>
            </ul>
            <div className="pt-3">
              <button
                onClick={() => setSyllabusTrack(null)}
                className="w-full py-2.5 bg-[#f97316] text-black font-display text-sm sm:text-base font-bold border-2 border-black shadow-brutal btn-tactile cursor-pointer"
              >
                CLOSE PREVIEW
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

