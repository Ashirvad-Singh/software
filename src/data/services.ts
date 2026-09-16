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
    slug: "web-app-development",
    title: "Web App Development",
    description: "Robust, responsive, and lightning-fast web applications built with modern frameworks to drive performance and growth.",
    longDescription: "Our web development team builds tailored web applications using React, Next.js, and modern cloud architectures. From interactive single-page applications (SPAs) to complex enterprise platforms, we ensure your web presence is fast, secure, and optimized for conversions.",
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
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Native iOS, Android, and cross-platform mobile solutions (Flutter & React Native) engineered for seamless user experiences.",
    longDescription: "End-to-end mobile app development for iOS and Android. Whether you need a native iOS/Android solution or cross-platform Flutter/React Native app, our expert developers build scalable architectures capable of handling millions of users.",
    benefits: [
      "Native iOS & Android development",
      "Flutter & React Native cross-platform apps",
      "Highly scalable cloud backend APIs",
      "App Store & Google Play Store publishing"
    ],
    process: [
      { step: "Discovery", detail: "Understanding goals and target audience." },
      { step: "Architecture", detail: "Designing scalable database and cloud backend." },
      { step: "Development", detail: "Agile sprints with regular client check-ins." },
      { step: "Deployment", detail: "App Store & Google Play Store submission." }
    ]
  },
  {
    slug: "ecommerce-development",
    title: "E-Commerce Solutions",
    description: "High-converting Shopify, WooCommerce, and custom online stores designed to streamline shopping and maximize revenue.",
    longDescription: "We build powerful online stores designed to convert. Whether you need a custom Shopify build, WooCommerce integration, or a headless e-commerce platform, we create global shopping experiences that keep your customers coming back.",
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
  },
  {
    slug: "cms-solutions",
    title: "CMS Solutions",
    description: "Flexible, easy-to-manage WordPress and headless CMS platforms tailored to your brand's content needs.",
    longDescription: "Empower your team with intuitive Content Management Systems. We specialize in custom WordPress theme development, headless CMS integrations (Strapi, Sanity), and scalable publishing platforms.",
    benefits: [
      "Easy content management & editing",
      "Custom WordPress themes & plugins",
      "Headless CMS architecture",
      "High performance & security"
    ],
    process: [
      { step: "Audit", detail: "Content requirements and workflow mapping." },
      { step: "Setup", detail: "CMS architecture and database design." },
      { step: "Development", detail: "Custom theme & component development." },
      { step: "Training", detail: "Team onboarding and launch." }
    ]
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "User research, wireframing, intuitive interfaces, and interactive prototypes designed around user needs.",
    longDescription: "We bring user needs and business goals together through research, intuitive interfaces, and interactive prototypes. From web platforms to mobile apps, we design digital experiences that feel natural and engaging to use.",
    benefits: [
      "User research & journey mapping",
      "Wireframes & interactive prototypes",
      "Design systems & component libraries",
      "Usability testing & optimization"
    ],
    process: [
      { step: "Research", detail: "User personas and competitive analysis." },
      { step: "Wireframes", detail: "UX layouts and navigation flow." },
      { step: "Visual Design", detail: "High-fidelity UI and design tokens." },
      { step: "Prototyping", detail: "Interactive testing and handoff." }
    ]
  },
  {
    slug: "qa-software-testing",
    title: "QA & Software Testing",
    description: "Rigorous automated testing, security audits, and manual QA to ensure flawless execution and zero-defect deployments.",
    longDescription: "Guarantee software quality and reliability before going live. Our QA engineers perform automated regression testing, manual functional testing, security audits, and multi-device performance tuning.",
    benefits: [
      "Automated & manual testing",
      "Cross-browser & cross-device QA",
      "Security audits & vulnerability scans",
      "Performance & load testing"
    ],
    process: [
      { step: "Test Plan", detail: "Defining test cases and criteria." },
      { step: "Execution", detail: "Running automated and manual test suites." },
      { step: "Reporting", detail: "Bug tracking and fix verification." },
      { step: "Sign-off", detail: "Final zero-defect release verification." }
    ]
  },
  // Placeholders for Mega Menu Services
  {
    slug: "shopify-development",
    title: "Shopify Development",
    description: "Build a highly converting Shopify e-commerce store.",
    longDescription: "We specialize in Shopify store setup, custom theme development, and performance optimization to maximize your sales.",
    benefits: ["Custom Themes", "App Integrations", "High Conversion Rate", "Mobile Optimized"],
    process: [{step: "Discovery", detail: "Store requirements"}, {step: "Design", detail: "UI/UX mockup"}, {step: "Build", detail: "Development phase"}, {step: "Launch", detail: "Go live"}]
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile experiences.",
    longDescription: "End-to-end mobile app development for iOS and Android, focusing on seamless user experience and robust performance.",
    benefits: ["Native iOS/Android", "React Native & Flutter", "High Performance", "Secure Architecture"],
    process: [{step: "Strategy", detail: "App goals"}, {step: "Design", detail: "Wireframing"}, {step: "Develop", detail: "Coding"}, {step: "Deploy", detail: "App Store Submission"}]
  },
  {
    slug: "iot",
    title: "IOT (Internet of Things)",
    description: "Connect your devices with smart IOT solutions.",
    longDescription: "We build scalable IOT architectures connecting hardware, software, and cloud to automate and monitor physical devices.",
    benefits: ["Real-time Monitoring", "Hardware Integration", "Cloud Connectivity", "Data Analytics"],
    process: [{step: "Hardware", detail: "Selecting sensors"}, {step: "Software", detail: "Firmware setup"}, {step: "Cloud", detail: "Data pipeline"}, {step: "Testing", detail: "End-to-end verification"}]
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning",
    description: "Intelligent AI/ML models to automate business processes.",
    longDescription: "Integrate predictive analytics, natural language processing, and computer vision to modernize your enterprise.",
    benefits: ["Predictive Analytics", "Process Automation", "Custom LLMs", "Data Driven Insights"],
    process: [{step: "Data", detail: "Collection & Cleaning"}, {step: "Model", detail: "Training algorithms"}, {step: "Evaluate", detail: "Accuracy check"}, {step: "Deploy", detail: "API integration"}]
  },
  {
    slug: "enterprise-app-development",
    title: "Enterprise App Development",
    description: "Scalable software for large organizations.",
    longDescription: "Bespoke enterprise software that streamlines operations, increases security, and improves team collaboration.",
    benefits: ["High Scalability", "Enterprise Security", "Legacy Integration", "24/7 Support"],
    process: [{step: "Audit", detail: "System analysis"}, {step: "Architecture", detail: "Scalable design"}, {step: "Build", detail: "Agile sprints"}, {step: "Maintenance", detail: "Ongoing updates"}]
  },
  {
    slug: "user-analytics",
    title: "User Analytics",
    description: "Understand your users with deep data analytics.",
    longDescription: "Implement tracking and visualize user behavior to make informed, data-driven decisions that grow your product.",
    benefits: ["Custom Dashboards", "Behavior Tracking", "Conversion Optimization", "A/B Testing"],
    process: [{step: "Setup", detail: "Tracking events"}, {step: "Collect", detail: "Gathering data"}, {step: "Analyze", detail: "Finding patterns"}, {step: "Optimize", detail: "Actionable insights"}]
  },
  {
    slug: "devops",
    title: "DevOps & Cloud",
    description: "Automate your infrastructure and deployment pipelines.",
    longDescription: "We implement CI/CD pipelines, containerization, and infrastructure as code to speed up your release cycles safely.",
    benefits: ["Faster Releases", "Automated Testing", "Zero Downtime", "High Availability"],
    process: [{step: "Audit", detail: "Current pipeline"}, {step: "Docker", detail: "Containerization"}, {step: "CI/CD", detail: "Automation setup"}, {step: "Monitor", detail: "Observability"}]
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    description: "Migrate and manage your applications in the cloud.",
    longDescription: "Expert cloud architecture and migration services on AWS, Google Cloud, and Azure to ensure reliability.",
    benefits: ["Cost Optimization", "Auto Scaling", "Disaster Recovery", "Global Reach"],
    process: [{step: "Plan", detail: "Migration strategy"}, {step: "Setup", detail: "Cloud architecture"}, {step: "Migrate", detail: "Moving data"}, {step: "Optimize", detail: "Cost management"}]
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Grow your audience and drive massive revenue.",
    longDescription: "Comprehensive digital marketing services including SEO, PPC, and social media management.",
    benefits: ["High ROI", "Targeted Traffic", "Brand Awareness", "Lead Generation"],
    process: [{step: "Strategy", detail: "Campaign planning"}, {step: "Creative", detail: "Ad creation"}, {step: "Launch", detail: "Going live"}, {step: "Scale", detail: "Budget optimization"}]
  },
  {
    slug: "digital-product-engineering",
    title: "Digital Product Engineering",
    description: "End-to-end product engineering services.",
    longDescription: "From concept to MVP and scaling, we engineer digital products that solve real problems.",
    benefits: ["Rapid Prototyping", "MVP Development", "Product Scaling", "UI/UX Excellence"],
    process: [{step: "Ideation", detail: "Concept validation"}, {step: "Design", detail: "Product design"}, {step: "Build", detail: "Engineering"}, {step: "Iterate", detail: "User feedback"}]
  },
  {
    slug: "application-maintenance",
    title: "Application Maintenance",
    description: "Keep your applications secure and up-to-date.",
    longDescription: "Proactive maintenance, bug fixing, and performance tuning for your existing software.",
    benefits: ["Bug Fixes", "Security Patches", "Performance Tuning", "24/7 Monitoring"],
    process: [{step: "Audit", detail: "Code review"}, {step: "Monitor", detail: "Setting up alerts"}, {step: "Patch", detail: "Fixing issues"}, {step: "Update", detail: "Feature upgrades"}]
  },
  {
    slug: "quality-assurance",
    title: "Quality Assurance & Testing",
    description: "Ensure flawless execution with rigorous testing.",
    longDescription: "Automated and manual testing services to guarantee your software is bug-free and performant.",
    benefits: ["Automated Testing", "Manual QA", "Performance Testing", "Security Audits"],
    process: [{step: "Plan", detail: "Test cases"}, {step: "Execute", detail: "Running tests"}, {step: "Report", detail: "Bug logging"}, {step: "Verify", detail: "Re-testing fixes"}]
  },
  {
    slug: "consulting-services",
    title: "Consulting Services",
    description: "Strategic tech consulting for your business.",
    longDescription: "Expert advice on technology stack, digital transformation, and team structuring.",
    benefits: ["Tech Strategy", "Digital Transformation", "Code Audits", "CTO as a Service"],
    process: [{step: "Discover", detail: "Understanding needs"}, {step: "Analyze", detail: "System review"}, {step: "Recommend", detail: "Strategic plan"}, {step: "Implement", detail: "Guiding execution"}]
  }
];
