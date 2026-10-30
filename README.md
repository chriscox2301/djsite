# MHENNEKE — one-page site

Website for hardcore DJ/producer MHENNEKE: a one-page home (`/`) plus an about page (`/about`) and a booking page (`/booking`). Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where to edit

- **Content** (bio, gigs, mix, genre tags, social links, booking email, about page, booking info): `data/site.ts`. Every value marked `PLACEHOLDER` is dummy data.
- **Colours / fonts (design tokens)**: the `@theme` block in `app/globals.css`.
- **Images**: `public/images/`. The current files are procedurally generated placeholders (`node scripts/generate-placeholders.mjs`). Replace them with real photos using the same filenames.

## Structure

```
app/            layout.tsx (fonts, navbar), page.tsx (home), about/, booking/, globals.css (tokens, grain, glitch, misprint)
components/     Navbar, Logo, SocialLinks, Hero, HeroSlides, MixPlayer, Waveform,
                GigsList, AtmosphereCard, AboutCard, ContactSection, PageTitle, BookingForm,
                Card, ButtonLink, icons
data/site.ts    all content
scripts/        placeholder image generator
```

The booking form has no backend: it validates the fields and opens the visitor's email app with a pre-filled request to `artist.bookingEmail`.
