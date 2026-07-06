export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  process: { step: string; detail: string }[];
}

export const services: Service[] = [
  {
    slug: "custom-app-development",
    title: "Custom App Development",
    description: "We build scalable, high-performance mobile applications tailored to your business needs.",
    longDescription: "Our custom application development service brings your unique ideas to life. Whether you need a native iOS, native Android, or a cross-platform solution using Flutter or React Native, our team of expert developers builds robust architectures capable of handling millions of users. We don't just write code; we engineer scalable solutions that grow with your business.",
    benefits: [
      "Native and Cross-Platform solutions",
      "Highly scalable backend architectures",
      "Seamless API integrations",
      "Stringent security and data protection"
    ],
    process: [
      { step: "Discovery", detail: "Understanding your goals and target audience." },
      { step: "Architecture", detail: "Designing the scalable database and cloud infrastructure." },
      { step: "Development", detail: "Agile sprints with regular client check-ins." },
      { step: "Deployment", detail: "App Store & Google Play Store submission." }
    ]
  },
  {
    slug: "modern-ui-ux-design",
    title: "Modern UI/UX Design",
    description: "Engage your users with stunning, intuitive, and modern user interfaces.",
    longDescription: "A great application is more than just code; it's a seamless experience. Our design team focuses on creating intuitive, accessible, and visually stunning interfaces that captivate users. We utilize modern design paradigms like glassmorphism, dynamic animations, and dark modes to ensure your digital product stands out in a crowded market.",
    benefits: [
      "User-centric design thinking",
      "Interactive prototypes and wireframes",
      "Brand consistency across all platforms",
      "Micro-animations for higher engagement"
    ],
    process: [
      { step: "Research", detail: "User personas and competitor analysis." },
      { step: "Wireframing", detail: "Mapping out the user journey." },
      { step: "UI Design", detail: "Applying colors, typography, and visual assets." },
      { step: "Handoff", detail: "Seamless transition to the development team." }
    ]
  },
  {
    slug: "data-driven-insights",
    title: "Data-Driven Insights",
    description: "Understand your users better with integrated analytics and performance tracking.",
    longDescription: "In the modern digital landscape, data is your most valuable asset. We integrate advanced analytics platforms into your applications, providing you with real-time dashboards and actionable insights. Understand user behavior, track conversion funnels, and make informed business decisions based on hard data.",
    benefits: [
      "Custom analytics dashboards",
      "Real-time user tracking",
      "Conversion rate optimization (CRO)",
      "Automated reporting"
    ],
    process: [
      { step: "Audit", detail: "Assessing your current data collection methods." },
      { step: "Integration", detail: "Implementing tracking codes and event triggers." },
      { step: "Visualization", detail: "Building custom dashboards for your team." },
      { step: "Optimization", detail: "A/B testing based on collected data." }
    ]
  },
  {
    slug: "global-cloud-deployment",
    title: "Global Cloud Deployment",
    description: "Deploy your applications globally with blazing fast cloud infrastructure ensuring 99.9% uptime.",
    longDescription: "We partner with top-tier cloud providers like AWS, Google Cloud, and Azure to ensure your applications are always fast, secure, and available. Our DevOps experts configure auto-scaling infrastructure, CI/CD pipelines, and robust security protocols so you can focus on your business while we handle the servers.",
    benefits: [
      "99.99% Guaranteed uptime",
      "Auto-scaling infrastructure",
      "Automated backups and disaster recovery",
      "Continuous Integration & Deployment (CI/CD)"
    ],
    process: [
      { step: "Assessment", detail: "Evaluating your traffic and computing needs." },
      { step: "Configuration", detail: "Setting up servers, databases, and CDN." },
      { step: "Migration", detail: "Safely moving your data with zero downtime." },
      { step: "Monitoring", detail: "24/7 proactive system monitoring." }
    ]
  },
];
