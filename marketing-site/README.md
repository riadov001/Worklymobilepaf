# MyTools Admin — Marketing Website

Next.js 14 marketing site for MyTools Admin. Dark, minimal, Apple-style aesthetic matching the mobile app.

## Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion v11
- **Fonts:** Michroma + Inter (Google Fonts)

## Structure

```
marketing-site/
  app/
    globals.css         # Base styles, fonts, custom utilities
    layout.tsx          # Root layout with SEO metadata
    page.tsx            # Homepage
    privacy/page.tsx    # Privacy policy (RGPD/CNIL compliant)
    support/page.tsx    # Support page with FAQ
  components/
    Navbar.tsx          # Fixed top nav, scroll-aware, mobile hamburger
    Hero.tsx            # Hero section with phone mockup
    Features.tsx        # 6-feature grid
    HowItWorks.tsx      # 3-step process
    Screenshots.tsx     # Tabbed phone screenshot viewer
    CTA.tsx             # Call to action + perks
    Footer.tsx          # Links (Privacy, Support, Legal)
  public/
    og-image.html       # OG image generator (open in browser, screenshot)
    favicon.ico         # (add: copy from app assets)
    apple-touch-icon.png # (add: 180x180 version of logo)
```

## Setup & Development

```bash
cd marketing-site
npm install
npm run dev
```

Open http://localhost:3000

## Build & Deploy

```bash
npm run build
```

Generates a static export in `/out`. Deploy to:
- Vercel (recommended — zero config)
- Netlify
- Any static hosting (S3, Cloudflare Pages, etc.)

## Brand Colors

```css
--primary:    #DC2626  /* Brand red (light mode CTA) */
--dark:       #0A0A0A  /* Background */
--surface:    #161616  /* Cards */
--border:     #2A2A2A  /* Borders */
--text:       #F0F0F0  /* Primary text */
```

## Assets Needed

Before deploying, add to `public/`:
1. `favicon.ico` — convert from `assets/images/icon.png`
2. `apple-touch-icon.png` — 180×180px version of logo
3. `og-image.png` — screenshot `public/og-image.html` at 1200×630

## SEO

All metadata is configured in `app/layout.tsx`:
- Title, description, keywords
- OpenGraph tags (Facebook, LinkedIn)
- Twitter Card
- Canonical URL (update to production domain)
