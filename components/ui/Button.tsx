import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; variant?: "light" | "dark" };

export function Button({ children, className = "", variant = "light", ...props }: ButtonProps) {
  return <a className={`button button--${variant} ${className}`} {...props}>{children}<span aria-hidden="true">↗</span></a>;
}
