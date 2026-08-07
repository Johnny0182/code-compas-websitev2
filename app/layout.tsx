import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

// FONT SWAP: replace these two local files/configurations to change the body and heading fonts.
const bodyFont = localFont({ src: "./fonts/geist-latin.woff2", variable: "--font-body-loaded", display: "swap" });
const headingFont = localFont({ src: "./fonts/geist-mono-latin.woff2", variable: "--font-heading-loaded", display: "swap" });

const themeInitScript = `(() => {
  try {
    const saved = localStorage.getItem("code-compas-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    const theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.canonicalUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    siteName: siteConfig.seo.siteName,
    url: "/",
    type: "website",
    images: [{ url: siteConfig.seo.socialImage, width: 1200, height: 630, alt: `${siteConfig.agencyName} preview` }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
