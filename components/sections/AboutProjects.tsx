import { Button } from "@/components/ui/Button";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function AboutProjects() {
  return (
    <section id="projects" className="section about-projects-section">
      <div className="page-shell">
        <Reveal><p className="section-kicker"><span>02</span>Selected projects</p><h2 className="projects-title">A few ways we make<br />the choice feel easy.</h2></Reveal>
        <div className="projects-grid">
          {siteConfig.projects.map((project, index) => (
            <Reveal key={project.number} className="project-card" delay={index * 0.05}>
              <ProjectImage path={project.imagePath} alt={project.imageAlt} />
              <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
              <h3>{project.title}</h3><p>{project.description}</p><a href="#contact">View project <span aria-hidden="true">↗</span></a>
            </Reveal>
          ))}
        </div>
        <div id="about" className="about-block">
          <Reveal className="about-simple">
            <h2 className="section-kicker"><span>03</span>About us</h2>
            <h3 className="about-title">
              <span className="about-title-primary"><span>{siteConfig.about.heading}</span><span>{siteConfig.about.headingSecondLine}</span></span>
              <span className="about-title-secondary">{siteConfig.about.kicker} <span aria-hidden="true">✨</span></span>
            </h3>
            <p className="about-overview">{siteConfig.about.body}</p>
            <ul className="about-list">
              {siteConfig.about.capabilities.map((capability) => (
                <li key={capability.title}><span aria-hidden="true">{capability.icon}</span><strong>{capability.title}:</strong> {capability.description}</li>
              ))}
            </ul>
            <Button href="#contact" variant="dark">Start a conversation</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
