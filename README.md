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

The browser posts validated form data to `app/api/contact/route.ts`. The server sends both HTML and plain-text versions of the inquiry, and replies go directly to the person who submitted the form. Credentials remain server-only.

### 1. Create and verify a sending domain

1. Create or sign in to your Resend account.
2. Open **Domains**, select **Add Domain**, and enter a domain you own. A sending subdomain such as `mail.yourdomain.com` is recommended.
3. In the DNS manager for your domain, add every SPF and DKIM record Resend displays. Copy the record type, name, value, and priority exactly.
4. Return to Resend, select **Verify DNS Records**, and wait until the domain status is **Verified**.

Receiving email through Resend is not required for this form. `CONTACT_TO_EMAIL` can be any inbox you already use.

### 2. Create the API key

1. Open **API Keys** in Resend and select **Create API Key**.
2. Name it `Code Compas website`.
3. Choose **Sending access** and restrict it to the verified domain when that option is available.
4. Copy the key immediately. Resend only displays the full value once.

### 3. Configure local development

Paste the real values after the equals signs in `.env.local` at the project root:

```text
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Code Compas Website <inquiries@mail.yourdomain.com>
CONTACT_TO_EMAIL=your-inbox@example.com
```

`CONTACT_FROM_EMAIL` must end in the exact domain or subdomain verified in Resend. The address does not have to be a separate mailbox, because the route sets the visitor's address as `replyTo`. Never prefix the API key with `NEXT_PUBLIC_`, paste it into client code, or commit `.env.local`.

Restart `npm run dev` after changing `.env.local`, submit the form, and confirm the message appears in both the destination inbox and Resend's **Emails** log.

### 4. Configure Netlify

In Netlify, open the site and go to **Site configuration → Environment variables**. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` with the same production values, then trigger a new deploy. Local `.env.local` values are not uploaded automatically.

### 5. Production test

Submit one real inquiry from the deployed site. Confirm that it reaches `CONTACT_TO_EMAIL`, the Resend log reports delivery, and clicking **Reply** addresses the visitor who submitted the form.

In development, missing variables produce an explicit validated-only response. Production returns `503` instead of pretending to send. An optional visitor auto-reply can be added at the marked comment in the route later.

## Editing the site

- Text, services, projects, contact copy, and SEO values: `lib/site-config.ts`
- Colors, section spacing, radii, content width, overlay, and typography variables: top of `app/globals.css`
- Fonts: `app/layout.tsx` and files in `app/fonts/`
- Hero and project images: `public/images/`
- Form fields: update `components/ui/ContactForm.tsx` and `lib/contact-schema.ts` together

## Netlify deployment

1. Push the repository to a Git provider and choose **Add new site → Import an existing project** in Netlify.
2. Use `npm run build` as the build command. Netlify’s current Next.js adapter handles App Router route handlers automatically.
3. In **Site configuration → Environment variables**, add the three Resend variables. Never commit real values.
4. Deploy, submit a test inquiry, and confirm receipt and reply-to behavior.

For a custom domain, open **Domain management**, choose **Add a domain**, then follow Netlify’s DNS or nameserver instructions. Add canonical and social-preview metadata in `app/layout.tsx` after the domain and final preview image are available.

## Assets and performance

No remote imagery is used. Store optimized assets in `public/images` and render project images with Next.js `Image`, explicit responsive sizes, and meaningful alt text. Keep below-the-fold images lazy-loaded. The interactive JavaScript is isolated to the menu, reveal wrapper, theme toggle, and form.
