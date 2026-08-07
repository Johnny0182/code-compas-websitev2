export function SectionHeading({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <header className="section-heading">
      <p className="section-kicker"><span>{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  );
}
