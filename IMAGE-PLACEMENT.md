# Image placement guide

The site intentionally renders polished CSS placeholders until these files exist. Put every asset in `public/images/`; never import a missing optional image because doing so will fail the build.

| Asset | Used by | Recommended size | Ratio / format | Max size | Suggested alt text |
| --- | --- | --- | --- | --- | --- |
| `hero-background.webp` | Hero background in `app/globals.css` | 2400 × 1500 px | 8:5, WebP or AVIF | 400 KB | Decorative; keep it CSS-only with no alt text |
| `logo.svg` or `logo.png` | `components/layout/Navbar.tsx` and Footer | SVG preferred; PNG 600 × 220 px | Natural logo ratio | 100 KB | Agency name |
| `project-01.webp` | First project in `components/ui/ImagePlaceholder.tsx` | 1800 × 1100 px | 16:10, WebP/AVIF | 300 KB | Describe the finished work and interface |
| `project-02.webp` | Second project | 1400 × 1200 px | 7:6, WebP/AVIF | 250 KB | Describe the finished work and interface |
| `project-03.webp` | Third project | 1400 × 1200 px | 7:6, WebP/AVIF | 250 KB | Describe the finished work and interface |
| `social-preview.webp` | Open Graph metadata in `lib/site-config.ts` | 1200 × 630 px | 1.91:1, WebP | 300 KB | Concise branded preview description |

## Hero setup

1. Place the image at `public/images/hero-background.webp`.
2. In `app/globals.css`, change `--hero-image: none;` to `--hero-image: url('/images/hero-background.webp');`.
3. Change `--hero-position` to adjust the crop (`center center`, `60% center`, and so on).
4. Change `--hero-overlay-color` and `--hero-overlay-opacity` to control readability. The mobile breakpoint uses a dedicated gradient lower in the same file.

Keep important subjects near the middle 60% of the frame so the image remains useful from desktop through mobile. For a distinct mobile asset later, add `hero-background-mobile.webp` (1600 × 2000 px, 4:5, under 300 KB) and set `--hero-image: url('/images/hero-background-mobile.webp')` inside the `@media (max-width: 640px)` block.

## Project setup

Each placeholder includes an `IMAGE SWAP` comment. Import `Image` from `next/image`, keep the placeholder wrapper as a positioned container, and replace the placeholder internals with `<Image fill sizes="..." />`. Use meaningful alt text that names what is visible—not “project image.” Images below the fold should retain the default lazy loading behavior.
