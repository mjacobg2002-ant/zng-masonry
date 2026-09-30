# Z&G Masonry LLC — Homepage

A premium, redesigned homepage for **Z&G Masonry LLC**, a paver / brick / stone / concrete
masonry contractor in Fairfax, VA. Rebuilt from the existing site at
[zngmasonry.com](https://www.zngmasonry.com/), using the company's **real brand colors,
project photos, and a real review**.

Built as a fast, dependency-free static site with a full-bleed **background video hero**.

**Live site:** _(GitHub Pages — see repo Settings → Pages)_

---

## Business details
- **Company:** Z&G Masonry LLC
- **Phone:** 703-996-9053
- **Address:** 10649 Maple St, Fairfax, VA 22030
- **Tagline:** "Your satisfaction, it is our commitment."
- **Hours:** Mon–Fri 8a–5p · Sat 8a–1p · Sun closed
- **Services:** Paver work · Brick work · Stone work · Concrete work (patios, walkways, steps, fire pits, retaining walls, hardscape)
- **Service area:** Fairfax & Northern Virginia
- **Social:** Facebook · Instagram (@zngmasonry)

## Tech
- Static **HTML + CSS + vanilla JS** — no build step, no framework, no dependencies.
- Google Fonts (Archivo + Inter). Everything else is local.
- Accessible: semantic landmarks, single `<h1>`, keyboard nav, visible focus,
  `prefers-reduced-motion`, descriptive alt text.
- SEO: descriptive title/meta, Open Graph, and `GeneralContractor` JSON-LD with service
  areas, opening hours, and social profiles.

## Structure
```
index.html            # full homepage
css/styles.css        # design system + all sections + responsive
js/main.js            # fixed/transparent header, mobile menu, scroll reveals, form shell
assets/img/           # real project photos + favicon
assets/video/         # hero background video + poster
```

## Design
**Brick red + warm stone on charcoal** — drawn from the Z&G logo (`#C04A2F` / `#8D2424`).
Dark, transparent header (goes solid on scroll). Since the real logo is a tiny, low-res
badge, the logo was **built as type**: "**Z&G** Masonry" with a brick-red accent bar and a
"Paver · Brick · Stone · Concrete" descriptor. Archivo + Inter typography.

## Notes for the client
- **Logo** — the header/footer use a clean **text logo** (the real logo file is only ~50px
  wide). Swap in a real vector logo image later if one is available.
- **Photos** — the gallery uses **real Z&G project photos** pulled from the site (fire-pit
  patio, brick walkway, flagstone steps & walkway). They're fairly small originals; higher-res
  replacements can drop into `assets/img/`.
- **Review** — the testimonial is a **real 5-star review** (Michael P.) from the site.
- **Hero video** is a free Pexels clip (concrete pour), muted/looping, reduced-motion aware.
- **Estimate form** is front-end only — wire it to email or a CRM to capture leads.
- Only substantiated facts are used (services, tagline, hours, address, service area,
  warranty mention) — no invented founding year, credentials, or review counts.

## Deploy (GitHub Pages)
Settings → Pages → Source: `main` / root. The site publishes at the Pages URL.
Local preview: open `index.html`, or run `python3 -m http.server` in the repo root.
