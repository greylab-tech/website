export type TeamMember = {
  name: string;
  role: string;
  portrait: string;
  portraitPosition?: string;
};

export const team: TeamMember[] = [
  {
    name: "Sandip",
    role: "Business Development & Client Relations Manager",
    portrait: "/images/team/sandip.webp",
  },
  {
    name: "Koushik",
    role: "Software Engineer · DevOps & AI Specialist",
    portrait: "/images/team/koushik.webp",
    portraitPosition: "50% 24%",
  },
  {
    name: "Deb",
    role: "Full Stack Developer & SEO Specialist",
    portrait: "/images/team/deb.webp",
  },
  {
    name: "Tushar",
    role: "Digital Marketing & Paid Ads Specialist",
    portrait: "/images/team/tushar.webp",
  },
];
