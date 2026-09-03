import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="page-shell">
        <Reveal><h2 className="section-kicker"><span>01</span>What we do</h2></Reveal>
        <div className="service-list">
          {siteConfig.services.map((service, index) => (
            <Reveal key={service.letter} delay={index * 0.04}>
              <article className="service-row">
                <span className="service-letter">{service.letter}</span>
                <div className="service-heading">
                  <p className="service-label">{service.label}</p>
                  <h3>{service.title}</h3>
                  <p className="service-price" aria-label={service.price}>
                    <span>Starting at</span>
                    <strong>{service.price.replace("STARTING AT ", "")}</strong>
                  </p>
                </div>
                <p className="service-description">{service.description}</p>
                {index === 3 ? (
                  <a className="service-action" href="#contact" aria-label="Contact Code Compas about a custom solution">Customize Your Solution <span>↗</span></a>
                ) : (
                  <a className="service-arrow" href="#contact" aria-label={`Contact Code Compas about ${service.title.toLowerCase()}`}>↗</a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
