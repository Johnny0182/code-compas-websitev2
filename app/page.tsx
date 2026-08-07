import { AboutProjects } from "@/components/sections/AboutProjects";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <AboutProjects />
      <Contact />
    </main>
  );
}
