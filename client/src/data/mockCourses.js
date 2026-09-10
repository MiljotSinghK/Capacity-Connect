export const mockCourses = [
  {
    id: "c101",
    title: "Fullstack Web Engineering & Cloud Architecture",
    category: "Software Development",
    skillTag: "React & Web",
    level: "INTERMEDIATE",
    duration: "5 WEEKS",
    progress: 65,
    targetBenchmark: 88,
    quizId: "q101",
    emoji: "⚛️",
    color: "bg-emerald-500",
    description: "Build resilient distributed web systems with React, hooks, and component architecture.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    modules: [
      { id: "m1", title: "Module 1: Introduction to React & DOM", type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "Module 2: State Management & Hooks", type: "reading",
        readingContent: "Hooks let function components own state and side-effects. useState returns a value and a setter; useEffect runs after render and cleans up on the next pass. Keep effects focused, prefer multiple small hooks over one large one, and never call hooks conditionally." },
      { id: "m3", title: "Module 3: Capstone Quiz", type: "quiz" }
    ]
  },
  {
    id: "c102",
    title: "OWASP Top 10 API Security & Pentesting",
    category: "Cybersecurity",
    skillTag: "Cloud Security",
    level: "ADVANCED",
    duration: "4 WEEKS",
    progress: 30,
    targetBenchmark: 85,
    quizId: "q102",
    emoji: "🛡️",
    color: "bg-[#f97316]",
    description: "Identify BOLA, broken auth, and implement rate limiting across REST and GraphQL APIs.",
    videoUrl: "https://www.youtube.com/embed/2GtbV1_x9mI",
    modules: [
      { id: "m1", title: "Module 1: BOLA & Broken Object Auth", type: "video", videoUrl: "https://www.youtube.com/embed/2GtbV1_x9mI" },
      { id: "m2", title: "Module 2: Rate Limiting & Quotas", type: "reading",
        readingContent: "Rate limiting caps requests per client per window to stop brute-force and scraping. Token-bucket algorithms allow bursts while bounding average load. Apply limits at the edge (API gateway) and per-endpoint, returning HTTP 429 with Retry-After." },
      { id: "m3", title: "Module 3: Capstone Quiz", type: "quiz" }
    ]
  },
  {
    id: "c103",
    title: "Kubernetes Orchestration & CI/CD Pipelines",
    category: "Cloud",
    skillTag: "Kubernetes",
    level: "INTERMEDIATE",
    duration: "6 WEEKS",
    progress: 0,
    targetBenchmark: 90,
    quizId: "q103",
    emoji: "☸️",
    color: "bg-[#38bdf8]",
    description: "Automate multi-stage docker deployments, helm templating, and Prometheus observability.",
    videoUrl: "https://www.youtube.com/embed/Vnv2FRcD3ZI",
    modules: [
      { id: "m1", title: "Module 1: Pods, Services & Deployments", type: "video", videoUrl: "https://www.youtube.com/embed/Vnv2FRcD3ZI" },
      { id: "m2", title: "Module 2: Helm & GitOps", type: "reading",
        readingContent: "Helm packages Kubernetes manifests into reusable charts with templated values. GitOps stores desired state in Git; controllers reconcile the cluster to match, giving auditability and rollback by reverting a commit." },
      { id: "m3", title: "Module 3: Capstone Quiz", type: "quiz" }
    ]
  },
  {
    id: "c104",
    title: "LLM Fine-Tuning & Vector Embeddings (RAG)",
    category: "Data / AI",
    skillTag: "LLM & RAG",
    level: "INTERMEDIATE",
    duration: "4 WEEKS",
    progress: 0,
    targetBenchmark: 92,
    quizId: "q104",
    emoji: "🧠",
    color: "bg-purple-500",
    description: "Build semantic retrieval pipelines with Pinecone/Chroma and eliminate hallucination.",
    videoUrl: "https://www.youtube.com/embed/_ArpXq_h3R8",
    modules: [
      { id: "m1", title: "Module 1: Embeddings & Vector Stores", type: "video", videoUrl: "https://www.youtube.com/embed/_ArpXq_h3R8" },
      { id: "m2", title: "Module 2: RAG Retrieval Patterns", type: "reading",
        readingContent: "Retrieval-Augmented Generation grounds LLM answers in fetched context. Chunk documents, embed them, store in a vector DB, then at query time retrieve the top-k relevant chunks and inject them into the prompt. This cuts hallucination and enables citations." },
      { id: "m3", title: "Module 3: Capstone Quiz", type: "quiz" }
    ]
  }
];
