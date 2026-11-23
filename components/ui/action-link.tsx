import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./arrow-icon";
import { RollingText } from "./rolling-text";
export function ActionLink({
  children,
  href,
  variant = "accent",
  className = "",
  onClick,
}: {
  children: ReactNode;
  href: string;
  variant?: "accent" | "white" | "dark";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`action-link action-link--${variant} ${className}`}
    >
      <span className="action-link__circle">
        <ArrowIcon />
      </span>
      <span className="action-link__pill">
        <RollingText>{children}</RollingText>
      </span>
    </Link>
  );
}
