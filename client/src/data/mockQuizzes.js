export const mockQuizzes = [
  {
    id: "q101",
    title: "React & Modern Web Architecture Assessment",
    questions: [
      { id: 1, questionText: "Which hook manages mutable local state in functional components?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: "useState" },
      { id: 2, questionText: "What does useEffect's cleanup return do?", options: ["Re-renders the component", "Runs before the next effect or unmount", "Stops all state updates", "Nothing"], correctAnswer: "Runs before the next effect or unmount" },
      { id: 3, questionText: "Which is a valid key for list items?", options: ["Array index always", "A stable unique id", "The component name", "Math.random()"], correctAnswer: "A stable unique id" },
      { id: 4, questionText: "Context API is best used for?", options: ["Animations", "Global-ish state passed deep", "Local form state", "Routing"], correctAnswer: "Global-ish state passed deep" },
      { id: 5, questionText: "What triggers a re-render?", options: ["console.log", "State or props change", "CSS edits", "Adding comments"], correctAnswer: "State or props change" },
      { id: 6, questionText: "useMemo primarily helps with?", options: ["Styling", "Avoiding expensive recomputation", "Routing", "Fetching"], correctAnswer: "Avoiding expensive recomputation" },
      { id: 7, questionText: "Controlled input means?", options: ["Value driven by React state", "Unstyled input", "Disabled input", "Native form only"], correctAnswer: "Value driven by React state" },
      { id: 8, questionText: "React Router's <Route path> matches against?", options: ["The URL pathname", "The page title", "localStorage", "window size"], correctAnswer: "The URL pathname" },
      { id: 9, questionText: "useCallback returns?", options: ["A memoized value", "A memoized function", "A promise", "A component"], correctAnswer: "A memoized function" },
      { id: 10, questionText: "Lazy loading a route uses?", options: ["React.lazy + Suspense", "useState", "useEffect", "Context"], correctAnswer: "React.lazy + Suspense" }
    ]
  },
  {
    id: "q102",
    title: "OWASP API Security Assessment",
    questions: [
      { id: 1, questionText: "BOLA (Broken Object Level Auth) is API #?", options: ["1:2023", "2:2023", "3:2023", "7:2023"], correctAnswer: "1:2023" },
      { id: 2, questionText: "Rate limiting returns which HTTP status?", options: ["200", "404", "429", "500"], correctAnswer: "429" },
      { id: 3, questionText: "Token-bucket allows?", options: ["No bursts", "Bursts within a bounded average", "Unlimited requests", "One request ever"], correctAnswer: "Bursts within a bounded average" },
      { id: 4, questionText: "JWT 'alg: none' attack exploits?", options: ["Weak hashing", "Missing signature verification", "SQL injection", "XSS"], correctAnswer: "Missing signature verification" },
      { id: 5, questionText: "Mass assignment is mitigated by?", options: ["Whitelisting fields", "More logging", "Caching", "CDN"], correctAnswer: "Whitelisting fields" },
      { id: 6, questionText: "CORS preflight uses which method?", options: ["GET", "OPTIONS", "POST", "HEAD"], correctAnswer: "OPTIONS" },
      { id: 7, questionText: "Improper Asset Mgmt (API #9) targets?", options: ["Old API versions still exposed", "Frontend CSS", "Database indexing", "DNS"], correctAnswer: "Old API versions still exposed" },
      { id: 8, questionText: "SSRF lets an attacker?", options: ["Read server fonts", "Make the server fetch internal URLs", "Edit CSS", "Log out users"], correctAnswer: "Make the server fetch internal URLs" },
      { id: 9, questionText: "Server-side request validation should?", options: ["Trust the client", "Validate on the server", "Skip for speed", "Use console.log"], correctAnswer: "Validate on the server" },
      { id: 10, questionText: "Security through obscurity is?", options: ["Best practice", "Not a control", "Required", "Faster"], correctAnswer: "Not a control" }
    ]
  },
  {
    id: "q103",
    title: "Kubernetes & CI/CD Assessment",
    questions: [
      { id: 1, questionText: "Smallest deployable K8s unit?", options: ["Pod", "Node", "Cluster", "Namespace"], correctAnswer: "Pod" },
      { id: 2, questionText: "A Deployment manages?", options: ["ReplicaSets of Pods", "Nodes", "Volumes", "Secrets only"], correctAnswer: "ReplicaSets of Pods" },
      { id: 3, questionText: "Service type for cluster-internal access?", options: ["LoadBalancer", "NodePort", "ClusterIP", "ExternalName"], correctAnswer: "ClusterIP" },
      { id: 4, questionText: "Helm chart values live in?", options: ["values.yaml", "package.json", "Dockerfile", "README"], correctAnswer: "values.yaml" },
      { id: 5, questionText: "GitOps reconciles cluster state from?", options: ["Git", "Email", "Slack", "Browser cache"], correctAnswer: "Git" },
      { id: 6, questionText: "kubectl apply does?", options: ["Deletes pods", "Declares desired state", "Reboots nodes", "Logs in"], correctAnswer: "Declares desired state" },
      { id: 7, questionText: "Liveness probe checks?", options: ["If app is running & not deadlocked", "If app is ready to serve", "CPU usage", "Disk space"], correctAnswer: "If app is running & not deadlocked" },
      { id: 8, questionText: "ConfigMap stores?", options: ["Non-confidential config", "Passwords only", "Docker images", "Logs"], correctAnswer: "Non-confidential config" },
      { id: 9, questionText: "Secrets should be?", options: ["Base64 + RBAC + encrypted at rest", "Plain text", "In Git", "In CSS"], correctAnswer: "Base64 + RBAC + encrypted at rest" },
      { id: 10, questionText: "Rolling update strategy?", options: ["Gradually replaces pods", "Deletes all then recreates", "Stops the cluster", "Skips tests"], correctAnswer: "Gradually replaces pods" }
    ]
  },
  {
    id: "q104",
    title: "LLM Fine-Tuning & RAG Assessment",
    questions: [
      { id: 1, questionText: "RAG stands for?", options: ["Retrieval-Augmented Generation", "Random Access Graph", "Rapid API Gateway", "Recurrent Auto Generator"], correctAnswer: "Retrieval-Augmented Generation" },
      { id: 2, questionText: "Vector embeddings are?", options: ["Numeric representations of meaning", "CSS classes", "API keys", "Log files"], correctAnswer: "Numeric representations of meaning" },
      { id: 3, questionText: "Top-k retrieval returns?", options: ["k most similar chunks", "k random words", "k prompts", "k errors"], correctAnswer: "k most similar chunks" },
      { id: 4, questionText: "Chunking documents helps?", options: ["Stay under token limits & precision", "Increase font size", "Speed up CSS", "Reduce API cost to zero"], correctAnswer: "Stay under token limits & precision" },
      { id: 5, questionText: "Fine-tuning adjusts?", options: ["Model weights on task data", "The database schema", "CSS variables", "DNS records"], correctAnswer: "Model weights on task data" },
      { id: 6, questionText: "Hallucination is when the model?", options: ["Invents unsupported answers", "Runs too fast", "Refuses to load", "Deletes files"], correctAnswer: "Invents unsupported answers" },
      { id: 7, questionText: "Embedding similarity is usually?", options: ["Cosine similarity", "Addition", "String compare", "Hash equality"], correctAnswer: "Cosine similarity" },
      { id: 8, questionText: "A vector DB (Pinecone/Chroma) is optimized for?", options: ["Semantic nearest-neighbor search", "Transactions", "File uploads", "Email"], correctAnswer: "Semantic nearest-neighbor search" },
      { id: 9, questionText: "Prompt grounding means?", options: ["Injecting retrieved context into the prompt", "Deleting the prompt", "Hiding the model", "Disabling tokens"], correctAnswer: "Injecting retrieved context into the prompt" },
      { id: 10, questionText: "Citations in RAG improve?", options: ["Verifiability & trust", "Font weight", "Page load CSS", "DNS speed"], correctAnswer: "Verifiability & trust" }
    ]
  }
];
