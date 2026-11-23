import type { ReactNode } from "react";
export function RollingText({ children }: { children: ReactNode }) {
  return (
    <span className="rolling-text">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
