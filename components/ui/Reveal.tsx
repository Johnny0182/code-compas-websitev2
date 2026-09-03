import type { ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string; delay?: number }) {
  // Keep important content visible in the server-rendered HTML. The previous
  // animation rendered every section at opacity: 0 until client JavaScript and
  // IntersectionObserver both ran, so a blocked/stale script could hide the
  // entire page between the hero and footer.
  return <div className={className}>{children}</div>;
}
