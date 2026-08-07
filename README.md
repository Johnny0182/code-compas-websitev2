# Code Compas agency site

A production-ready single-page digital agency website built with Next.js 16 App Router, TypeScript, Tailwind CSS 4, Motion, Zod, and Resend. The page has four top-level sections: Hero, Services, About/Selected Projects, and Contact/Footer.

## Local development

Use Node.js 20.9 or newer (Node 22 LTS is recommended).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Run `npm run lint` and `npm run build` before deploying.

## Contact form and Resend

The browser posts to `app/api/contact/route.ts`; credentials never enter client code. Set these values in `.env.local`:

```text
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Website <hello@your-verified-domain.com>
CONTACT_TO_EMAIL=your-inbox@example.com
```

Verify the sending domain in Resend, add the DNS records Resend provides, wait for verification, then use an address on that domain for `CONTACT_FROM_EMAIL`. `CONTACT_TO_EMAIL` is the recipient. In development, missing variables produce an explicit validated-only response. Production returns 503 instead of pretending to send.

To test locally, submit the UI form or POST JSON to `http://localhost:3000/api/contact` with `name`, `email`, `company`, `projectType`, `message`, and an empty `website` honeypot field. An auto-reply can be added at the marked comment in the route.

## Editing the site

- Text, services, projects, contact placeholders, social URL, and SEO values: `lib/site-config.ts`
- Colors, section spacing, radii, content width, overlay, and typography variables: top of `app/globals.css`
- Fonts: the two marked `next/font/local` declarations in `app/layout.tsx` and files in `app/fonts/`
- Logo: the marked text placeholder in `components/layout/Navbar.tsx`
- Hero and project images: follow `IMAGE-PLACEMENT.md`
- Form fields: update `components/ui/ContactForm.tsx` and `lib/contact-schema.ts` together

Replace `[AGENCY NAME]`, `[DOMAIN]`, `[CONTACT EMAIL]`, `[INSTAGRAM URL]`, and `[CITY OR SERVICE AREA]` before launch.

## Netlify deployment

1. Push the repository to a Git provider and choose **Add new site → Import an existing project** in Netlify.
2. Use `npm run build` as the build command. Netlify’s current Next.js adapter handles App Router route handlers automatically.
3. In **Site configuration → Environment variables**, add the three Resend variables. Never commit real values.
4. Deploy, submit a test inquiry, and confirm receipt and reply-to behavior.

For a custom domain, open **Domain management**, choose **Add a domain**, then follow Netlify’s DNS or nameserver instructions. Update `seo.canonicalUrl` in `lib/site-config.ts` after the domain is active.

## Assets and performance

No remote or downloaded imagery is used. Add WebP/AVIF files to `public/images` and render project assets with Next.js `Image`, explicit responsive sizes, and meaningful alt text. Keep below-the-fold images lazy-loaded. The interactive JavaScript is isolated to the menu, reveal wrapper, and form.
