/**
 * Single source of truth for portfolio content.
 * Every figure here is grounded in the source résumés — nothing invented.
 */

/**
 * Canonical production origin — the single source for every absolute URL.
 * metadataBase, canonical, OpenGraph, Twitter, JSON-LD, sitemap, and robots
 * all derive from this (via `meta.url`). Change it here only.
 * No trailing slash.
 */
export const SITE_URL = "https://saiabhinav.vercel.app";

export const profile = {
  name: "Sai Abhinav Sadineni",
  shortName: "Sai Abhinav",
  initials: "SA",
  /** Brand identity. */
  role: "Systems Builder",
  /** Recruiter-searchable job title — pairs with the brand identity. */
  title: "AI & Software Engineer",
  disciplines: ["AI Systems", "Full-Stack Development", "Search Infrastructure", "Cloud Platforms"],
  location: "Hyderabad, India",
  timezone: "IST · UTC+5:30",
  status: "Open to internships & new-grad roles",
  eligibility: "Graduating 2027 · available for 2026 internships",
  email: "abhinav.sadineni@gmail.com",
  phone: "+91 63041 00610",
  /**
   * Resume download. `null` = not available yet → links render a graceful
   * "coming soon" state. To enable: drop the PDF in /public and set this to its
   * path, e.g. "/Sai-Abhinav-Sadineni-Resume.pdf".
   */
  resume: null as string | null,
  links: {
    github: "https://github.com/saiabhinav001",
    linkedin: "https://linkedin.com/in/sai-abhinav-sadineni",
    leetcode: "https://leetcode.com/u/abhinav_111/",
    email: "mailto:abhinav.sadineni@gmail.com",
  },
} as const;

export const hero = {
  kicker: "AI · Full-Stack · Search · Cloud",
  /** Rendered as a single, plain statement; the `accent` segment is color-emphasized. */
  statement: [
    { text: "I build " },
    { text: "AI systems", accent: true },
    { text: " and the full-stack products around them." },
  ],
  signals: [
    { value: "2nd / 22,000+", label: "Deloitte Hacksplosion 2026" },
    { value: "1st place", label: "Sudhee 2026 hackathon" },
    { value: "99.4% F1", label: "Predictive-maintenance model" },
  ],
} as const;

export const about = {
  body: "I build AI systems and the full-stack apps around them, and get them in front of real users. Recently that's been a nine-agent pipeline that extracts structured data from legal judgments, a hybrid search engine over shared interview experiences, and a multi-tenant community-operations app that's live. Most of my time goes into the parts that break under load, like search relevance and keeping one tenant's data from leaking into another's.",
} as const;

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  /** One-line summary for the project card. */
  summary: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  award?: string;
  diagram: "agentic" | "retrieval" | "tenancy" | "pipeline";
  /** Compact tag set for the card (3–4). */
  cardTags: string[];
  links: { label: string; href: string; kind: "demo" | "code" }[];
  /** Real technologies from the codebase, grouped. */
  stackGroups: { core: string[]; infra: string[]; ai: string[] };
  problem: string;
  approach: string;
  decisions: { title: string; body: string }[];
  outcomes: { value: string; label: string }[];
  /** Ordered pipeline stages — drives the native mobile architecture layout. */
  archStages: { title: string; detail?: string; items?: string[] }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "agentic-case-law",
    index: "01",
    title: "Agentic Case-Law Intelligence",
    summary:
      "A multi-agent system that turns Indian court judgments into structured legal intelligence. Nine specialised agents run under a supervisor and master agent, and every field is source-verified, confidence-scored, and schema-validated before human review.",
    tagline: "Structured intelligence from Indian case law, built as a nine-agent system on GenW.AI and Qwen3.",
    category: "Multi-Agent AI · Legal Intelligence",
    year: "2026",
    role: "Architecture & full system",
    award: "National 2nd — Deloitte Hacksplosion 2026",
    diagram: "agentic",
    cardTags: ["GenW.AI", "Qwen3", "Multi-Agent", "PostgreSQL"],
    links: [],
    stackGroups: {
      core: ["GenW.AI Agent Builder", "GenW.AI App Maker"],
      infra: ["PostgreSQL"],
      ai: ["Qwen3", "Multi-agent orchestration", "Confidence scoring + schema validation"],
    },
    problem:
      "Indian courts publish judgments as long, unstructured PDFs. Pulling out the parts that matter (the parties, the facts, the statutes, the court's reasoning) takes hours, and a single misread citation can change an argument. Doing it reliably across thousands of cases needs more than one LLM call.",
    approach:
      "I built it as a multi-agent system on GenW.AI's Agent Builder, running Qwen3. An intake agent parses and segments each judgment, then a master agent and a supervisor agent route the work to six specialised agents in parallel: metadata, facts, petitioner, respondent, statute, and reasoning. Before anything is stored, every field passes a responsible-AI layer that verifies the source against the document, scores confidence, and validates the schema, sending low-confidence fields to a human review queue. Validated results go into PostgreSQL and surface through a frontend built with GenW.AI App Maker: a dashboard, a case viewer, case comparison, chat over the case data, and the review queue.",
    decisions: [
      {
        title: "Nine specialised agents, not one prompt",
        body: "Each part of a judgment gets its own agent (parties, facts, statutes, reasoning), so extraction is accurate per section and the agents run in parallel. A supervisor and a master agent coordinate them instead of one model trying to do everything.",
      },
      {
        title: "A responsible-AI layer before anything is trusted",
        body: "Every field is verified against the source document, confidence-scored, and schema-validated. Low-confidence output goes to a human review queue instead of being shown as fact, which matters when a wrong citation can mislead a lawyer.",
      },
      {
        title: "Built on GenW.AI with Qwen3",
        body: "GenW.AI's Agent Builder and App Maker let me ship the full agent pipeline and the interface fast, with Qwen3 as the model and PostgreSQL as the structured store.",
      },
      {
        title: "A product, not just an extractor",
        body: "The structured data drives a real interface: a dashboard, case viewer, case comparison, chat over a case, and a human review queue. The output is something a lawyer can actually work in.",
      },
    ],
    outcomes: [
      { value: "2nd / 22,000+", label: "Deloitte Hacksplosion 2026, national" },
      { value: "9 agents", label: "Under a supervisor + master agent" },
      { value: "Source-verified", label: "Confidence-scored, schema-validated, HITL" },
    ],
    archStages: [
      { title: "Intake Agent", detail: "Parses and segments each Indian court judgment" },
      { title: "Master + Supervisor Agents", detail: "Orchestrate the run and route extraction" },
      { title: "Six specialised agents", detail: "Run in parallel", items: ["Metadata", "Facts", "Petitioner", "Respondent", "Statute", "Reasoning"] },
      { title: "Validation & responsible AI", detail: "Source check · confidence scoring · schema · human-in-the-loop" },
      { title: "PostgreSQL", detail: "Structured store for validated output" },
      { title: "Frontend — GenW.AI App Maker", items: ["Dashboard", "Case Viewer", "Case Comparison", "Chat with AI", "Human Review"] },
    ],
  },
  {
    slug: "hirelog",
    index: "02",
    title: "HireLog — Interview Search",
    summary:
      "A full-stack platform that turns shared interview experiences into searchable knowledge. Search is hybrid: FAISS semantic vectors, Typesense BM25, and a reranking pass, fed by spaCy NLP enrichment and a background indexing worker.",
    tagline: "Hybrid interview-experience search — FAISS vectors, Typesense BM25, and reranking, on a FastAPI backend.",
    category: "Search Infrastructure · Full-stack",
    year: "2026",
    role: "Full-stack & search",
    award: "1st place — Sudhee 2026 hackathon",
    diagram: "retrieval",
    cardTags: ["FastAPI", "FAISS", "Typesense", "Next.js"],
    links: [
      { label: "Live demo", href: "https://hirelogapp.vercel.app/", kind: "demo" },
      { label: "Source", href: "https://github.com/saiabhinav001/hirelog", kind: "code" },
    ],
    stackGroups: {
      core: ["Next.js", "React", "FastAPI", "Python 3.11", "Firebase / Firestore"],
      infra: ["Docker", "Redis", "Hugging Face Spaces", "Vercel", "Background worker", "Blue-green deploy"],
      ai: ["FAISS", "Typesense (BM25)", "sentence-transformers", "ONNX Runtime", "spaCy", "Reranker"],
    },
    problem:
      "Interview experiences are scattered across group chats and docs. Keyword search misses how a question was actually phrased, and there's no structured way to study what came up at a given company.",
    approach:
      "Candidates submit structured interview experiences. A background worker runs spaCy NLP enrichment (questions, topics, a summary) and embeds each one with a sentence-transformers model, ONNX-optimised for speed. Search is hybrid: FAISS returns semantic matches, Typesense returns BM25 lexical matches, and a reranking pass blends and orders them. The FastAPI backend runs in a Docker container on a Hugging Face Space with Redis caching and Firestore storage; the Next.js frontend is on Vercel.",
    decisions: [
      {
        title: "Hybrid search, not vectors alone",
        body: "FAISS semantic search misses exact terms like company names and specific tech; Typesense BM25 misses paraphrases. Blending both scores and then reranking gets the meaning and the keywords.",
      },
      {
        title: "A background worker for indexing",
        body: "NLP enrichment and embedding are too slow for the write path, so submissions return immediately and a worker enqueues and backfills the search index separately.",
      },
      {
        title: "ONNX-optimised embeddings",
        body: "Running sentence-transformers through ONNX Runtime keeps embedding fast enough to serve search in the request path on the modest CPU of a Hugging Face Space.",
      },
      {
        title: "Backend on a Hugging Face Docker Space",
        body: "Packaging FastAPI as a Docker Space gives the model the CPU and memory it needs, deployed and rolled out independently from the Vercel frontend with a DNS-weighted blue-green cutover.",
      },
    ],
    outcomes: [
      { value: "Hybrid", label: "FAISS + Typesense + reranker" },
      { value: "1st place", label: "Sudhee 2026 hackathon" },
      { value: "Blue-green", label: "DNS-weighted production cutover" },
    ],
    archStages: [
      { title: "Submission", detail: "Candidates submit structured interview experiences" },
      { title: "Background worker", detail: "spaCy NLP enrichment + sentence-transformers embeddings (ONNX)", items: ["spaCy", "ONNX"] },
      { title: "Indexes", detail: "Semantic vectors and BM25 lexical index", items: ["FAISS", "Typesense"] },
      { title: "Hybrid search + rerank", detail: "Blends semantic and lexical scores, then reranks" },
      { title: "Serving", detail: "FastAPI in Docker on a Hugging Face Space", items: ["FastAPI", "Redis", "Firestore"] },
      { title: "Frontend", detail: "Next.js app on Vercel" },
    ],
  },
  {
    slug: "circlein",
    index: "03",
    title: "CircleIn — Community Operations",
    summary:
      "A multi-tenant operations platform for residential communities: amenity booking, QR access, maintenance, notifications, and admin tooling. Built on Next.js 16 with NextAuth + Firebase, role-aware routing, and a Gemini-powered assistant.",
    tagline: "A multi-tenant community-operations SaaS — booking, QR access, maintenance, analytics, and an AI assistant.",
    category: "Multi-tenant SaaS · Full-stack",
    year: "2026",
    role: "Full-stack",
    diagram: "tenancy",
    cardTags: ["Next.js 16", "NextAuth", "Firebase", "Gemini"],
    links: [
      { label: "Live demo", href: "https://circlein-app.vercel.app", kind: "demo" },
      { label: "Source", href: "https://github.com/saiabhinav001/circlein-app", kind: "code" },
    ],
    stackGroups: {
      core: ["Next.js 16", "React 19", "TypeScript", "Radix UI", "Tailwind CSS", "Recharts", "QR (scan + generate)"],
      infra: ["NextAuth", "Firebase Firestore + Admin", "Serwist PWA", "Nodemailer", "Vercel"],
      ai: ["Gemini API (AI assistant)"],
    },
    problem:
      "Residential communities run on spreadsheets and WhatsApp: bookings clash, access codes get shared insecurely, maintenance requests get lost, and admins have no real view of operations. Doing it as one multi-tenant app means data must never cross between communities.",
    approach:
      "CircleIn is a Next.js 16 App Router app with route handlers for the backend. NextAuth handles sessions over Firebase-backed data, and a proxy layer enforces role-aware route protection so residents and admins only see what they should, per community. Residents book amenities (with cancel, reschedule, recurring, and waitlist flows), enter via QR access codes, and file maintenance; admins get dashboards, a support-ticket desk, analytics, and operations tooling. A Gemini-powered assistant answers resident questions, and the app ships as an installable PWA with offline support.",
    decisions: [
      {
        title: "Multi-tenant with role-aware routing",
        body: "A proxy layer derives the user's role and community from the session and gates every route, so isolation doesn't depend on each query remembering to filter by community.",
      },
      {
        title: "Route handlers over a separate backend",
        body: "Keeping the API as Next.js route handlers next to the app meant one deploy and one type system, with cron endpoints protected by a shared-secret check.",
      },
      {
        title: "An AI assistant with guardrails",
        body: "The Gemini chatbot validates payloads, derives the user's role from the session rather than the client, and falls back deterministically on timeout, so it can't be tricked into acting above the user's permissions.",
      },
      {
        title: "Installable PWA with offline support",
        body: "Serwist builds a service worker so residents can open the app and still see a usable offline page when connectivity drops.",
      },
    ],
    outcomes: [
      { value: "Multi-tenant", label: "Per-community data isolation" },
      { value: "90+ routes", label: "Resident + admin API workflows" },
      { value: "PWA", label: "Installable, offline-capable" },
    ],
    archStages: [
      { title: "Auth", detail: "NextAuth sessions over Firebase-backed data", items: ["NextAuth", "Firebase"] },
      { title: "Role-aware proxy", detail: "Derives role + community from the session, gates every route" },
      { title: "Resident app", detail: "Booking, QR access, maintenance, notifications", items: ["Recurring", "Waitlist", "QR"] },
      { title: "Admin tooling", detail: "Dashboards, ticket desk, analytics, operations", items: ["Recharts", "SLA watch"] },
      { title: "AI assistant", detail: "Gemini chatbot with session-derived permissions", items: ["Gemini"] },
      { title: "PWA shell", detail: "Serwist service worker, offline support, on Vercel" },
    ],
  },
  {
    slug: "machine-insight",
    index: "04",
    title: "MachineInsight Pro — Predictive Maintenance",
    summary:
      "A predictive-maintenance web app: feed in machine telemetry (torque, speed, temperature, tool wear) and get a failure-risk prediction in milliseconds. A Vercel serverless function proxies an IBM Watson AutoAI LightGBM model so the API key never reaches the browser.",
    tagline: "Telemetry in, failure-risk out — an IBM Watson AutoAI LightGBM model served through a Vercel serverless proxy.",
    category: "Predictive ML · Web App",
    year: "2025",
    role: "Full build",
    diagram: "pipeline",
    cardTags: ["Watson AutoAI", "LightGBM", "Vercel Functions", "Chart.js"],
    links: [
      { label: "Live demo", href: "https://machine-insight-pro.vercel.app/", kind: "demo" },
      { label: "Source", href: "https://github.com/saiabhinav001/machine-insight-pro", kind: "code" },
    ],
    stackGroups: {
      core: ["HTML5", "Tailwind CSS", "Chart.js", "GSAP"],
      infra: ["Vercel Serverless Functions", "Vercel"],
      ai: ["IBM Watson AutoAI", "LightGBM", "Automated HPO + feature engineering"],
    },
    problem:
      "Industrial maintenance is usually reactive — you fix a machine after it fails, and the downtime is expensive. Predicting failure from live telemetry needs a trained model, but calling it straight from the browser would expose the model's credentials and hit CORS limits.",
    approach:
      "I used IBM Watson AutoAI to generate, rank, and tune models on machine telemetry; it selected a LightGBM classifier with automated feature engineering and hyperparameter optimisation, reaching 99.4% F1-weighted accuracy. The browser sends five telemetry signals (torque, speed, temperature, tool wear, quality type) to a Vercel serverless function at /api/predict, which injects the IBM credentials server-side and forwards the request to the Watson AutoAI endpoint. The result comes back to a glass-morphism UI with Chart.js gauges and GSAP animations.",
    decisions: [
      {
        title: "A serverless proxy to hide the model key",
        body: "Calling Watson directly from the browser would leak the API key and break on CORS. A Vercel function injects the credential server-side, so the secret never reaches the client.",
      },
      {
        title: "AutoAI to find the model",
        body: "Watson AutoAI ranked multiple pipelines and selected a LightGBM classifier with engineered features and tuned hyperparameters, instead of me hand-picking a model.",
      },
      {
        title: "A telemetry-driven, real-time UI",
        body: "The UI takes the five telemetry signals and shows the failure-risk prediction immediately with gauges and charts, so an operator reads it at a glance.",
      },
    ],
    outcomes: [
      { value: "99.4%", label: "F1-weighted accuracy" },
      { value: "Milliseconds", label: "Telemetry to prediction" },
      { value: "Live", label: "Deployed on Vercel" },
    ],
    archStages: [
      { title: "Telemetry input", detail: "Torque, speed, temperature, tool wear, quality type" },
      { title: "Vercel serverless /api/predict", detail: "Injects IBM credentials server-side, forwards the request" },
      { title: "IBM Watson AutoAI", detail: "LightGBM classifier, automated feature engineering + HPO", items: ["LightGBM"] },
      { title: "Prediction", detail: "Failure-risk returned in milliseconds" },
      { title: "Dashboard", detail: "Glass-morphism UI with gauges and animations", items: ["Chart.js", "GSAP"] },
    ],
  },
];

export type Experience = {
  org: string;
  role: string;
  period: string;
  mode: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    org: "IBM SkillsBuild & Edunet Foundation",
    role: "Emerging Technologies Intern — Cloud, AI & Software",
    period: "Jul – Aug 2025",
    mode: "Remote",
    summary: "Built ML inference pipelines on IBM Cloud and the automation around them.",
    highlights: [
      "Built and deployed ML inference pipelines on IBM Cloud, with CI/CD workflows that retrained models automatically and removed the manual deploy steps.",
      "Refactored Python data-preprocessing into object-oriented modules, which made it easier to maintain and cut batch-job runtime.",
      "Worked across the build, test, and deploy cycle with Git and Agile to ship and debug services.",
    ],
  },
  {
    org: "Amazon ML Summer School 2025",
    role: "Selected Mentee — Machine Learning & AI",
    period: "Aug 2025",
    mode: "Remote",
    summary: "Picked nationally for Amazon's ML program, taught by their research scientists.",
    highlights: [
      "Selected through a competitive nationwide process for an intensive program covering supervised learning, deep learning, probabilistic models, and reinforcement learning, taught by Amazon research scientists.",
      "Worked through problem sets on optimization, distributed training, and large-scale inference, and how production ML handles latency and scale.",
    ],
  },
];

export const expertise = {
  groups: [
    {
      title: "AI & ML",
      items: ["LLM Application Development", "Agentic AI (GenW.AI)", "Multi-Agent Orchestration", "Retrieval / RAG", "sentence-transformers", "Predictive Modeling", "LightGBM (Watson AutoAI)", "Qwen3", "spaCy"],
    },
    {
      title: "Backend & APIs",
      items: ["FastAPI", "Next.js Route Handlers", "Node.js", "REST APIs", "NextAuth", "Background workers", "System Design", "Object-Oriented Design"],
    },
    {
      title: "Search & data",
      items: ["FAISS Vector Search", "Typesense (BM25)", "Hybrid Search + Reranking", "Embeddings & Retrieval", "Redis", "PostgreSQL", "Firebase Firestore"],
    },
    {
      title: "Cloud & infra",
      items: ["Vercel", "Hugging Face Spaces", "Serverless Functions", "Docker", "CI/CD", "Blue-green deploys", "Google Cloud", "IBM Cloud", "Oracle Cloud (OCI)"],
    },
  ],
  languages: ["Python", "Java", "TypeScript", "SQL", "C", "JavaScript", "R"],
} as const;

export const recognition = {
  awards: [
    {
      title: "National 2nd Prize — Deloitte Hacksplosion 2026",
      org: "Deloitte",
      detail: "Top 2 of 22,000+ applicants: Top 60, then Top 10 national finalists, then 2nd place (INR 1,00,000), for the agentic case-law project.",
    },
    {
      title: "Winner, 1st Prize — Sudhee 2026 Hackathon",
      org: "Sudhee",
      detail: "Won for HireLog, judged on engineering depth, system design, and algorithms.",
    },
    {
      title: "Selected Mentee — Amazon ML Summer School 2025",
      org: "Amazon",
      detail: "Picked through a nationwide process for Amazon's ML program, taught by their research scientists.",
    },
  ],
  certifications: [
    { name: "Oracle Generative AI Professional", code: "1Z0-1127-25" },
    { name: "OCI AI Foundations Associate", code: "1Z0-1122-25" },
    { name: "Salesforce Agentforce Specialist", code: "AI-201" },
    { name: "MongoDB Associate Developer", code: "C100DEV" },
  ],
} as const;

export const education = {
  school: "Chaitanya Bharathi Institute of Technology",
  degree: "B.E. — Artificial Intelligence & Data Science",
  location: "Hyderabad, India",
  graduation: "Graduating 2027",
  eligibility: "Open to 2026 internships & new-grad roles",
} as const;

/**
 * Section headings — the single source of truth for every section's index,
 * kicker, and title. Components read from here so positioning never drifts.
 */
export const sections = {
  about: {
    index: "02",
    kicker: "About",
    title: "I build AI systems, full-stack products, and search infrastructure.",
  },
  work: {
    index: "03",
    kicker: "Selected work",
    title: "Four projects I've built.",
    description: "Open any one to see how it's built and how it turned out.",
  },
  experience: {
    index: "04",
    kicker: "Experience",
    title: "IBM internship and Amazon ML School.",
  },
  expertise: {
    index: "05",
    kicker: "Technical skills",
    title: "What I work with.",
  },
  recognition: {
    index: "06",
    kicker: "Recognition",
    title: "Awards and certifications.",
  },
  contact: {
    index: "07",
    kicker: "Contact",
    title: "Open to AI and software roles.",
  },
} as const;

export const navItems = [
  { index: "01", label: "Home", href: "/#top" },
  { index: "02", label: "About", href: "/#about" },
  { index: "03", label: "Work", href: "/#work" },
  { index: "04", label: "Experience", href: "/#experience" },
  { index: "05", label: "Skills", href: "/#expertise" },
  { index: "06", label: "Recognition", href: "/#recognition" },
  { index: "07", label: "Contact", href: "/#contact" },
] as const;

export const meta = {
  title: "Sai Abhinav Sadineni — AI & Software Engineer",
  description:
    "Sai Abhinav Sadineni builds AI systems and the full-stack apps around them: agentic LLM pipelines, hybrid search infrastructure, a multi-tenant SaaS, and predictive ML. Based in Hyderabad, graduating 2027.",
  url: SITE_URL,
  keywords: [
    "Sai Abhinav Sadineni",
    "AI Engineer",
    "Software Engineer",
    "Systems Builder",
    "Agentic AI",
    "Multi-Agent Systems",
    "Hybrid Search",
    "FastAPI",
    "FAISS",
    "Typesense",
    "Multi-tenant SaaS",
    "LightGBM",
  ],
} as const;
