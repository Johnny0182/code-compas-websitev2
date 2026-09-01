import { ContactForm } from "@/components/ui/ContactForm";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="page-shell contact-grid">
        <Reveal className="contact-copy"><p className="section-kicker"><span>04</span>Start here</p><h2>{siteConfig.contact.heading}</h2><p>{siteConfig.contact.body}</p><div className="contact-details"><span>Email</span><a href="#contact">{siteConfig.contact.email}</a><span>Social</span><a href="#contact">{siteConfig.contact.socialLabel} ↗</a></div></Reveal>
        <Reveal className="contact-form-wrap" delay={0.08}><ContactForm /></Reveal>
      </div>
      <Footer />
    </section>
  );
}
