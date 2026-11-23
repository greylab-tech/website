export const siteName = "GreyLab";
export const siteDescription =
  "We build websites, custom software, SaaS products, and AI solutions that solve real problems.";

export const wordmark = {
  src: "/images/brand/greylab-wordmark.svg",
  width: 939,
  height: 201,
} as const;

const email = "contact@greylab.tech";
const phone = "+91 89273 48937";

export const siteContact = {
  email,
  emailHref: `mailto:${email}`,
  phone,
  phoneHref: `tel:${phone.replaceAll(" ", "")}`,
  socials: {
    Instagram: "https://www.instagram.com/greylab.tech/",
    LinkedIn: "https://www.linkedin.com/company/greylab-tech/",
    X: "#",
  },
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
