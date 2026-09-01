import Image from "next/image";

export function ProjectImage({ path, alt }: { path: string; alt: string }) {
  return (
    <div className="project-visual">
      <Image src={path} alt={alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1440px) 50vw, 704px" />
    </div>
  );
}
