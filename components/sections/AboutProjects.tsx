import { Button } from "@/components/ui/Button";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function AboutProjects() {
  return (
    <section id="about" className="section about-projects-section">
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
        <div className="about-block">
          <Reveal className="about-intro"><p className="section-kicker"><span>03</span>About us</p><h2>{siteConfig.about.heading}</h2></Reveal>
          <Reveal className="about-copy"><p className="about-kicker">{siteConfig.about.kicker}</p><p>{siteConfig.about.body}</p><p className="about-statement">{siteConfig.about.statement}</p><Button href="#contact" variant="dark">Start a conversation</Button></Reveal>
          <div className="values-row">
            {siteConfig.about.values.map((value, index) => <div key={value}><span>0{index + 1}</span><p>{value}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
