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
  liveUrl?: string;
  metrics?: { value: string; label: string }[];
  testimonial?: string;
  testimonialAuthor?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "global-fintech-platform",
    title: "Global FinTech & Trading Platform",
    category: "Web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "AWS Kinesis"],
    result: "150% Increase in Transaction Processing Volume",
    featured: true,
    client: "FinServe Global Capital",
    timeline: "6 Months",
    challenge:
      "FinServe Global needed to modernize their core trading dashboard to handle over 50,000 sub-millisecond stock market transactions per minute while adhering to strict FINRA compliance, multi-factor security, and automated fraud prevention.",
    solution:
      "We engineered a distributed microservices ecosystem utilizing Node.js, Redis pub/sub caching, and PostgreSQL database sharding. The frontend dashboard was built using React with virtualized data grids and WebSockets for real-time price feeds. We implemented AES-256 field-level encryption and automated AWS failovers.",
    metrics: [
      { value: "50k+/min", label: "Real-time Transactions Processed" },
      { value: "99.99%", label: "System Availability SLA" },
      { value: "150%", label: "Increase in Daily Trading Volume" },
    ],
    testimonial:
      "Adat Soft Solutions delivered an architecture that transformed our core business. Their deep technical expertise in real-time systems and financial security is world-class.",
    testimonialAuthor: "Marcus Vance — Chief Technology Officer, FinServe Global",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    id: 2,
    slug: "healthcare-booking-app",
    title: "Telehealth & Doctor Appointment Ecosystem",
    category: "App",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    tags: ["Flutter", "Firebase", "WebRTC", "Node.js"],
    result: "10,000+ Active Daily Teleconsultations",
    featured: true,
    client: "MediCare Plus Network",
    timeline: "4 Months",
    challenge:
      "MediCare Plus required a HIPAA-compliant cross-platform mobile app allowing patients to schedule emergency appointments, access encrypted lab results, and conduct HD video consultations with specialist doctors without lag.",
    solution:
      "Using Flutter, we built a single codebase iOS and Android app integrated with WebRTC for zero-latency peer-to-peer video streaming. We built a secure Node.js backend with automated push notifications, calendar synchronization, and digital prescription generation.",
    metrics: [
      { value: "10,000+", label: "Daily Video Consultations" },
      { value: "4.9 / 5.0", label: "App Store & Play Store Rating" },
      { value: "< 2 Seconds", label: "Average Appointment Booking Time" },
    ],
    testimonial:
      "The mobile app built by Adat Soft Solutions scaled seamlessly overnight during peak patient demand. Their attention to UX and security is remarkable.",
    testimonialAuthor: "Dr. Elena Rostova — Medical Director, MediCare Plus",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    id: 3,
    slug: "luxury-fashion-store",
    title: "Luxury E-Commerce & Headless Storefront",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    tags: ["Shopify Plus", "Next.js", "Tailwind CSS", "Stripe"],
    result: "30% Higher Mobile Conversion Rate",
    featured: true,
    client: "Aura Luxury Boutique",
    timeline: "3 Months",
    challenge:
      "Aura Boutique faced high bounce rates on their traditional monolith storefront due to slow page load speeds (4.5s) and clunky mobile checkout flows.",
    solution:
      "We engineered a Headless E-Commerce storefront utilizing Next.js, Shopify GraphQL APIs, and Tailwind CSS. We implemented instant sub-second page transitions, 3D product previews, localized multi-currency checkout, and automated inventory sync.",
    metrics: [
      { value: "0.8 Seconds", label: "Page Load Time (90+ Lighthouse Score)" },
      { value: "+30%", label: "Conversion Rate Growth" },
      { value: "45%", label: "Reduction in Mobile Cart Abandonment" },
    ],
    testimonial:
      "Our website transformed from a standard online shop into an immersive brand experience. Sales jumped 30% within the first month of launch!",
    testimonialAuthor: "Sophia Laurent — Brand Director, Aura Boutique",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    id: 4,
    slug: "logistics-dashboard",
    title: "AI Logistics & Fleet Operations Center",
    category: "Web",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "Python", "WebSockets", "Mapbox GL"],
    result: "25% Savings in Fuel & Transit Time",
    featured: false,
    client: "Swift Express Logistics",
    timeline: "5 Months",
    challenge:
      "Swift Logistics operated 1,200 delivery trucks across 14 hubs with manual dispatching spreadsheets, leading to delayed shipments and route inefficiencies.",
    solution:
      "We built a real-time Fleet Management Command Center featuring Mapbox GL live GPS tracking, automated dynamic route optimization using Python OR-Tools, and automated SMS alerts to end-customers.",
    metrics: [
      { value: "1,200+", label: "Vehicles Tracked Simultaneously" },
      { value: "25%", label: "Reduction in Fleet Fuel Consumption" },
      { value: "98.4%", label: "On-Time Delivery Rate" },
    ],
    testimonial:
      "Adat Soft Solutions gave us complete visibility over our global supply chain. The real-time tracking dashboard is indispensable.",
    testimonialAuthor: "David Miller — VP Operations, Swift Express",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&q=80&w=1200",
    ],
    liveUrl: "https://swift-logistics-demo.vercel.app/",
  },
  {
    id: 5,
    slug: "fitness-tracker-app",
    title: "AI Powered Fitness & Nutrition Tracker",
    category: "App",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1200",
    tags: ["React Native", "Apple HealthKit", "TensorFlow Lite"],
    result: "500,000+ Downloads & 4.8 Rating",
    featured: false,
    client: "FitPulse Interactive",
    timeline: "6 Months",
    challenge:
      "FitPulse wanted a mobile app capable of analyzing meal photos using on-device computer vision to estimate macros instantly, while syncing continuous heart rate data from Apple Watch & Garmin wearables.",
    solution:
      "We created a React Native app with embedded TensorFlow Lite models for instant food photo recognition. We integrated Apple HealthKit and Google Health Connect APIs for background biometric data syncing.",
    metrics: [
      { value: "500k+", label: "Active Mobile Installs" },
      { value: "4.8 ★", label: "User Store Rating" },
      { value: "94%", label: "Meal Recognition Accuracy" },
    ],
    testimonial:
      "The computer vision feature built by Adat is our app's top selling point. Their mobile engineering team is top tier.",
    testimonialAuthor: "Rachel Adams — Founder & CEO, FitPulse",
    gallery: [
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    id: 6,
    slug: "b2b-saas-portal",
    title: "Enterprise Multi-Tenant HR SaaS",
    category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe Billing"],
    result: "$2M+ Monthly Recurring Revenue Processed",
    featured: false,
    client: "Workforce Enterprise Inc.",
    timeline: "8 Months",
    challenge:
      "Workforce Enterprise needed to migrate their legacy desktop HR software into a multi-tenant Cloud SaaS platform with localized payroll processing and role-based permissions for 200+ enterprise clients.",
    solution:
      "We architected a Next.js App Router application with database schema-per-tenant isolation using Prisma ORM. We integrated Stripe Billing for subscription tiers, automated PDF invoice generation, and SAML SSO authentication.",
    metrics: [
      { value: "$2M+", label: "Monthly Revenue Processed" },
      { value: "200+", label: "Enterprise Organizations Onboarded" },
      { value: "100%", label: "SOC2 Compliance Passed" },
    ],
    testimonial:
      "Adat Soft Solutions delivered our enterprise SaaS platform on schedule. Their code quality and architecture docs made our SOC2 audit seamless.",
    testimonialAuthor: "Jonathan Blake — Managing Director, Workforce Enterprise",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200",
    ],
  },
];
