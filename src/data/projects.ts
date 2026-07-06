export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  result: string;
  featured: boolean;
  client: string;
  timeline: string;
  challenge: string;
  solution: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "global-fintech-platform",
    title: "Global FinTech Platform",
    category: "Web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    tags: ["React", "Node.js", "PostgreSQL"],
    result: "Increased transaction volume by 150%",
    featured: true,
    client: "FinServe Global",
    timeline: "6 Months",
    challenge: "The client needed a scalable web platform capable of handling thousands of concurrent financial transactions securely without latency.",
    solution: "We engineered a robust microservices architecture using Node.js and PostgreSQL. The frontend was built with React for a seamless, real-time dashboard experience. We implemented stringent encryption protocols and load balancing to ensure maximum security and uptime.",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: 2,
    slug: "healthcare-booking-app",
    title: "Healthcare Booking App",
    category: "App",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
    tags: ["Flutter", "Firebase"],
    result: "10k+ active daily users",
    featured: true,
    client: "MediCare Plus",
    timeline: "4 Months",
    challenge: "Patients found it difficult to book appointments quickly. The client required a fast, intuitive mobile application for both iOS and Android platforms.",
    solution: "Using Flutter, we delivered a cross-platform mobile application with a native feel. We integrated Firebase for real-time notifications and real-time database syncing, allowing patients to see live doctor availability.",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: 3,
    slug: "luxury-fashion-store",
    title: "Luxury Fashion Store",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
    tags: ["Shopify", "Tailwind CSS"],
    result: "30% higher conversion rate",
    featured: false,
    client: "Aura Boutique",
    timeline: "3 Months",
    challenge: "The client's previous e-commerce store was slow and didn't reflect their premium brand identity, leading to high cart abandonment rates.",
    solution: "We designed a bespoke Shopify headless storefront using a modern frontend stack. We focused heavily on high-quality imagery, micro-animations, and a frictionless checkout experience.",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: 4,
    slug: "logistics-dashboard",
    title: "Logistics Dashboard",
    category: "Web",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
    tags: ["Vue.js", "Express"],
    result: "Optimized route planning",
    featured: false,
    client: "Swift Logistics",
    timeline: "5 Months",
    challenge: "Tracking hundreds of delivery vehicles manually was inefficient and prone to errors.",
    solution: "We built a real-time tracking dashboard utilizing WebSockets for live location updates. The intuitive UI allowed dispatchers to manage routes and driver assignments seamlessly.",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: 5,
    slug: "fitness-tracker-app",
    title: "Fitness Tracker App",
    category: "App",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1000",
    tags: ["React Native", "Redux"],
    result: "4.8/5 App Store Rating",
    featured: false,
    client: "FitLife",
    timeline: "6 Months",
    challenge: "The client wanted an app that could sync with various wearables and provide detailed analytics for users' workouts.",
    solution: "We developed a React Native application that leverages native health APIs (Apple HealthKit & Google Fit). The app features a gamified UI to keep users engaged and motivated.",
    gallery: [
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: 6,
    slug: "b2b-saas-portal",
    title: "B2B SaaS Portal",
    category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    tags: ["Next.js", "Prisma"],
    result: "$2M+ processed monthly",
    featured: false,
    client: "Enterprise Solutions Co.",
    timeline: "8 Months",
    challenge: "The client needed a multi-tenant SaaS application that allowed other businesses to manage their HR processes securely.",
    solution: "We utilized Next.js for SSR performance and SEO benefits, coupled with Prisma ORM for type-safe database access. We implemented robust role-based access control (RBAC) and Stripe integration for subscription management.",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    ]
  },
];
