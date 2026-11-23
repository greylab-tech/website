type TeamMember = {
  name: string;
  role: string;
  portrait: string;
  profiles: { label: string; href: string }[];
};

export const team: TeamMember[] = [];
