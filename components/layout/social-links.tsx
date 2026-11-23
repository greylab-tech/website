import { siteContact } from "@/data/site";

const socialIcons = {
  Instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17 7h.01" strokeLinecap="round" strokeWidth="2" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5m0-8h.01M11 16v-5m0 1a2.5 2.5 0 0 1 5 0v4" />
    </>
  ),
  X: <path d="M5 4h4l10 16h-4L5 4Zm14 0-6 7M5 20l6-7" />,
};

export function SocialLinks() {
  return (
    <div
      className="social-links"
      role="group"
      aria-label="GreyLab social profiles"
    >
      {(Object.keys(socialIcons) as (keyof typeof socialIcons)[]).map(
        (name) => {
          const href = siteContact.socials[name];
          const placeholder = href === "#";
          return (
            <a
              key={name}
              href={href}
              aria-label={name}
              aria-disabled={placeholder || undefined}
              tabIndex={placeholder ? -1 : undefined}
              target={placeholder ? undefined : "_blank"}
              rel={placeholder ? undefined : "noreferrer"}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                {socialIcons[name]}
              </svg>
            </a>
          );
        },
      )}
    </div>
  );
}
