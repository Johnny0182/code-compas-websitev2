export function ImagePlaceholder({ number, path }: { number: string; path: string }) {
  return (
    <div className={`project-visual project-visual--${number}`} role="img" aria-label={`Image placeholder for project ${number}`}>
      {/* IMAGE SWAP: add the file at the path below, then replace this block with Next.js <Image fill sizes="..." />. */}
      <div className="placeholder-grid" aria-hidden="true" />
      <span className="placeholder-number">{number}</span>
      <span className="placeholder-path">image pending<br />{path}</span>
    </div>
  );
}
