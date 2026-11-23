import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  label,
  title,
  children,
  className = "",
}: {
  label: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`home-section-heading ${className}`}>
      <Reveal className="home-section-heading__title">
        <SectionLabel>{label}</SectionLabel>
        <h2>{title}</h2>
      </Reveal>
      {children && (
        <Reveal className="home-section-heading__aside" delay={100}>
          {children}
        </Reveal>
      )}
    </div>
  );
}
