import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-layer">
        <Navbar />
        <div className="hero-content page-shell">
          <h1>{siteConfig.hero.headline}</h1>
          <p className="hero-capabilities">STRATEGY / DESIGN / DEVELOPMENT / AUTOMATION</p>
          <div className="hero-actions">
            <a className="hero-secondary-button" href="#services">SEE SERVICES</a>
            <Button href="#contact">{siteConfig.hero.cta}</Button>
          </div>
        </div>
        <div className="hero-marquee" aria-label="Code Compas, websites, apps, custom software, business automation">
          <div className="hero-marquee-track">
            <div className="hero-marquee-group">
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
            </div>
            <div className="hero-marquee-group" aria-hidden="true">
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
              <span>CODE COMPAS — WEBSITES — APPS — CUSTOM SOFTWARE — BUSINESS AUTOMATION —</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
