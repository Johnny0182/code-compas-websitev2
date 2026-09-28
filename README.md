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

## Contact form setup (Resend + GitHub + Netlify)

The browser posts validated form data to `app/api/contact/route.ts`. The server sends both HTML and plain-text versions of the inquiry to `johnny.leyva182@gmail.com`, and the visitor's address is used as the reply-to address. The Resend key remains server-only.

The code is complete. The only required work outside the repository is to verify a sender in Resend and add three environment variables to Netlify.

### 1. Create and verify a sending domain

1. Create or sign in to your Resend account.
2. Open **Domains**, select **Add Domain**, and enter a domain you own. Use a sending subdomain such as `send.yourdomain.com` if possible.
3. In the DNS manager for that domain, add every SPF and DKIM record Resend displays. Copy the record type, name, value, and priority exactly. These are DNS records, not values to paste into this codebase.
4. Return to Resend, select **Verify DNS Records**, and wait until the domain status is **Verified**.

Do not use a Gmail address for `CONTACT_FROM_EMAIL`: Resend cannot verify that you own `gmail.com`. Receiving email through Resend is not required; the destination can still be the Gmail address above.

### 2. Create the API key

1. Open **API Keys** in Resend and select **Create API Key**.
2. Name it `Code Compas website`.
3. Choose **Sending access** and restrict it to the verified domain when that option is available.
4. Copy the key immediately. Resend only displays the full value once.

### 3. Configure local development

At the project root, copy `.env.example` to `.env.local`, then paste the real values after the equals signs:

```text
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Code Compas Website <inquiries@send.yourdomain.com>
CONTACT_TO_EMAIL=johnny.leyva182@gmail.com
```

Replace only `re_...` and `send.yourdomain.com`. `CONTACT_FROM_EMAIL` must use the exact domain or subdomain verified in Resend. The `inquiries` mailbox does not have to exist because replies go to the visitor. Keep `CONTACT_TO_EMAIL` exactly as shown unless the destination inbox changes.

Never prefix the API key with `NEXT_PUBLIC_`, paste it into browser code, add it to `.env.example`, or commit `.env.local`. This repository already ignores `.env.local`.

Restart `npm run dev` after changing `.env.local`, submit the form, and confirm the message appears in both the destination inbox and Resend's **Emails** log.

### 4. Configure Netlify

1. In Netlify, open the site and go to **Project configuration → Environment variables**.
2. Select **Add a variable → Add a single variable** and add each row below. Use the same values as `.env.local`:

   | Key | Value |
   | --- | --- |
   | `RESEND_API_KEY` | The secret beginning with `re_` |
   | `CONTACT_FROM_EMAIL` | `Code Compas Website <inquiries@send.yourdomain.com>` (replace the domain) |
   | `CONTACT_TO_EMAIL` | `johnny.leyva182@gmail.com` |

3. Make the variables available to all scopes and at least the **Production** deploy context. Include **Deploy Previews** too if the form should work on preview URLs.
4. Go to **Deploys** and trigger a new deploy. Environment-variable changes do not affect an already-built deploy.

Netlify automatically turns this Next.js route handler into a serverless function. Do not add a second Netlify Function or expose the Resend key in frontend code.

### 5. Put the code on GitHub

This local repository is already connected to:

```text
https://github.com/Johnny0182/code-compas-websitev2.git
```

After reviewing the changes, commit and push them:

```bash
git add .env.example README.md app/api/contact/route.ts components/ui/ContactForm.tsx eslint.config.mjs lib/contact-schema.ts package.json package-lock.json
git commit -m "Make contact form production ready"
git push origin main
```

Do not add `.env.local`. If Netlify is linked to this GitHub repository, the push starts a deploy automatically.

### 6. Netlify build settings

When importing or checking the project in Netlify, use:

- Branch to deploy: `main`
- Base directory: leave blank (repository root)
- Build command: `npm run build`
- Publish directory: use the value Netlify detects for Next.js; do not force `out`

Netlify's current Next.js adapter supports App Router route handlers without extra configuration.

### 7. Production test

Submit one real inquiry from the deployed site. Confirm that it reaches `CONTACT_TO_EMAIL`, the Resend log reports delivery, and clicking **Reply** addresses the visitor who submitted the form.

If it fails, check **Resend → Emails/Logs** first, then the matching Netlify function log. The route logs Resend's safe error name and message without logging the API key or the visitor's form content.

In development, missing variables produce an explicit validated-only response. Production returns `503` instead of pretending to send. Duplicate retries reuse a Resend idempotency key, and obvious honeypot spam is accepted without sending an email.

## Editing the site

- Text, services, projects, contact copy, and SEO values: `lib/site-config.ts`
- Colors, section spacing, radii, content width, overlay, and typography variables: top of `app/globals.css`
- Fonts: `app/layout.tsx` and files in `app/fonts/`
- Hero and project images: `public/images/`
- Form fields: update `components/ui/ContactForm.tsx` and `lib/contact-schema.ts` together

## Custom site domain

For a custom website domain, open **Domain management** in Netlify, choose **Add a domain**, then follow Netlify's DNS or nameserver instructions. The website domain and Resend sending domain may share the same root domain; for example, the site can use `yourdomain.com` while Resend uses `send.yourdomain.com`.

## Assets and performance

No remote imagery is used. Store optimized assets in `public/images` and render project images with Next.js `Image`, explicit responsive sizes, and meaningful alt text. Keep below-the-fold images lazy-loaded. The interactive JavaScript is isolated to the menu, reveal wrapper, theme toggle, and form.
