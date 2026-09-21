export interface TechItem {
  slug?: string;
  name: string;
  iconUrl: string;
  description?: string;
  useCase?: string;
  badge?: string;
}

export interface TechCategory {
  id?: string;
  title: string;
  description: string;
  categoryIcon: string;
  themeColor: string;
  technologies?: TechItem[];
}

export const staticCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "High-performance, responsive single-page applications and server-rendered web portals.",
    categoryIcon: "Code2",
    themeColor: "blue",
    technologies: [
      { name: "React.js", iconUrl: "IconBrandReact", description: "Virtual DOM & component-based UI engineering", useCase: "SPAs & Dashboards", badge: "Core Stack" },
      { name: "Next.js", iconUrl: "IconBrandNextjs", description: "Server-side rendering (SSR) & Static Site Generation (SSG)", useCase: "SEO & High Traffic Web", badge: "Production Standard" },
      { name: "TypeScript", iconUrl: "IconBrandTypescript", description: "Strongly typed JavaScript for enterprise scalability", useCase: "Type Safety & Refactoring", badge: "Enterprise Grade" },
      { name: "Tailwind CSS", iconUrl: "IconBrandTailwind", description: "Utility-first CSS framework for custom responsive styling", useCase: "Design System & Micro-animations", badge: "Styling Standard" },
      { name: "Vue.js", iconUrl: "IconBrandVue", description: "Progressive framework for building modern web interfaces", useCase: "Interactive Frontends", badge: "Popular" },
      { name: "Angular", iconUrl: "IconBrandAngular", description: "Full-featured platform for enterprise web applications", useCase: "Complex Enterprise Apps", badge: "Enterprise" },
    ],
  },
  {
    id: "backend",
    title: "Backend & API Architecture",
    description: "Scalable, secure, and resilient backend microservices, REST APIs, and GraphQL endpoints.",
    categoryIcon: "Server",
    themeColor: "purple",
    technologies: [
      { name: "Node.js", iconUrl: "IconBrandNodejs", description: "Non-blocking event-driven JavaScript runtime", useCase: "Real-time APIs & WebSockets", badge: "Core Backend" },
      { name: "Express.js", iconUrl: "IconCode", description: "Fast, unopinionated web framework for Node.js", useCase: "RESTful API Endpoints", badge: "Standard API" },
      { name: "Python", iconUrl: "IconBrandPython", description: "High-level language for backend services and AI pipelines", useCase: "FastAPI & AI Services", badge: "AI Native" },
      { name: "Go (Golang)", iconUrl: "IconBrandGolang", description: "Compiled language engineered for high concurrency", useCase: "High Concurrency Microservices", badge: "High Speed" },
      { name: "GraphQL", iconUrl: "IconBrandGraphql", description: "Query language for APIs ensuring precise data fetching", useCase: "Flexible API Queries", badge: "Modern Query" },
      { name: "PostgreSQL", iconUrl: "IconDatabase", description: "Advanced open-source relational database", useCase: "ACID Transactions & Relational Data", badge: "Primary DB" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Cross-platform and native mobile applications with biometric security and smooth 60fps UI.",
    categoryIcon: "Smartphone",
    themeColor: "green",
    technologies: [
      { name: "Flutter", iconUrl: "IconBrandFlutter", description: "Google's UI toolkit for compiling native mobile apps", useCase: "Single Codebase iOS & Android", badge: "Top Pick" },
      { name: "React Native", iconUrl: "IconBrandReact", description: "Native mobile development using React components", useCase: "Cross-Platform Mobile Apps", badge: "Popular" },
      { name: "Swift", iconUrl: "IconBrandSwift", description: "Apple's powerful programming language for iOS/macOS", useCase: "Native iOS Apps", badge: "Apple Native" },
      { name: "Kotlin", iconUrl: "IconBrandKotlin", description: "Modern concise language for Android mobile apps", useCase: "Native Android Apps", badge: "Android Native" },
      { name: "Firebase", iconUrl: "IconBrandFirebase", description: "Backend-as-a-Service for realtime DB and notifications", useCase: "Realtime Data & Auth", badge: "Cloud BaaS" },
      { name: "PWA", iconUrl: "IconGlobe", description: "Progressive Web Apps working offline on mobile devices", useCase: "Browser Mobile Apps", badge: "Web Mobile" },
    ],
  },
  {
    id: "cms",
    title: "CMS & E-Commerce",
    description: "Headless Content Management Systems and high-converting e-commerce platforms.",
    categoryIcon: "ShoppingBag",
    themeColor: "orange",
    technologies: [
      { name: "Shopify Plus", iconUrl: "IconBrandShopify", description: "Enterprise e-commerce platform for global scaling", useCase: "Headless Stores & Checkout", badge: "E-Com Leader" },
      { name: "WordPress", iconUrl: "IconBrandWordpress", description: "World's most popular content management system", useCase: "Custom Theme & CMS", badge: "CMS Standard" },
      { name: "Strapi Headless", iconUrl: "IconLayers", description: "Open-source Node.js Headless CMS for API-first content", useCase: "Headless Content APIs", badge: "Headless CMS" },
      { name: "Sanity.io", iconUrl: "IconCode", description: "Real-time structured content platform for modern web", useCase: "Structured Content Studio", badge: "Modern Content" },
      { name: "WooCommerce", iconUrl: "IconBrandShopify", description: "Customizable e-commerce plugin built on WordPress", useCase: "Custom E-Commerce Stores", badge: "Flexible E-Com" },
      { name: "Magento", iconUrl: "IconShoppingBag", description: "Enterprise open-source e-commerce platform", useCase: "Large B2B Stores", badge: "Enterprise E-Com" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps Infrastructure",
    description: "Automated CI/CD deployment pipelines, containerization, and 99.99% uptime cloud hosting.",
    categoryIcon: "Cloud",
    themeColor: "blue",
    technologies: [
      { name: "AWS", iconUrl: "IconBrandAws", description: "Amazon Web Services cloud infrastructure and serverless", useCase: "Cloud Compute & S3 Storage", badge: "Cloud Leader" },
      { name: "Google Cloud", iconUrl: "IconCloud", description: "Google's cloud platform for AI workloads and Kubernetes", useCase: "GCP & BigQuery Analytics", badge: "AI Cloud" },
      { name: "Docker", iconUrl: "IconBrandDocker", description: "Containerization platform ensuring environment consistency", useCase: "Containerized Microservices", badge: "DevOps Standard" },
      { name: "Kubernetes", iconUrl: "IconCpu", description: "Automated container orchestration and auto-scaling", useCase: "Large Container Fleets", badge: "Auto Scaling" },
      { name: "Terraform", iconUrl: "IconTerminal", description: "Infrastructure as Code (IaC) for reproducible cloud", useCase: "Cloud Infrastructure Setup", badge: "IaC Standard" },
      { name: "Vercel", iconUrl: "IconBrandVercel", description: "Frontend cloud platform optimized for Next.js & Serverless", useCase: "Instant Global CDN Edge", badge: "Edge Deploy" },
    ],
  },
  {
    id: "ai",
    title: "Database & AI Models",
    description: "High-throughput vector databases, fine-tuned LLMs, and intelligent automation agents.",
    categoryIcon: "Cpu",
    themeColor: "purple",
    technologies: [
      { name: "OpenAI GPT-4", iconUrl: "IconCpu", description: "State-of-the-art Large Language Models for AI features", useCase: "Custom AI Assistants & Copilots", badge: "Generative AI" },
      { name: "Pinecone DB", iconUrl: "IconDatabase", description: "Managed vector database for semantic similarity search", useCase: "RAG & Knowledge Bases", badge: "Vector DB" },
      { name: "MongoDB", iconUrl: "IconBrandMongodb", description: "Document-oriented NoSQL database for flexible JSON schemas", useCase: "Unstructured Data & Fast Read", badge: "NoSQL Leader" },
      { name: "Redis", iconUrl: "IconDatabase", description: "In-memory data store for caching and pub/sub messaging", useCase: "Sub-millisecond Cache", badge: "Ultra Fast" },
      { name: "LangChain", iconUrl: "IconCode", description: "Framework for developing applications powered by LLMs", useCase: "AI Agent Chains & Tools", badge: "AI Framework" },
      { name: "TensorFlow", iconUrl: "IconCpu", description: "End-to-end open-source machine learning platform", useCase: "Custom Model Training", badge: "ML Standard" },
    ],
  },
];

