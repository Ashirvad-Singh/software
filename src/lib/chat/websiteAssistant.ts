import { socialProfiles } from "../../data/socialProfiles";

export type AssistantReply = {
  text: string;
  showServices?: boolean;
  showJobs?: boolean;
  externalLink?: { href: string; label: string };
  link?: { to: string; label: string };
  pages?: { to: string; label: string }[];
};

const pageMatches = [
  { pattern: /\b(about|company|who are you|who we are|adat|our story|company profile)\b/, to: "/about", label: "About ADAT", description: "Get to know ADAT, our story and how we work." },
  { pattern: /\b(team|people|members|founder|founders|leadership)\b/, to: "/team", label: "Meet our team", description: "Meet the people behind ADAT." },
  { pattern: /\b(case stud(?:y|ies)|success stor(?:y|ies)|results|outcomes)\b/, to: "/case-studies", label: "Explore case studies", description: "See the challenges, approach and outcomes behind our projects." },
  { pattern: /\b(work|portfolio|project|projects|example|examples)\b/, to: "/work", label: "See our work", description: "Explore the websites and digital products we’ve built." },
  { pattern: /\b(blog|blogs|article|articles|journal|insights|news|read)\b/, to: "/blog", label: "Read our blog", description: "Explore ideas and insights from the ADAT journal." },
  { pattern: /\b(gallery|photos|photo|pictures|images|office|culture)\b/, to: "/gallery", label: "View gallery", description: "Take a look at life at ADAT through our gallery." },
  { pattern: /\b(technology|technologies|tech|stack|react|node|python|wordpress|flutter)\b/, to: "/technologies", label: "Explore technologies", description: "Discover the tools and platforms we work with." },
  { pattern: /\b(process|workflow|how you work|how we work|approach)\b/, to: "/process", label: "How we work", description: "Learn more about our approach to building digital products." },
  { pattern: /\b(privacy|data protection)\b/, to: "/privacy", label: "Privacy policy", description: "Find information about how website data is handled." },
  { pattern: /\b(terms|conditions)\b/, to: "/terms", label: "Terms of service", description: "Read the terms for using our website." },
  { pattern: /\b(home|homepage|home page)\b/, to: "/", label: "Homepage", description: "Start exploring ADAT from our homepage." },
];

// Local keyword routing; no model or external chat service is called.
export function websiteReply(message: string): AssistantReply {
  const text = message.toLowerCase().replace(/[-_/&]+/g, " ").replace(/\s+/g, " ").trim();
  const matches = (pattern: RegExp) => pattern.test(text);
  if (matches(/\b(linkedin|linked in)\b/))
    return { text: "Connect with ADAT Soft Solutions on LinkedIn for company updates and news.", externalLink: { href: socialProfiles.linkedin, label: "View ADAT on LinkedIn" } };
  if (matches(/\b(facebook|fb|face book)\b/))
    return { text: "Follow ADAT Soft Solutions on Facebook and stay connected with our updates.", externalLink: { href: socialProfiles.facebook, label: "View ADAT on Facebook" } };
  if (matches(/\b(glassdoor|reviews|employee reviews)\b/))
    return { text: "Explore ADAT Soft Solutions on Glassdoor for company information and employee reviews.", externalLink: { href: "https://www.glassdoor.co.in/Overview/Working-at-ADAT-Soft-Solutions-EI_IE2063108.11,30.htm", label: "View ADAT on Glassdoor" } };
  if (matches(/\b(price|pricing|cost|budget|quote|estimate|kitna|paisa|rate)\b/))
    return { text: "Let’s work out what your project needs. Share your goals, features and timeline with our team for a tailored estimate.", link: { to: "/contact", label: "Discuss your project" } };
  if (matches(/\b(contact|human|talk|call|email|meeting|start|shuru|phone|address)\b/))
    return { text: "Let’s get you in touch with our team. Share your idea or question through our contact form.", link: { to: "/contact", label: "Contact ADAT" } };

  const showJobs = matches(/\b(job|jobs|career|careers|carrer|hiring|internship|apply|resume|vacancy|vacancies|openings)\b/);
  const showServices = matches(/\b(service|services|website|web|app|apps|mobile|shopify|store|ecommerce|e commerce|design|seo|development)\b/);
  const found = pageMatches.filter(page => matches(page.pattern));
  if (showJobs || showServices || found.length) {
    const descriptions = [
      ...(showJobs ? ["Here are our current job openings."] : []),
      ...(showServices ? ["Explore our services below."] : []),
      ...(found.length === 1 ? [found[0].description] : found.length > 1 ? ["These pages match what you’re looking for."] : []),
    ];
    return {
      text: descriptions.join(" "),
      ...(showJobs ? { showJobs: true } : {}),
      ...(showServices ? { showServices: true } : {}),
      ...(found.length ? { pages: found.slice(0, 4).map(({ to, label }) => ({ to, label })) } : {}),
    };
  }
  if (matches(/\b(ai|chatbot|automation|automate)\b/))
    return { text: "Have an AI assistant or automation in mind? Tell us what it should do and which tools it should connect to.", link: { to: "/contact", label: "Discuss an AI idea" } };
  if (matches(/\b(hi|hello|hey|namaste|thanks|thank you)\b/))
    return { text: "Hello! What would you like to explore—our services, team, work or job openings?" };
  return { text: "What would you like to know more about? Try a topic like services, jobs, company, team or projects.", pages: [{ to: "/about", label: "About ADAT" }, { to: "/work", label: "Our work" }, { to: "/contact", label: "Contact us" }] };
}
