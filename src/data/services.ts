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
    slug: "web-development",
    title: "Web Development",
    description: "Build robust, responsive, and lightning-fast websites that drive results.",
    longDescription: "Our web development team builds tailored websites using the latest technologies. From interactive single-page applications (SPAs) to complex enterprise platforms, we ensure your web presence is fast, secure, and optimized for conversions.",
    benefits: [
      "Responsive and mobile-first design",
      "High performance and fast load times",
      "SEO-friendly architectures",
      "Robust security and content management"
    ],
    process: [
      { step: "Planning", detail: "Defining site structure and tech stack." },
      { step: "Development", detail: "Coding the frontend and backend architectures." },
      { step: "Testing", detail: "Quality assurance across devices and browsers." },
      { step: "Launch", detail: "Going live and monitoring performance." }
    ]
  },
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
    slug: "search-engine-optimization",
    title: "Search Engine Optimization (SEO)",
    description: "Dominate search results and drive organic traffic to your business.",
    longDescription: "A great website is useless if no one can find it. Our SEO experts use data-driven strategies to improve your search engine rankings, increase organic traffic, and drive qualified leads to your business through on-page optimization, technical SEO, and content strategies.",
    benefits: [
      "Higher search engine rankings",
      "Increased organic traffic",
      "Targeted keyword optimization",
      "Comprehensive technical SEO audits"
    ],
    process: [
      { step: "Audit", detail: "Identifying technical and content gaps." },
      { step: "Strategy", detail: "Keyword research and competitor analysis." },
      { step: "Implementation", detail: "On-page and technical optimizations." },
      { step: "Reporting", detail: "Monthly performance and ranking reports." }
    ]
  },
  {
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    description: "Scale your online sales with custom, high-converting ecommerce platforms globally.",
    longDescription: "We build powerful online stores that are designed to convert. Whether you need a custom Shopify build, WooCommerce integration, or a headless ecommerce solution, we create global shopping experiences that keep your customers coming back.",
    benefits: [
      "Custom shopping experiences",
      "Secure payment gateway integrations",
      "Inventory and order management",
      "Global scaling and fast checkouts"
    ],
    process: [
      { step: "Strategy", detail: "Analyzing target market and product catalog." },
      { step: "Design", detail: "Creating a seamless shopping journey." },
      { step: "Integration", detail: "Connecting payment and shipping providers." },
      { step: "Optimization", detail: "Post-launch conversion rate optimization." }
    ]
  }
];
