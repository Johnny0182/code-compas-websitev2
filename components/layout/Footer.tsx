import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="footer page-shell">
      <div className="footer-top"><a className="footer-logo" href="#home">{siteConfig.agencyName}</a><p>{siteConfig.footerStatement}</p><a href="#home">Back to top ↑</a></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {siteConfig.agencyName}</p><nav aria-label="Footer navigation">{siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a><a href={siteConfig.contact.socialHref} target="_blank" rel="noreferrer">{siteConfig.contact.socialLabel}</a></div></div>
    </footer>
  );
}
