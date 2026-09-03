import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

const bodyFont = localFont({ src: "./fonts/geist-latin.woff2", variable: "--font-body-loaded", display: "swap" });
const headingFont = localFont({ src: "./fonts/geist-mono-latin.woff2", variable: "--font-heading-loaded", display: "swap" });

const themeInitScript = `(() => {
  const prefersDark = typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  try {
    const saved = localStorage.getItem("code-compas-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : prefersDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    const theme = prefersDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }
})();`;

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    siteName: siteConfig.seo.siteName,
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/images/hero-background.webp" fetchPriority="high" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
