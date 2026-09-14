import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
  Server,
  Globe,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import SubBanner from "@/components/site/SubBanner";
import { useContent } from "@/lib/content/useContent";

interface TechnologyDetail {
  slug: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  overview: string;
  benefits: { title: string; desc: string; icon: any }[];
  keyFeatures: string[];
  useCases: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const technologiesData: Record<string, TechnologyDetail> = {
  react: {
    slug: "react",
    name: "React.js Engineering",
    category: "Frontend Architecture",
    badge: "Core Frontend Stack",
    tagline: "Building lightning-fast, component-driven web user interfaces",
    overview:
      "React.js is the world's leading JavaScript library for crafting component-based, dynamic single-page applications (SPAs). At Adat Soft Solutions, we leverage React's Virtual DOM, Hooks, and modern state management (Zustand / Redux) to build ultra-responsive dashboards, SaaS portals, and web apps optimized for scale.",
    benefits: [
      {
        title: "Virtual DOM High Speed",
        desc: "Minimizes real DOM re-renders to ensure silky-smooth 60fps UI interactions.",
        icon: Zap,
      },
      {
        title: "Component Reusability",
        desc: "Modular design systems that reduce development time and maintain code consistency.",
        icon: Layers,
      },
      {
        title: "Rich Ecosystem",
        desc: "Seamless integration with Next.js, GraphQL, React Query, and Tailwind CSS.",
        icon: Code2,
      },
      {
        title: "Enterprise Ready",
        desc: "Proven stability backed by Meta, powering millions of high-volume web portals.",
        icon: ShieldCheck,
      },
    ],
    keyFeatures: [
      "Declarative UI Components & JSX Syntax",
      "Virtual DOM Reconciliation & Concurrent Mode",
      "State Management with Zustand, Redux Toolkit & React Query",
      "Custom React Hooks for Clean Business Logic",
      "Webpack & Vite Fast HMR Build Pipelines",
      "Comprehensive Jest & Cypress Automated Test Suites",
    ],
    useCases: [
      {
        title: "B2B & Enterprise SaaS Dashboards",
        desc: "Real-time analytics platforms with complex data grids, interactive charts, and live WebSockets.",
      },
      {
        title: "High-Traffic Web Applications",
        desc: "Interactive customer-facing web apps requiring sub-second client-side rendering.",
      },
      {
        title: "E-Commerce Frontends",
        desc: "Headless e-commerce user experiences paired with Shopify or custom REST APIs.",
      },
      {
        title: "Progressive Web Apps (PWAs)",
        desc: "Installable web apps offering native mobile app experiences directly inside mobile browsers.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Architecture & Component Tree Blueprint",
        desc: "Defining reusable UI atomic components, design system tokens, and state flow.",
      },
      {
        step: "02",
        title: "Type-Safe Development Sprints",
        desc: "Coding clean React TypeScript components with strict props and API interfaces.",
      },
      {
        step: "03",
        title: "Performance Tuning & Virtualization",
        desc: "Optimizing bundle sizes, code-splitting, lazy loading, and list virtualization.",
      },
      {
        step: "04",
        title: "CI/CD & Cloud Edge Deployment",
        desc: "Automated deployment to Vercel/AWS CloudFront with global CDN edge caching.",
      },
    ],
    faqs: [
      {
        q: "Why choose React.js over traditional JavaScript for web development?",
        a: "React organizes code into modular, reusable components and uses a Virtual DOM. This drastically speeds up UI rendering, simplifies code maintenance, and allows building complex web apps much faster.",
      },
      {
        q: "Do you build type-safe React applications with TypeScript?",
        a: "Yes! 100% of our React applications are written in TypeScript to guarantee type safety, catch bugs at compile-time, and make long-term maintenance seamless.",
      },
    ],
  },
  nextjs: {
    slug: "nextjs",
    name: "Next.js Framework",
    category: "Full-Stack & SSR",
    badge: "Production Standard",
    tagline: "The React framework for high-performance, SEO-optimized web applications",
    overview:
      "Next.js by Vercel extends React with Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Server Actions. We use Next.js to deliver sub-second page loads, Lighthouse 95+ performance scores, and top search engine rankings.",
    benefits: [
      {
        title: "Sub-Second Page Loads",
        desc: "Server-side rendering and static pre-rendering for instant page load speeds.",
        icon: Zap,
      },
      {
        title: "Max SEO Indexability",
        desc: "HTML generated on the server so search engine crawlers can index 100% of your content.",
        icon: Globe,
      },
      {
        title: "Full-Stack Server Actions",
        desc: "Build secure backend API routes and server actions directly alongside frontend code.",
        icon: Server,
      },
      {
        title: "Global Edge CDN",
        desc: "Deploys automatically to global Vercel or AWS CloudFront edge networks.",
        icon: ShieldCheck,
      },
    ],
    keyFeatures: [
      "App Router & Server Components (RSC)",
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "Incremental Static Regeneration (ISR) for instant updates",
      "Built-in Image & Font Optimization",
      "Route Handlers & Server Actions for Backend Logic",
      "Edge Middleware for Auth & Localized Routing",
    ],
    useCases: [
      {
        title: "Content-Rich Agency & Brand Portals",
        desc: "SEO-dominant websites requiring 100% Google search indexability and fast speed.",
      },
      {
        title: "Headless E-Commerce Frontends",
        desc: "Fast shopping experiences connected to Shopify Plus or Strapi Headless CMS.",
      },
      {
        title: "Enterprise Web Applications",
        desc: "Scalable web platforms combining secure authenticated dashboards with public marketing pages.",
      },
      {
        title: "Digital Publishing & Media Blogs",
        desc: "Blogs and news portals serving millions of pages daily with ISR caching.",
      },
    ],
    process: [
      {
        step: "01",
        title: "App Router & SSR Architecture",
        desc: "Designing server components vs client components for optimal rendering performance.",
      },
      {
        step: "02",
        title: "API Route & Server Action Setup",
        desc: "Connecting databases, authentication systems, and external payment APIs.",
      },
      {
        step: "03",
        title: "SEO & Core Web Vitals Audit",
        desc: "Optimizing images, fonts, meta tags, and structured JSON-LD schemas.",
      },
      {
        step: "04",
        title: "Vercel / AWS Edge Deployment",
        desc: "Setting up automated GitHub deployment pipelines with global CDN edge caching.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between React.js and Next.js?",
        a: "React is a client-side JavaScript library for building user interfaces. Next.js is a full-stack framework built on top of React that adds Server-Side Rendering (SSR), automatic route handling, built-in SEO optimizations, and server backend routes.",
      },
      {
        q: "Is Next.js suitable for enterprise-scale applications?",
        a: "Absolutely. Next.js powers major global platforms including Target, Hulu, Nike, and Notion due to its high security, edge performance, and seamless scalability.",
      },
    ],
  },
  nodejs: {
    slug: "nodejs",
    name: "Node.js Backend",
    category: "Backend & Microservices",
    badge: "Core Backend",
    tagline: "High-concurrency, asynchronous backend services & microservices",
    overview:
      "Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. Its event-driven, non-blocking I/O model makes it lightweight and ultra-efficient for building real-time microservices, REST APIs, and WebSockets capable of handling millions of concurrent requests.",
    benefits: [
      {
        title: "Non-Blocking I/O",
        desc: "Event loop architecture that handles massive concurrent requests with low memory footprint.",
        icon: Zap,
      },
      {
        title: "Unified Tech Stack",
        desc: "JavaScript/TypeScript on both frontend and backend for faster development cycles.",
        icon: Code2,
      },
      {
        title: "Microservices Ready",
        desc: "Lightweight containerized services that auto-scale independently in Docker/Kubernetes.",
        icon: Server,
      },
      {
        title: "Vast Package Ecosystem",
        desc: "Access to npm's massive ecosystem of battle-tested enterprise modules.",
        icon: Layers,
      },
    ],
    keyFeatures: [
      "Asynchronous Event Loop Architecture",
      "Express.js & Nest.js Enterprise Frameworks",
      "Real-time WebSockets & Socket.io Integration",
      "Prisma & TypeORM Database Abstraction",
      "JWT & OAuth2 Multi-Factor Security",
      "Docker & Kubernetes Container Deployment",
    ],
    useCases: [
      {
        title: "Real-time Chat & Notification Services",
        desc: "Instant messaging, live notifications, and real-time streaming backends.",
      },
      {
        title: "High-Volume RESTful & GraphQL APIs",
        desc: "APIs connecting web, mobile, and third-party partner integrations seamlessly.",
      },
      {
        title: "FinTech & Payment Processing Systems",
        desc: "Secure transaction processing microservices integrated with Stripe and banking gateways.",
      },
      {
        title: "IoT Data Aggregation Engines",
        desc: "Collecting and processing continuous sensor data telemetry streams in real time.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Microservices Architecture & DB Design",
        desc: "Designing schema models, API contracts, and security authorization layers.",
      },
      {
        step: "02",
        title: "TypeScript Backend Coding",
        desc: "Writing modular controllers, services, middleware, and database ORM queries.",
      },
      {
        step: "03",
        title: "Security Penetration & Load Testing",
        desc: "Testing API throughput under peak traffic loads and hardening OWASP endpoints.",
      },
      {
        step: "04",
        title: "Docker & AWS ECS Cloud Launch",
        desc: "Containerizing services and deploying with automated cloud load balancers.",
      },
    ],
    faqs: [
      {
        q: "Is Node.js fast enough for enterprise-scale workloads?",
        a: "Yes. Companies like PayPal, Netflix, Uber, and LinkedIn use Node.js to power their primary backend APIs. Its asynchronous non-blocking event loop handles thousands of requests per second with low latency.",
      },
      {
        q: "Which frameworks do you use with Node.js?",
        a: "We use Express.js for clean REST/GraphQL APIs and Nest.js for structured enterprise microservices built with TypeScript.",
      },
    ],
  },
  flutter: {
    slug: "flutter",
    name: "Flutter Mobile Apps",
    category: "Mobile App Engineering",
    badge: "Cross-Platform Leader",
    tagline: "Compiling native iOS and Android apps from a single clean codebase",
    overview:
      "Flutter is Google's open-source UI software development kit for crafting natively compiled, beautiful mobile applications for iOS, Android, and Web from a single codebase. With Dart and Skia graphics engine, Flutter delivers pixel-perfect 60fps native performance.",
    benefits: [
      {
        title: "Single Codebase Efficiency",
        desc: "Build iOS and Android apps simultaneously, cutting development costs by up to 40%.",
        icon: Zap,
      },
      {
        title: "Native 60fps Performance",
        desc: "Direct compilation to ARM native machine code with Skia/Impeller rendering engines.",
        icon: Cpu,
      },
      {
        title: "Custom UI Customization",
        desc: "Pixel-perfect widget library providing custom branded UI components across devices.",
        icon: Layers,
      },
      {
        title: "Hot Reload Productivity",
        desc: "Sub-second code iteration during development for rapid feature deployment.",
        icon: Code2,
      },
    ],
    keyFeatures: [
      "Dart Programming Language with Sound Null Safety",
      "Skia & Impeller High Performance Graphics Engines",
      "Provider, BLoC & Riverpod State Management",
      "Native iOS & Android Hardware Module Integration (Camera, GPS, Bluetooth)",
      "Firebase & Custom REST/GraphQL API Connectors",
      "Automated App Store & Google Play Publishing Pipelines",
    ],
    useCases: [
      {
        title: "On-Demand Delivery & Booking Apps",
        desc: "Real-time GPS tracking, instant booking, and push notification mobile apps.",
      },
      {
        title: "Telehealth & Medical Apps",
        desc: "HIPAA-compliant video consultation, appointment booking, and lab result apps.",
      },
      {
        title: "FinTech & Digital Wallet Apps",
        desc: "Biometric login (Face ID/Fingerprint), encrypted transactions, and wallet balances.",
      },
      {
        title: "Social & Community Platforms",
        desc: "Media sharing, messaging, user profiles, and real-time activity feeds.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Mobile UI/UX Wireframing & Design",
        desc: "Creating interactive mobile prototypes adhering to iOS Human Interface & Android Material guidelines.",
      },
      {
        step: "02",
        title: "Flutter Dart App Engineering",
        desc: "Building modular widgets, state management, and native device plugins.",
      },
      {
        step: "03",
        title: "Cross-Device Testing & QA",
        desc: "Testing performance across diverse physical iPhone and Android device models.",
      },
      {
        step: "04",
        title: "App Store & Play Store Publishing",
        desc: "Managing developer accounts, certificates, privacy disclosures, and store approval.",
      },
    ],
    faqs: [
      {
        q: "Does Flutter perform as well as native Swift or Kotlin?",
        a: "Yes! Unlike web view wrappers, Flutter compiles directly to native ARM machine code and uses its own rendering engine. Users experience smooth 60fps to 120fps animations identical to native apps.",
      },
      {
        q: "Can Flutter apps access device hardware like Camera, GPS, and Bluetooth?",
        a: "Absolutely. Flutter has robust native channel plugins connecting directly to native iOS (Swift/Objective-C) and Android (Kotlin/Java) APIs.",
      },
    ],
  },
  aws: {
    slug: "aws",
    name: "AWS Cloud Infrastructure",
    category: "Cloud & DevOps",
    badge: "Cloud Leader",
    tagline: "Scalable, secure, and auto-healing cloud infrastructure on Amazon Web Services",
    overview:
      "Amazon Web Services (AWS) provides reliable, scalable, and cost-effective cloud computing services. At Adat Soft Solutions, we design Infrastructure as Code (Terraform), serverless architectures (AWS Lambda), and containerized deployments (ECS/EKS) with 99.99% uptime SLAs.",
    benefits: [
      {
        title: "Global Scalability",
        desc: "Auto-scale from hundreds to millions of users seamlessly across global regions.",
        icon: Server,
      },
      {
        title: "Serverless Cost Savings",
        desc: "Pay only for exact compute time consumed with AWS Lambda and Fargate.",
        icon: Zap,
      },
      {
        title: "Bank-Grade Security",
        desc: "IAM policies, VPC network isolation, WAF firewall, and automated encryption.",
        icon: ShieldCheck,
      },
      {
        title: "Zero-Downtime Releases",
        desc: "Automated CI/CD pipelines with blue/green deployment strategy.",
        icon: CheckCircle2,
      },
    ],
    keyFeatures: [
      "AWS EC2, ECS & EKS Container Orchestration",
      "AWS Lambda & API Gateway Serverless Compute",
      "Amazon RDS (PostgreSQL/MySQL) & DynamoDB Scaling",
      "AWS CloudFront & S3 Global Content Delivery Network",
      "Terraform Infrastructure as Code (IaC)",
      "AWS CloudWatch & GuardDuty Observability and Security",
    ],
    useCases: [
      {
        title: "High-Volume SaaS Platforms",
        desc: "Multi-tenant cloud applications with auto-scaling compute and isolated database instances.",
      },
      {
        title: "E-Commerce Cloud Backends",
        desc: "High-availability cloud infrastructure engineered to handle Black Friday traffic spikes without downtime.",
      },
      {
        title: "Big Data & AI Pipelines",
        desc: "Scalable data ingestion pipelines utilizing AWS S3, Glue, and Redshift analytics.",
      },
      {
        title: "Disaster Recovery & Backup Systems",
        desc: "Automated multi-region database backups and failover mechanisms.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Cloud Architecture & Cost Audit",
        desc: "Designing secure VPC networks, IAM roles, and optimizing cloud spending.",
      },
      {
        step: "02",
        title: "Terraform IaC Provisioning",
        desc: "Codifying all cloud resources into reusable, version-controlled Terraform scripts.",
      },
      {
        step: "03",
        title: "Containerization & CI/CD Pipeline",
        desc: "Setting up GitHub Actions pipelines to deploy Docker containers to AWS ECS/EKS.",
      },
      {
        step: "04",
        title: "24/7 Monitoring & SLA Uptime",
        desc: "Configuring CloudWatch alerts, automated failover triggers, and patch maintenance.",
      },
    ],
    faqs: [
      {
        q: "Why use Terraform with AWS?",
        a: "Terraform allows us to define your entire cloud infrastructure as code. This means your cloud setup is version-controlled, repeatable, easy to audit, and free from human error during deployment.",
      },
      {
        q: "How do you help optimize AWS cloud costs?",
        a: "We implement auto-scaling policies, leverage AWS Lambda serverless compute for idle workloads, use reserved/spot instances where appropriate, and set up CloudWatch budget alerts.",
      },
    ],
  },
  shopify: {
    slug: "shopify",
    name: "Shopify & Headless Commerce",
    category: "CMS & E-Commerce",
    badge: "E-Com Leader",
    tagline: "High-converting online stores built on Shopify Plus & Headless storefronts",
    overview:
      "Shopify is the premier e-commerce platform powering global retail brands. We build custom Liquid themes, private Shopify apps, and modern Headless Storefronts (Next.js + Shopify Storefront API) that maximize conversion rates, load in under 1 second, and scale effortlessly.",
    benefits: [
      {
        title: "High Conversion Rates",
        desc: "Frictionless checkout experience optimized for mobile buyers globally.",
        icon: Zap,
      },
      {
        title: "Headless Flexibility",
        desc: "Combine Next.js frontends with Shopify's robust backend order management.",
        icon: Layers,
      },
      {
        title: "Global Multi-Currency",
        desc: "Sell globally with automated tax calculation, localized currency, and shipping.",
        icon: Globe,
      },
      {
        title: "Secure Payments",
        desc: "PCI-DSS Level 1 compliant checkout supporting Apple Pay, Google Pay, and Credit Cards.",
        icon: ShieldCheck,
      },
    ],
    keyFeatures: [
      "Custom Shopify Theme Development (Liquid, HTML5, Tailwind)",
      "Headless Storefronts with Next.js & GraphQL Storefront API",
      "Private Shopify App & Middleware Development",
      "Shopify Plus Enterprise Expansion & Custom Checkouts",
      "ERP, CRM & Warehouse Management System (WMS) Integrations",
      "Speed & Conversion Rate Optimization (CRO)",
    ],
    useCases: [
      {
        title: "D2C Fashion & Lifestyle Brands",
        desc: "Visual-rich, fast online stores with custom product customizers and bundle builders.",
      },
      {
        title: "B2B E-Commerce Portals",
        desc: "Wholesale ordering portals with tiered volume pricing and custom payment terms.",
      },
      {
        title: "Global E-Commerce Expansion",
        desc: "Multi-language and multi-currency storefronts powered by Shopify Markets.",
      },
      {
        title: "Subscription Commerce",
        desc: "Recurring product subscription stores integrated with Recharge and Bold subscriptions.",
      },
    ],
    process: [
      {
        step: "01",
        title: "E-Commerce Strategy & UX Wireframing",
        desc: "Analyzing buyer personas, product catalog structure, and checkout funnels.",
      },
      {
        step: "02",
        title: "Custom Theme / Headless Coding",
        desc: "Developing custom responsive store layouts with sub-second page transitions.",
      },
      {
        step: "03",
        title: "Payment, Shipping & ERP Integration",
        desc: "Connecting Stripe/Shopify Payments, shipping gateways, and inventory software.",
      },
      {
        step: "04",
        title: "Conversion Audit & Store Launch",
        desc: "Performing speed optimization, A/B testing, and managing domain launch.",
      },
    ],
    faqs: [
      {
        q: "What is a Headless Shopify Storefront?",
        a: "A Headless store decouples the front-end design (built with Next.js) from the Shopify back-end. This gives you 100% design freedom, sub-second page speeds, and superior SEO performance while retaining Shopify's secure checkout.",
      },
      {
        q: "Can you migrate our existing store to Shopify?",
        a: "Yes. We handle end-to-end migrations from WooCommerce, Magento, BigCommerce, or custom platforms into Shopify, preserving all customer accounts, product data, order history, and SEO URL structures.",
      },
    ],
  },
};

export default function TechnologyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Normalize slug lookup
  const techKey = slug ? slug.toLowerCase().replace(/js$/, "").replace(/\.js$/, "") : "";
  const techDetail =
    technologiesData[techKey] ||
    technologiesData[slug || ""] ||
    Object.values(technologiesData).find((t) => t.slug === slug || t.name.toLowerCase().includes(slug?.toLowerCase() || "")) ||
    technologiesData.react; // Default fallback

  const { entries: publishedProjects } = useContent("projects");
  const relatedProjects = publishedProjects.filter(p => p.technologies.some(t => t.toLowerCase().includes(techDetail.name.toLowerCase()))).slice(0, 3);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white pb-10 md:pb-16">
      <SEO
        title={`${techDetail.name} | Technology Expertise`}
        description={techDetail.overview}
        keywords={`${techDetail.name}, Adat Soft Solutions, ${techDetail.category}, custom software development`}
      />

      {/* SubBanner Header */}
      <div className="pt-28 sm:pt-36">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link
            to="/technologies"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Technology Stack
          </Link>
        </div>
      </div>

      <SubBanner
        badge={techDetail.badge}
        title={techDetail.name}
        highlightTitle={techDetail.category}
        subtitle={techDetail.tagline}
      />

      {/* Overview & Key Benefits Section */}
      <section className="py-10 md:py-16 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center mb-16">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Technology Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Why We Engineer Products With {techDetail.name}
              </h2>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {techDetail.overview}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold px-6 py-3.5 rounded-full text-sm hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Consult {techDetail.name} Team
                </Link>
                <Link
                  to="/work"
                  className="border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold px-6 py-3.5 rounded-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center gap-2"
                >
                  View Featured Work <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 4 Benefits Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techDetail.benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Deliverables & Features List */}
          <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800 mb-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
              <Sparkles className="w-4 h-4" /> Engineering Capabilities
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Key Technical Features We Deliver with {techDetail.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techDetail.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-start gap-3 text-xs md:text-sm text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal Use Cases Grid */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Application Scenarios
              </span>
              <h2 className="text-3xl font-bold mt-4 text-neutral-900 dark:text-white">
                Ideal Use Cases for {techDetail.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techDetail.useCases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">
                    Use Case 0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Development Lifecycle Steps */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Delivery Pipeline
              </span>
              <h2 className="text-3xl font-bold mt-4 text-neutral-900 dark:text-white">
                Our {techDetail.name} Engineering Process
              </h2>
            </div>

            <div className="space-y-4">
              {techDetail.process.map((stepItem, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-extrabold flex items-center justify-center text-xs shrink-0">
                      {stepItem.step}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                        {stepItem.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 max-w-2xl leading-relaxed">
                        {stepItem.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full shrink-0">
                    Phase {idx + 1} Completed
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Projects Showcase */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Featured Projects Built With Modern Tech
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Explore production web and mobile apps engineered by Adat Soft Solutions.
                </p>
              </div>
              <Link
                to="/work"
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                View All Projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/work/${project.slug}`}
                  className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Technology FAQ Accordion */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-neutral-200 dark:border-neutral-800">
                <HelpCircle className="w-4 h-4 text-primary" />
                {techDetail.name} FAQ
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 max-w-4xl mx-auto">
              {techDetail.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? "border-primary/40 bg-neutral-50 dark:bg-neutral-900/60"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 flex items-center justify-between gap-4 text-left font-bold text-neutral-900 dark:text-white text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-primary" : "text-neutral-400"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/50 dark:border-neutral-800/50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Consultation CTA */}
          <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 text-center md:text-left z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Ready to Build with {techDetail.name}?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Let's Engineer Your {techDetail.name} Application
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Schedule a 30-minute discovery call with our senior tech leads to evaluate your architecture requirements and timeline.
              </p>
            </div>
            <Link
              to="/contact"
              className="z-10 bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-8 py-4 rounded-full text-sm shrink-0 transition-all shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              Schedule Tech Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
