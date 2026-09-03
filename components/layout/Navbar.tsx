import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  return (
    <nav className="nav-shell" aria-label="Primary navigation">
      <a className="wordmark" href="#home" aria-label={`${siteConfig.agencyName}, home`}>
        {siteConfig.agencyName}
      </a>
      <div className="desktop-nav">
        {siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </div>
      <details className="mobile-navigation">
        <summary className="menu-trigger" aria-label="Open navigation menu">
          <i /><i /><i />
        </summary>
        <div id="mobile-menu" className="mobile-menu">
          {siteConfig.navigation.map((item, index) => <a key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</a>)}
        </div>
      </details>
    </nav>
  );
}
