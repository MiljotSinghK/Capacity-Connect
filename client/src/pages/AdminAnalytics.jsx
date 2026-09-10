import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';


// --- MOCK ORGANIZATIONAL ANALYTICS DATA ---
const initialDepartmentData = [
  {
    id: "dep-it",
    name: "IT & Systems Engineering",
    code: "DEPT-01",
    head: "Suresh",
    employeeCount: 340,
    proficiency: 88,
    benchmark: 85,
    status: "Proficient",
    criticalGaps: 0,
    competencies: [
      { name: "Fullstack Architecture", score: 92, target: 85, courseId: "c101" },
      { name: "DevOps & CI/CD", score: 86, target: 85, courseId: "c103" },
      { name: "Cloud Infrastructure", score: 87, target: 85, courseId: "c103" }
    ]
  },
  {
    id: "dep-ops",
    name: "Operations & Infrastructure",
    code: "DEPT-02",
    head: "Pooja",
    employeeCount: 290,
    proficiency: 42,
    benchmark: 80,
    status: "Critical",
    criticalGaps: 3,
    competencies: [
      { name: "Kubernetes Orchestration", score: 38, target: 85, courseId: "c103" },
      { name: "Container Security", score: 41, target: 80, courseId: "c102" },
      { name: "Site Reliability (SRE)", score: 47, target: 80, courseId: "c103" }
    ]
  },
  {
    id: "dep-fin",
    name: "Finance & Treasury Tech",
    code: "DEPT-03",
    head: "Rajesh",
    employeeCount: 215,
    proficiency: 61,
    benchmark: 80,
    status: "Moderate",
    criticalGaps: 1,
    competencies: [
      { name: "API Security & Audit", score: 55, target: 85, courseId: "c102" },
      { name: "FinTech Compliance (DoPT)", score: 68, target: 80, courseId: "c101" },
      { name: "Data Encryption Standards", score: 60, target: 75, courseId: "c102" }
    ]
  },
  {
    id: "dep-sec",
    name: "Cyber Defense & Risk Management",
    code: "DEPT-04",
    head: "Vikram",
    employeeCount: 180,
    proficiency: 54,
    benchmark: 90,
    status: "Moderate",
    criticalGaps: 2,
    competencies: [
      { name: "OWASP API Pentesting", score: 52, target: 90, courseId: "c102" },
      { name: "Zero Trust Architecture", score: 48, target: 90, courseId: "c102" },
      { name: "Threat Intelligence & SIEM", score: 62, target: 85, courseId: "c102" }
    ]
  },
  {
    id: "dep-log",
    name: "Logistics & Supply Automation",
    code: "DEPT-05",
    head: "Ananya",
    employeeCount: 260,
    proficiency: 39,
    benchmark: 75,
    status: "Critical",
    criticalGaps: 3,
    competencies: [
      { name: "Edge IoT Architecture", score: 35, target: 75, courseId: "c101" },
      { name: "Workflow Automation", score: 44, target: 75, courseId: "c103" },
      { name: "Realtime Telemetry", score: 38, target: 75, courseId: "c104" }
    ]
  },
  {
    id: "dep-hr",
    name: "HR, Governance & Capacity Cell",
    code: "DEPT-06",
    head: "Sunita",
    employeeCount: 135,
    proficiency: 79,
    benchmark: 80,
    status: "Proficient",
    criticalGaps: 0,
    competencies: [
      { name: "GIGW 3.0 Compliance", score: 84, target: 80, courseId: "c101" },
      { name: "Competency Mapping", score: 78, target: 80, courseId: "c104" },
      { name: "DoPT Digital Frameworks", score: 75, target: 80, courseId: "c101" }
    ]
  }
];

const initialSkillGaps = [
  {
    id: "gap-1",
    skill: "Kubernetes Orchestration & CI/CD",
    department: "Operations & Infrastructure",
    severity: "CRITICAL",
    deficitPct: 47,
    affectedCount: 142,
    matchedCourseId: "c103",
    matchedCourseTitle: "Kubernetes Orchestration & CI/CD Pipelines",
    recommendedTrainer: {
      name: "Bhrigav",
      title: "Lead Cloud Architect & DevOps Consultant",
      matchScore: 98,
      experience: "8+ yrs",
      avatar: "B"
    },
    assigned: false,
    assignedAt: null
  },
  {
    id: "gap-2",
    skill: "OWASP API Security & Threat Pentesting",
    department: "Cyber Defense & Risk Management",
    severity: "HIGH",
    deficitPct: 38,
    affectedCount: 88,
    matchedCourseId: "c102",
    matchedCourseTitle: "OWASP Top 10 API Security & Pentesting",
    recommendedTrainer: {
      name: "Miljot",
      title: "Certified Ethical Hacker & SecOps Specialist",
      matchScore: 95,
      experience: "6+ yrs",
      avatar: "M"
    },
    assigned: true,
    assignedAt: "2026-09-08"
  },
  {
    id: "gap-3",
    skill: "LLM Fine-Tuning & Vector Retrieval (RAG)",
    department: "Logistics & Supply Automation",
    severity: "CRITICAL",
    deficitPct: 40,
    affectedCount: 110,
    matchedCourseId: "c104",
    matchedCourseTitle: "LLM Fine-Tuning & Vector Embeddings (RAG)",
    recommendedTrainer: {
      name: "Sejal",
      title: "AI Researcher & Neural Systems Architect",
      matchScore: 96,
      experience: "7+ yrs",
      avatar: "S"
    },
    assigned: false,
    assignedAt: null
  },
  {
    id: "gap-4",
    skill: "Fullstack Web & Distributed Architecture",
    department: "Finance & Treasury Tech",
    severity: "MEDIUM",
    deficitPct: 25,
    affectedCount: 65,
    matchedCourseId: "c101",
    matchedCourseTitle: "Fullstack Web Engineering & Cloud Architecture",
    recommendedTrainer: {
      name: "Prince",
      title: "Senior Fullstack Engineer & Systems SME",
      matchScore: 92,
      experience: "5+ yrs",
      avatar: "P"
    },
    assigned: true,
    assignedAt: "2026-09-05"
  }
];

const mockComplianceData = {
  totalCertificates: 940,
  validCount: 892,
  expiringIn30Days: 48,
  overdueCount: 24,
  overallComplianceRate: 92.4,
  standards: [
    { name: "GIGW 3.0 Accessibility & Web Standards", status: "COMPLIANT", score: 98, authority: "MeitY / NIC" },
    { name: "DoPT Capacity Building Competency Matrix", status: "VERIFIED", score: 91, authority: "Govt. of India" },
    { name: "ISO 27001 Information Security Protocols", status: "COMPLIANT", score: 94, authority: "Standardization Body" },
    { name: "Digital Personal Data Protection (DPDP)", status: "IN REVIEW", score: 86, authority: "Data Protection Board" }
  ]
};

// ============================================================================
// COMPONENT 1: StatCard
// ============================================================================
export function StatCard({ label, value, subtext, icon, trend, color, bgAccent }) {
  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-5 flex flex-col justify-between card-hover-lift transition-all">
      <div className="flex items-start justify-between">
        <div>
          <span className="font-vt text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold block mb-1">
            {label}
          </span>
          <div className="font-vt text-4xl sm:text-5xl font-black tracking-tight text-black dark:text-white leading-none">
            {value}
          </div>
        </div>
        <div className={`w-12 h-12 border-2 border-black ${bgAccent} flex items-center justify-center font-vt text-2xl font-bold shadow-brutal`}>
          <span className="material-symbols-outlined text-2xl text-black">{icon}</span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t-2 border-dashed border-black/20 dark:border-white/20 flex items-center justify-between font-vt text-sm">
        <span className="text-slate-600 dark:text-slate-300 font-bold">{subtext}</span>
        {trend && (
          <span className={`px-2 py-0.5 border border-black font-bold ${trend.startsWith('+') ? 'bg-emerald-300 text-emerald-950' : 'bg-rose-300 text-rose-950'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 2: SkillHeatmapBar
// ============================================================================
export function SkillHeatmapBar({ department, proficiency, benchmark, employeeCount, criticalGaps, isSelected, onSelect }) {
  // Status logic: >= 75% Green, 50-74% Yellow, < 50% Red
  let statusColor = "bg-rose-500 text-rose-950";
  let barColor = "bg-rose-500";
  let statusLabel = "CRITICAL DEFICIT";
  let badgeBorder = "border-rose-700 bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200";

  if (proficiency >= 75) {
    statusColor = "bg-emerald-500 text-emerald-950";
    barColor = "bg-emerald-500";
    statusLabel = "PROFICIENT";
    badgeBorder = "border-emerald-700 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200";
  } else if (proficiency >= 50) {
    statusColor = "bg-amber-400 text-amber-950";
    barColor = "bg-amber-400";
    statusLabel = "MODERATE GAP";
    badgeBorder = "border-amber-700 bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200";
  }

  return (
    <div
      onClick={onSelect}
      className={`p-4 border-2 border-black dark:border-[#38bdf8] transition-all cursor-pointer ${
        isSelected
          ? 'bg-[#38bdf8]/15 dark:bg-[#38bdf8]/20 shadow-brutal-sky ring-2 ring-[#38bdf8]'
          : 'bg-white dark:bg-slate-900 shadow-brutal hover:translate-x-1'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          <span className="font-vt text-sm px-2 py-0.5 border border-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
            {department.code}
          </span>
          <h3 className="font-vt text-xl font-black tracking-wide text-black dark:text-white">
            {department.name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-vt text-xs font-bold px-2 py-0.5 border ${badgeBorder}`}>
            {statusLabel}
          </span>
          <span className="font-vt text-xs text-slate-500 dark:text-slate-400 font-mono">
            {employeeCount} staff
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative h-6 bg-slate-100 dark:bg-slate-800 border-2 border-black dark:border-white/30 overflow-hidden my-2">
        <div
          className={`h-full ${barColor} transition-all duration-500 relative flex items-center justify-end pr-2`}
          style={{ width: `${Math.min(100, proficiency)}%` }}
        >
          <span className="font-vt text-xs font-black text-black select-none">
            {proficiency}%
          </span>
        </div>
        {/* Benchmark Marker */}
        <div
          className="absolute top-0 bottom-0 border-l-2 border-dashed border-black dark:border-white z-10"
          style={{ left: `${benchmark}%` }}
          title={`Benchmark: ${benchmark}%`}
        />
      </div>

      <div className="flex items-center justify-between font-vt text-xs text-slate-600 dark:text-slate-400 mt-1">
        <span>Current: <strong className="text-black dark:text-white">{proficiency}%</strong></span>
        <span>Target Benchmark: <strong className="text-[#f97316]">{benchmark}%</strong></span>
        <span>Critical Gaps: <strong className={criticalGaps > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600"}>{criticalGaps}</strong></span>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 3: TrainerAllocationRow
// ============================================================================
export function TrainerAllocationRow({ gap, onAssign }) {
  const navigate = useNavigate();

  let severityBadge = "bg-rose-100 border-rose-700 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300";
  if (gap.severity === "HIGH") {
    severityBadge = "bg-amber-100 border-amber-700 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300";
  } else if (gap.severity === "MEDIUM") {
    severityBadge = "bg-blue-100 border-blue-700 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300";
  }

  return (
    <tr className="border-b-2 border-black/20 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      {/* Skill Gap & Department */}
      <td className="p-4 align-top">
        <div className="font-vt text-lg font-black text-black dark:text-white leading-tight">
          {gap.skill}
        </div>
        <div className="font-vt text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {gap.department} • <span className="font-mono">{gap.affectedCount} Employees</span>
        </div>
        <div className="mt-2">
          <span className={`inline-block font-vt text-xs px-2 py-0.5 border font-bold ${severityBadge}`}>
            {gap.severity} (Deficit: {gap.deficitPct}%)
          </span>
        </div>
      </td>

      {/* Recommended Trainer */}
      <td className="p-4 align-top">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 border-2 border-black bg-[#f97316] text-black font-vt text-xl font-bold flex items-center justify-center shrink-0">
            {gap.recommendedTrainer.avatar}
          </div>
          <div>
            <div className="font-vt text-base font-black text-black dark:text-white">
              {gap.recommendedTrainer.name}
            </div>
            <div className="font-vt text-xs text-slate-600 dark:text-slate-400">
              {gap.recommendedTrainer.title}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-vt text-xs px-2 py-0.2 border border-black bg-emerald-200 text-emerald-950 font-bold">
                {gap.recommendedTrainer.matchScore}% Match
              </span>
              <span className="font-vt text-xs text-slate-500 dark:text-slate-400">
                {gap.recommendedTrainer.experience}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Target Course & Navigation */}
      <td className="p-4 align-top">
        <div className="font-vt text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
          {gap.matchedCourseTitle}
        </div>
        <button
          onClick={() => navigate(`/course/${gap.matchedCourseId}`)}
          className="mt-2 inline-flex items-center gap-1 font-vt text-xs font-bold text-[#38bdf8] hover:text-[#f97316] hover:underline"
        >
          <span>View Course Details</span>
          <span className="material-symbols-outlined text-xs">open_in_new</span>
        </button>
      </td>

      {/* Action / Allocation Status */}
      <td className="p-4 align-top text-right">
        {gap.assigned ? (
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 border-2 border-black text-black font-vt text-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>ASSIGNED</span>
            </span>
            <span className="font-vt text-xs text-slate-500 dark:text-slate-400">
              Dispatched on {gap.assignedAt}
            </span>
            <button
              onClick={() => onAssign(gap.id)}
              className="mt-1 font-vt text-xs text-slate-500 hover:text-rose-500 underline"
            >
              Reassign
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAssign(gap.id)}
            className="px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] border-2 border-black text-black font-vt text-base font-bold shadow-brutal btn-tactile inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            <span>Assign Trainer</span>
          </button>
        )}
      </td>
    </tr>
  );
}

// ============================================================================
// COMPONENT 4: ComplianceMeter
// ============================================================================
export function ComplianceMeter({ complianceData }) {
  const validPct = Math.round((complianceData.validCount / complianceData.totalCertificates) * 100);
  const expiringPct = Math.round((complianceData.expiringIn30Days / complianceData.totalCertificates) * 100);
  const overduePct = 100 - validPct - expiringPct;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black/10 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-emerald-600 dark:text-emerald-400">verified</span>
            <h3 className="font-vt text-2xl font-black tracking-wide text-black dark:text-white">
              COMPLIANCE & CERTIFICATION AUDIT
            </h3>
          </div>
          <p className="font-vt text-sm text-slate-600 dark:text-slate-400 mt-1">
            Adhering to GIGW 3.0 & DoPT (Department of Personnel & Training) Institutional Benchmarks
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="font-vt text-xs uppercase tracking-widest text-slate-500 font-bold block">Compliance Index</span>
          <span className="font-vt text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
            {complianceData.overallComplianceRate}%
          </span>
        </div>
      </div>

      {/* Visual Segmented Progress Bar */}
      <div>
        <div className="flex justify-between font-vt text-sm font-bold mb-1.5">
          <span>Certificate Status Distribution ({complianceData.totalCertificates} Total Issued)</span>
          <span className="text-slate-600 dark:text-slate-400 font-mono">GIGW 3.0 / DoPT</span>
        </div>
        <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 border-2 border-black dark:border-white/40 flex overflow-hidden">
          <div
            style={{ width: `${validPct}%` }}
            className="h-full bg-emerald-500 hover:opacity-90 transition-all relative group flex items-center justify-center text-xs font-vt font-bold text-black"
            title={`Valid: ${complianceData.validCount} (${validPct}%)`}
          >
            {validPct}%
          </div>
          <div
            style={{ width: `${expiringPct}%` }}
            className="h-full bg-amber-400 hover:opacity-90 transition-all flex items-center justify-center text-xs font-vt font-bold text-black"
            title={`Expiring: ${complianceData.expiringIn30Days} (${expiringPct}%)`}
          >
            {expiringPct}%
          </div>
          <div
            style={{ width: `${overduePct}%` }}
            className="h-full bg-rose-500 hover:opacity-90 transition-all flex items-center justify-center text-xs font-vt font-bold text-white"
            title={`Overdue: ${complianceData.overdueCount} (${overduePct}%)`}
          >
            {overduePct}%
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 mt-3 font-vt text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 border border-black inline-block"></span>
            <span>Valid ({complianceData.validCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-400 border border-black inline-block"></span>
            <span>Expiring &lt;30d ({complianceData.expiringIn30Days})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-rose-500 border border-black inline-block"></span>
            <span>Overdue ({complianceData.overdueCount})</span>
          </div>
        </div>
      </div>

      {/* Standards Audit Checklist */}
      <div className="space-y-3 pt-2">
        <h4 className="font-vt text-lg font-black tracking-wider text-black dark:text-white">
          ▸ MANDATORY STATUTORY STANDARDS VERIFICATION
        </h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {complianceData.standards.map((std, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 dark:bg-slate-800/80 border-2 border-black dark:border-slate-700 flex items-center justify-between"
            >
              <div>
                <div className="font-vt text-sm font-bold text-black dark:text-white">{std.name}</div>
                <div className="font-vt text-xs text-slate-500 dark:text-slate-400">{std.authority}</div>
              </div>
              <div className="text-right shrink-0">
                <span className={`font-vt text-xs font-bold px-2 py-0.5 border ${
                  std.status === 'COMPLIANT' || std.status === 'VERIFIED'
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-700 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950 border-amber-700 text-amber-800 dark:text-amber-300'
                }`}>
                  {std.status}
                </span>
                <div className="font-vt text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                  {std.score}% Score
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN EXPORT: AdminAnalytics
// ============================================================================
export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState(initialDepartmentData);
  const [skillGaps, setSkillGaps] = useState(initialSkillGaps);
  const [selectedDeptId, setSelectedDeptId] = useState(departments[1].id); // default to Operations
  const [filterType, setFilterType] = useState("ALL");
  const [toastMessage, setToastMessage] = useState(null);

  const selectedDepartment = departments.find(d => d.id === selectedDeptId) || departments[0];

  // Handler for Trainer Allocation Action
  const handleAssignTrainer = (gapId) => {
    setSkillGaps(prev =>
      prev.map(gap => {
        if (gap.id === gapId) {
          const nextAssigned = !gap.assigned;
          const today = new Date().toISOString().split('T')[0];
          showToast(
            nextAssigned
              ? `Trainer ${gap.recommendedTrainer.name} assigned to ${gap.skill}!`
              : `Allocation for ${gap.skill} reset.`
          );
          return {
            ...gap,
            assigned: nextAssigned,
            assignedAt: nextAssigned ? today : null
          };
        }
        return gap;
      })
    );
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter departments for Heatmap
  const filteredDepartments = departments.filter(d => {
    if (filterType === "CRITICAL") return d.proficiency < 50;
    if (filterType === "MODERATE") return d.proficiency >= 50 && d.proficiency < 75;
    if (filterType === "PROFICIENT") return d.proficiency >= 75;
    return true;
  });

  // Calculate high-level KPIs dynamically
  const totalEmployees = departments.reduce((acc, d) => acc + d.employeeCount, 0);
  const totalCriticalGaps = skillGaps.filter(g => g.severity === "CRITICAL").length;
  const overallReadiness = Math.round(
    departments.reduce((acc, d) => acc + d.proficiency * d.employeeCount, 0) / totalEmployees
  );

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 dark:bg-[#090d16] dark:text-slate-100 font-sans pb-16">
      {/* TOAST ALERT NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#38bdf8] border-2 border-black shadow-brutal p-4 max-w-md animate-bounce">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-black font-bold">notifications_active</span>
            <p className="font-vt text-lg font-bold text-black">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* TOP COMMAND HEADER */}
      <section className="bg-white dark:bg-slate-900 border-b-4 border-black px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#f97316] text-black font-vt text-xs font-black uppercase border border-black">
                PAIR 3 // SEJAL & BHRIGAV
              </span>
              <span className="font-vt text-xs tracking-widest text-[#38bdf8] uppercase font-bold">
                SIH26075 • EXECUTIVE INTELLIGENCE
              </span>
            </div>
            <h1 className="font-vt text-3xl sm:text-5xl font-black tracking-wide leading-none mt-2">
              ORGANIZATIONAL CAPACITY INTELLIGENCE
            </h1>
            <p className="font-vt text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
              Real-time Competency Audits • Automated Skill Gap Detection • Smart Trainer Matchmaking
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/trainer"
              className="px-4 py-2 bg-[#38bdf8] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-lg">school</span>
              <span>TRAINER STUDIO</span>
            </Link>
            <Link
              to="/auth"
              className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-black dark:border-[#38bdf8] text-black dark:text-white font-vt text-lg font-bold shadow-brutal btn-tactile flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-lg">manage_accounts</span>
              <span>MANAGE USERS</span>
            </Link>
            <button
              onClick={() => showToast("Capacity Intelligence Report exported to PDF (GIGW 3.0 Standard).")}
              className="px-4 py-2 bg-[#f97316] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              <span>EXPORT REPORT</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">

        {/* 1. KPI STAT CARDS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-vt text-2xl sm:text-3xl font-black tracking-wider flex items-center gap-2">
              <span>[ 01 // CAPACITY KEY PERFORMANCE INDICATORS ]</span>
            </h2>
            <span className="font-vt text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-1 border border-emerald-600">
              ● LIVE TELEMETRY ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              label="Total Trained Employees"
              value={totalEmployees.toLocaleString()}
              subtext="Across 6 Organizational Units"
              icon="groups"
              trend="+14.2% MoM"
              bgAccent="bg-[#38bdf8]"
            />
            <StatCard
              label="Overall Skill Readiness"
              value={`${overallReadiness}%`}
              subtext="Benchmark Target: 85%"
              icon="monitoring"
              trend="+5.8% Q3"
              bgAccent="bg-[#f97316]"
            />
            <StatCard
              label="Active Certifications"
              value={mockComplianceData.validCount.toString()}
              subtext={`${mockComplianceData.expiringIn30Days} Expiring in 30 Days`}
              icon="workspace_premium"
              trend="+28 New"
              bgAccent="bg-emerald-400"
            />
            <StatCard
              label="Critical Skill Gaps Count"
              value={totalCriticalGaps.toString()}
              subtext="High Priority Remediations"
              icon="warning"
              trend="-2 Resolved"
              bgAccent="bg-rose-400"
            />
          </div>
        </section>

        {/* 2. DEPARTMENT SKILL GAP HEATMAP & DRILLDOWN */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-vt text-2xl sm:text-3xl font-black tracking-wider">
                [ 02 // DEPARTMENT SKILL GAP HEATMAP ]
              </h2>
              <p className="font-vt text-sm text-slate-600 dark:text-slate-400">
                Click a department to inspect granular competency deficits and course roadmaps
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 font-vt text-sm font-bold">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-3 py-1 border-2 border-black ${
                  filterType === "ALL" ? "bg-black text-white dark:bg-[#38bdf8] dark:text-black" : "bg-white dark:bg-slate-800"
                }`}
              >
                ALL ({departments.length})
              </button>
              <button
                onClick={() => setFilterType("CRITICAL")}
                className={`px-3 py-1 border-2 border-black ${
                  filterType === "CRITICAL" ? "bg-rose-500 text-black font-black" : "bg-white dark:bg-slate-800 text-rose-600"
                }`}
              >
                CRITICAL (&lt;50%)
              </button>
              <button
                onClick={() => setFilterType("MODERATE")}
                className={`px-3 py-1 border-2 border-black ${
                  filterType === "MODERATE" ? "bg-amber-400 text-black font-black" : "bg-white dark:bg-slate-800 text-amber-600"
                }`}
              >
                MODERATE (50-74%)
              </button>
              <button
                onClick={() => setFilterType("PROFICIENT")}
                className={`px-3 py-1 border-2 border-black ${
                  filterType === "PROFICIENT" ? "bg-emerald-500 text-black font-black" : "bg-white dark:bg-slate-800 text-emerald-600"
                }`}
              >
                ON TARGET (≥75%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Department Heatmap Bars */}
            <div className="lg:col-span-2 space-y-3">
              {filteredDepartments.map(dep => (
                <SkillHeatmapBar
                  key={dep.id}
                  department={dep}
                  proficiency={dep.proficiency}
                  benchmark={dep.benchmark}
                  employeeCount={dep.employeeCount}
                  criticalGaps={dep.criticalGaps}
                  isSelected={selectedDeptId === dep.id}
                  onSelect={() => setSelectedDeptId(dep.id)}
                />
              ))}
            </div>

            {/* Right 1 Col: Selected Department Matrix Drilldown */}
            <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3 mb-4">
                  <div>
                    <span className="font-vt text-xs uppercase tracking-widest text-[#38bdf8] font-bold">
                      INSPECTION VIEW
                    </span>
                    <h3 className="font-vt text-2xl font-black text-black dark:text-white leading-tight">
                      {selectedDepartment.name}
                    </h3>
                  </div>
                  <span className="font-vt text-3xl font-black text-[#f97316]">
                    {selectedDepartment.proficiency}%
                  </span>
                </div>

                <div className="space-y-2 font-vt text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unit Head:</span>
                    <span className="font-bold">{selectedDepartment.head}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Staff Headcount:</span>
                    <span className="font-bold">{selectedDepartment.employeeCount} Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Benchmark:</span>
                    <span className="font-bold text-[#f97316]">{selectedDepartment.benchmark}%</span>
                  </div>
                </div>

                <h4 className="font-vt text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Competency Breakdown:
                </h4>
                <div className="space-y-3">
                  {selectedDepartment.competencies.map((comp, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-black/30 dark:border-white/20">
                      <div className="flex justify-between font-vt text-sm font-bold mb-1">
                        <span>{comp.name}</span>
                        <span className={comp.score < comp.target ? "text-rose-600 dark:text-rose-400" : "text-emerald-600"}>
                          {comp.score}% / {comp.target}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full ${comp.score < comp.target ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${comp.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1.5 font-vt text-xs">
                        <span className="text-slate-500">
                          {comp.score < comp.target ? `Deficit: ${comp.target - comp.score}%` : 'Target Met'}
                        </span>
                        <button
                          onClick={() => navigate(`/course/${comp.courseId}`)}
                          className="text-[#38bdf8] hover:text-[#f97316] font-bold hover:underline"
                        >
                          View Roadmap →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black/10 dark:border-white/10">
                <button
                  onClick={() => showToast(`Automated training recommendation queued for ${selectedDepartment.name}.`)}
                  className="w-full py-2.5 bg-[#38bdf8] hover:bg-[#0284c7] border-2 border-black text-black font-vt text-lg font-bold shadow-brutal btn-tactile"
                >
                  DISPATCH INTERVENTION FOR {selectedDepartment.code}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SMART TRAINER ALLOCATION TABLE */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-vt text-2xl sm:text-3xl font-black tracking-wider">
                [ 03 // SMART TRAINER ALLOCATION ENGINE ]
              </h2>
              <p className="font-vt text-sm text-slate-600 dark:text-slate-400">
                Algorithmic matchmaking pairing verified trainers with critical institutional skill deficits
              </p>
            </div>
            <span className="font-vt text-sm font-bold bg-[#38bdf8]/20 border border-[#38bdf8] px-3 py-1 text-black dark:text-[#38bdf8]">
              {skillGaps.filter(g => g.assigned).length} / {skillGaps.length} GAPS REMEDIATED
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b-2 border-black dark:border-white/20 font-vt text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  <th className="p-4">Identified Skill Gap & Urgency</th>
                  <th className="p-4">Matched Certified Trainer</th>
                  <th className="p-4">Target Course Module</th>
                  <th className="p-4 text-right">Allocation Action</th>
                </tr>
              </thead>
              <tbody>
                {skillGaps.map(gap => (
                  <TrainerAllocationRow
                    key={gap.id}
                    gap={gap}
                    onAssign={handleAssignTrainer}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. COMPLIANCE & CERTIFICATION TRACKER */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-vt text-2xl sm:text-3xl font-black tracking-wider">
              [ 04 // STATUTORY COMPLIANCE & GIGW 3.0 / DoPT TRACKER ]
            </h2>
          </div>
          <ComplianceMeter complianceData={mockComplianceData} />
        </section>

        {/* FOOTER ACTIONS & SYSTEM INTEGRATIONS */}
        <section className="bg-white dark:bg-slate-900 border-2 border-black dark:border-[#38bdf8] shadow-brutal p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 border-2 border-black flex items-center justify-center font-vt text-xl font-bold">
              ✓
            </div>
            <div>
              <p className="font-vt text-lg font-black text-black dark:text-white">
                Capacity Connect Intelligence Engine // Active Session
              </p>
              <p className="font-vt text-xs text-slate-500 dark:text-slate-400">
                Connected to DoPT Competency Ledger • Page Visibility & Session Security Active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="px-4 py-2 border-2 border-black bg-rose-200 hover:bg-rose-300 text-rose-950 font-vt text-lg font-bold shadow-brutal btn-tactile"
            >
              ADMIN SIGN OUT
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
