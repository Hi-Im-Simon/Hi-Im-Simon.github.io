/** Public, editable site content. No proprietary screenshots or internal source code. */
export const profile = {
  name: "Szymon Stanisławski",
  businessName: "Szymon Stanisławski Software & AI",
  firstName: "Szymon",
  github: "https://github.com/Hi-Im-Simon",
  linkedin: "https://www.linkedin.com/in/szymon-stanis%C5%82awski-89715423a/",
  email: "contact@szymonstanislawski.eu",
};

export const projects = {
  rnaquanet: {
    demo: "https://rnaquanet.cs.put.poznan.pl/",
    source: "https://github.com/maciejbilinski/rnaquanet",
  },
  traveltactician: {
    source: "https://github.com/Hi-Im-Simon/TravelTactician",
  },
};

export type Field = "software" | "ai";

/** Only functional descriptions of commercial work belong in locale files. */
export const workEntries = [
  {
    id: "retail",
    category: "commercial",
    filter: "software",
    field: "software",
    tags: ["React", "TypeScript", ".NET", "SQL"],
  },
  {
    id: "aiTasks",
    category: "evaluation",
    filter: "ai",
    field: "ai",
    tags: ["AI training", "Prompt design"],
  },
  {
    id: "tooling",
    category: "commercial",
    filter: "software",
    field: "software",
    tags: ["React", "TypeScript", "CI/CD", "Web Workers"],
  },
  {
    id: "rna",
    category: "research",
    filter: "ai",
    field: "ai",
    tags: ["Python", "Machine learning", "RNA"],
    source: projects.rnaquanet.source,
    demo: projects.rnaquanet.demo,
    awardSource: "https://www.ptbi.org.pl/website/contests/winners/",
  },
  {
    id: "travel",
    category: "personal",
    filter: "software",
    field: "software",
    tags: ["React Native", "Expo"],
    source: projects.traveltactician.source,
  },
  {
    id: "payments",
    category: "commercial",
    filter: "software",
    field: "software",
    tags: ["PHP", "WordPress", "E-commerce", "Payment plugins"],
  },
  {
    id: "aiRubrics",
    category: "evaluation",
    filter: "ai",
    field: "ai",
    tags: ["Rubrics"],
  },
  {
    id: "aiEvaluation",
    category: "evaluation",
    filter: "ai",
    field: "ai",
    tags: ["LLM evaluation", "Code review"],
  },
  {
    id: "aiReports",
    category: "evaluation",
    filter: "ai",
    field: "ai",
    tags: ["Evaluation reports"],
  },
  {
    id: "aiReview",
    category: "evaluation",
    filter: "ai",
    field: "ai",
    tags: ["Rate & review"],
  },
] as const;

export type WorkEntry = (typeof workEntries)[number];

export const workFileNames = {
  retail: "retail-apps.md",
  tooling: "component-library.md",
  payments: "payment-plugins.md",
  aiTasks: "task-design.md",
  aiRubrics: "evaluation-rubrics.md",
  aiEvaluation: "model-evaluation.md",
  aiReports: "evaluation-reports.md",
  aiReview: "rate-and-review.md",
} as const;
export type WorkFileId = "readme" | keyof typeof workFileNames;
