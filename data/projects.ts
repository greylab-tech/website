export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt?: string;
  isExample?: boolean;
  highlights: [string, string];
  resultMetrics?: string[];
  intro?: string;
  company?: string;
  industry?: string;
  date?: string;
  gallery?: string[];
  problem?: string[];
  solution?: string[];
  outcome?: string[];
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "cloudl-experience-overhaul",
    title: "Cloudl Experience Overhaul",
    category: "Web Design",
    company: "Cloudl AI",
    industry: "B2B SaaS",
    date: "Feb 2026",
    image: "/images/projects/cloudl-cover.webp",
    gallery: [
      "/images/projects/cloudl-experience-overhaul-detail-1.webp",
      "/images/projects/cloudl-experience-overhaul-detail-2.webp",
      "/images/projects/cloudl-experience-overhaul-detail-3.webp",
    ],
    intro:
      "Cloudl AI needed a website that reflected the sophistication of its software platform and converted visitors into qualified sales opportunities.",
    isExample: true,
    highlights: ["+91% Conversion Rate", "-43% Bounce Rate"],
    resultMetrics: [
      "+91% Conversion Rate",
      "-43% Bounce Rate",
      "+128% Qualified Leads",
    ],
    problem: [
      "The company's website had become increasingly fragmented after years of updates and feature additions. Navigation was confusing, messaging lacked clarity, and critical conversion points were buried beneath unnecessary complexity.",
      "Although traffic volumes remained healthy, the website failed to communicate product value effectively, resulting in lost opportunities and low engagement metrics.",
    ],
    solution: [
      "Atlas Studio restructured the entire user experience around customer intent. We simplified navigation, refined messaging, redesigned landing pages, and established a more strategic information architecture.",
      "Every page was optimized around conversion goals, incorporating stronger calls-to-action, trust signals, and performance-focused design principles.",
    ],
    outcome: [
      "Visitors were able to understand product benefits faster and navigate key journeys more efficiently. Engagement metrics improved almost immediately after launch.",
      "Most importantly, the website became a meaningful revenue-generating asset, producing significantly more qualified opportunities for the sales team.",
    ],
    quote: {
      text: '"The new site feels like a completely different company. Our leads certainly think so."',
      author: "Jack Dawson",
      role: "CEO Cloudl AI",
    },
  },
  {
    slug: "stratus-generation-engine",
    title: "Stratus Generation Engine",
    category: "Digital Marketing",
    company: "Stratus Advisory",
    industry: "Business Consulting",
    date: "Jun 2025",
    image: "/images/projects/stratus-cover.webp",
    gallery: [
      "/images/projects/stratus-generation-engine-detail-1.webp",
      "/images/projects/cloudl-experience-overhaul-detail-1.webp",
      "/images/projects/stratus-generation-engine-detail-3.webp",
    ],
    intro:
      "Stratus Advisory wanted to move beyond referral-based growth and establish a predictable, scalable lead-generation system.",
    isExample: true,
    highlights: ["+312% Marketing Leads", "-38% Cost Per Acquisition"],
    resultMetrics: [
      "+312% Marketing Leads",
      "-38% Cost Per Acquisition",
      "+201% Sales Pipeline Growth",
    ],
    problem: [
      "The company relied heavily on personal networks and referrals to generate new business. While effective in the short term, growth remained difficult to forecast and nearly impossible to scale.",
      "Marketing efforts were inconsistent, campaign tracking was limited, and there was no structured process for converting prospects into opportunities.",
    ],
    solution: [
      "Atlas Studio developed a multi-channel acquisition strategy combining paid search, LinkedIn advertising, email automation, and content marketing.",
      "We also created dedicated landing pages, lead nurturing workflows, attribution reporting, and conversion tracking systems that provided complete visibility into campaign performance.",
    ],
    outcome: [
      "Lead generation became predictable for the first time in the company's history. Marketing evolved from a supporting function into a primary driver of revenue growth.",
      "With improved visibility and attribution, leadership gained confidence in scaling investment while maintaining strong return on acquisition costs.",
    ],
    quote: {
      text: '"We went from hoping leads would arrive to knowing exactly where the next opportunities are coming from."',
      author: "Marko Mount",
      role: "Manager, Stratus Advisory",
    },
  },
  {
    slug: "premiere-expansion",
    title: "Premiere Expansion",
    category: "Search Growth",
    company: "Premiere Roofing Group",
    industry: "Home Services",
    date: "May 2026",
    image: "/images/projects/premiere-cover.webp",
    gallery: [
      "/images/projects/premiere-expansion-detail-1.webp",
      "/images/projects/premiere-expansion-detail-2.webp",
      "/images/projects/premiere-expansion-detail-3.webp",
    ],
    intro:
      "Atlas Studio helped a regional home services company expand into multiple new markets through local SEO and lead generation initiatives.",
    isExample: true,
    highlights: ["+224% Local Visibility", "+156% Website Leads"],
    resultMetrics: [
      "+224% Local Visibility",
      "+156% Website Leads",
      "4.8x ROI",
    ],
    problem: [
      "The company had strong offline operations but struggled to generate consistent leads online. Their local search presence was fragmented across service areas.",
      "Competitors consistently outranked them in local search results, limiting growth opportunities in new territories.",
    ],
    solution: [
      "We developed a localized SEO framework, optimized location pages, improved business profile management, and built geo-targeted content strategies.",
      "Supporting campaigns included reputation management and local citation optimization.",
    ],
    outcome: [
      "The company established a dominant local search presence across multiple service regions.",
      "Lead generation increased significantly, enabling successful expansion into new markets while maintaining profitability.",
    ],
    quote: {
      text: '"Atlas helped us become the market leader in search across every city we serve."',
      author: "Brian Oviedo",
      role: "Design Director",
    },
  },
  {
    slug: "lumo-market-launch",
    title: "Lumo Market Launch",
    category: "Branding",
    company: "Lumo Finance",
    industry: "Financial Technology",
    date: "Nov 2026",
    image: "/images/projects/lumo-cover.webp",
    gallery: [
      "/images/projects/lumo-market-launch-detail-1.webp",
      "/images/projects/lumo-market-launch-detail-2.webp",
      "/images/projects/stratus-generation-engine-detail-3.webp",
    ],
    intro:
      "When Lumo Finance prepared to launch its new fintech platform, the team needed more than a logo and website. They needed a brand capable of building trust in a highly regulated and competitive market while generating demand from day one.",
    isExample: true,
    highlights: ["+284% Organic Visibility", "42K Qualified Visitors"],
    resultMetrics: [
      "+284% Organic Visibility",
      "42K Qualified Visitors",
      "+163% Demo Requests",
    ],
    problem: [
      "Despite having a strong product, Lumora lacked a cohesive brand identity and clear market positioning. Early testing revealed that potential customers struggled to understand the platform's value proposition and differentiate it from competitors.",
      "The company also faced a credibility challenge. As a new entrant in the financial services space, establishing trust quickly was essential for user acquisition and investor confidence.",
    ],
    solution: [
      "Atlas Studio led a full brand strategy engagement, defining the company's positioning, messaging framework, visual identity, and customer communication guidelines.",
      "We designed and developed a new website, created launch assets, refined the product story, and built an SEO-driven content strategy that targeted high-intent financial search queries.",
    ],
    outcome: [
      "The launch generated strong awareness and engagement across both organic and direct channels. Search visibility increased rapidly as new content gained traction and rankings improved.",
      "Within the first year, Lumora established itself as a credible player in its category, significantly outperforming initial acquisition forecasts and creating a foundation for long-term growth.",
    ],
    quote: {
      text: '"Atlas helped us launch with confidence. They didn\'t just create a brand—they created momentum."',
      author: "Anna Stankovic",
      role: "CEO Lumo Finance",
    },
  },
  {
    slug: "nexa-search-surge",
    title: "Nexa Search Surge",
    category: "Search Growth",
    company: "Nexa Inc",
    industry: "Software",
    date: "Nov 2024",
    image: "/images/projects/nexa-cover.webp",
    gallery: [
      "/images/projects/nexa-search-surge-detail-1.webp",
      "/images/projects/nexa-search-surge-detail-2.webp",
      "/images/projects/cloudl-experience-overhaul-detail-3.webp",
    ],
    intro:
      "Atlas Studio partnered with a fast-growing SaaS company struggling to gain visibility in a highly competitive market. Despite having a strong product, the company relied heavily on paid acquisition and lacked sustainable organic growth channels.",
    isExample: true,
    highlights: ["+312% Organic Traffic", "+187% Qualified Leads"],
    resultMetrics: [
      "+312% Organic Traffic",
      "+187% Qualified Leads",
      "68 Keywords in Top 3",
    ],
    problem: [
      "Nexa's website had limited organic visibility, inconsistent content production, and significant technical SEO issues. Their customer acquisition strategy was heavily dependent on paid advertising, making growth increasingly expensive.",
      "Competitors dominated search results for high-intent keywords, leaving NexFlow with little exposure during key stages of the buyer journey. Existing content lacked strategic targeting and failed to address customer pain points.",
    ],
    solution: [
      "We conducted a comprehensive technical SEO audit, resolving crawlability issues, improving site architecture, and optimizing page performance. We also restructured the website around search intent and customer journey mapping.",
      "Our team developed a content strategy targeting high-value keywords and launched a consistent publishing framework supported by on-page optimization and authority-building campaigns.",
    ],
    outcome: [
      "Within nine months, Nexa experienced significant improvements in rankings across core commercial keywords. Organic traffic became the company's largest acquisition channel.",
      "Lead generation increased substantially while reducing reliance on paid advertising, resulting in stronger long-term growth and improved marketing efficiency.",
    ],
    quote: {
      text: '"Atlas Studio transformed SEO from an afterthought into our most effective growth channel."',
      author: "Anna Stankovic",
      role: "COO, Nexa Inc",
    },
  },
  {
    slug: "thread-revenue-lift",
    title: "Thread Revenue Lift",
    category: "Digital Marketing",
    company: "Thread Collective",
    industry: "Fashion & Apparel",
    date: "Mar 2025",
    image: "/images/projects/thread-cover.webp",
    gallery: [
      "/images/projects/thread-revenue-lift-detail-1.webp",
      "/images/projects/thread-revenue-lift-detail-2.webp",
      "/images/projects/thread-revenue-lift-detail-3.webp",
    ],
    intro:
      "An established apparel retailer approached Atlas Studio to improve online sales performance and maximize returns from their digital marketing investment.",
    isExample: true,
    highlights: ["+142% Online Revenue", "+58% Conversion Rate"],
    resultMetrics: [
      "+142% Online Revenue",
      "+58% Conversion Rate",
      "+41% Average Order Value",
    ],
    problem: [
      "The brand faced declining ad performance and low website conversion rates despite healthy traffic volumes. Customer acquisition costs continued to rise while revenue growth stagnated.",
      "The existing customer journey lacked personalization, and key conversion opportunities throughout the funnel were being missed.",
    ],
    solution: [
      "We redesigned the marketing funnel, introduced audience segmentation, and optimized campaign targeting across paid search and social channels.",
      "Additionally, we implemented conversion rate optimization initiatives, enhanced product page experiences, and improved email automation sequences.",
    ],
    outcome: [
      "The new strategy delivered stronger engagement throughout the customer journey and significantly improved conversion performance.",
      "Revenue increased rapidly while customer acquisition costs decreased, creating a more sustainable growth model.",
    ],
    quote: {
      text: '"The combination of strategy, design, and execution exceeded every KPI we set."',
      author: "Ben Doak",
      role: "General Manager, Thread",
    },
  },
  {
    slug: "vertex-digital-platform",
    title: "Vertex Digital Platform",
    category: "Digital Platforms",
    company: "Vertex Systems",
    industry: "Technology",
    date: "Nov 2025",
    image: "/images/projects/vertex-cover.webp",
    gallery: [
      "/images/projects/nexa-search-surge-detail-2.webp",
      "/images/projects/cloudl-experience-overhaul-detail-2.webp",
      "/images/projects/vertex-digital-platform-detail-3.webp",
    ],
    intro:
      "Vertex Systems required a modern digital platform capable of supporting international growth, large-scale content operations, and enterprise-level performance expectations.",
    isExample: true,
    highlights: ["+94 Lighthouse Score", "-57% Load Time"],
    resultMetrics: [
      "+94 Lighthouse Score",
      "-57% Load Time",
      "+73% Engagement Rate",
    ],
    problem: [
      "The existing website had become difficult to maintain and increasingly costly to scale. Marketing teams struggled to publish content efficiently, while technical limitations negatively impacted performance and SEO.",
      "As the company expanded globally, the platform lacked the flexibility needed to support multiple campaigns, audiences, and content initiatives.",
    ],
    solution: [
      "Atlas Studio designed and developed a scalable platform architecture focused on speed, flexibility, and long-term maintainability.",
      "We implemented a modern content management workflow, improved technical SEO foundations, optimized performance, and established reusable design systems for future growth.",
    ],
    outcome: [
      "The new platform empowered internal teams to launch campaigns faster while maintaining consistency across markets.",
      "Performance improvements enhanced both user experience and search visibility, creating a stronger foundation for future expansion.",
    ],
    quote: {
      text: "Premium glass dropper bottle",
      author: "Matt Howson",
      role: "CEO, Vertex",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
