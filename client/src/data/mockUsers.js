export const mockTrainee = {
  id: "u101",
  name: "Sakshi",
  role: "Trainee",
  department: "Engineering Pod 4",
  readinessScore: 64,
  enrollments: ["c101", "c102"],
  competencies: [
    { skill: "React & Web",     current: 72, benchmark: 88, courseId: "c101", quizId: "q101", color: "bg-emerald-500", accent: "text-emerald-600 dark:text-emerald-400" },
    { skill: "Cloud Security",  current: 58, benchmark: 85, courseId: "c102", quizId: "q102", color: "bg-[#f97316]",  accent: "text-[#f97316]" },
    { skill: "Kubernetes",      current: 45, benchmark: 90, courseId: "c103", quizId: "q103", color: "bg-[#38bdf8]",  accent: "text-[#38bdf8]" },
    { skill: "LLM & RAG",        current: 38, benchmark: 92, courseId: "c104", quizId: "q104", color: "bg-purple-500", accent: "text-purple-600 dark:text-purple-400" }
  ],
  certifications: [
    { id: "cert1", title: "OWASP API Security Fundamentals", issuer: "Capacity Connect", date: "Aug 2026", score: 88 },
    { id: "cert2", title: "React Component Patterns",        issuer: "Capacity Connect", date: "Jul 2026", score: 91 }
  ]
};
