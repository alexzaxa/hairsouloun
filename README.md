# Grain Hair Studio — website

A unisex hair salon website. Static HTML/CSS/JS, no build step, no
framework, no dependencies beyond two Google Fonts — open any `.html`
file directly or serve the folder with any static host.

Content is in Greek (the previous site's language). Everything else —
design, layout, code structure — was rebuilt from scratch.

## Files

```
index.html      Home
about.html      Studio story, philosophy, approach
services.html   Full service menu & pricing
stylists.html   Team bios
gallery.html    Color/finish look-book
faq.html        Policies, as an accordion
contact.html    Booking form + hours/location
404.html        Custom not-found page

css/styles.css  All styling — one file, sectioned with comments
js/main.js      Theme toggle, mobile nav, active-link highlighting,
                scroll reveal, FAQ accordion, contact form handler

assets/favicon.svg
```

Every page shares the same header/nav/footer markup (duplicated per
page — there's no build step to include partials) and loads the same
two shared files, so there's exactly one CSS file and one JS file to
maintain for the whole site.

## Design direction

"Atelier" — an editorial, premium look built around one accent color
rather than a busy palette:

- **Colors**: warm ivory paper / near-black ink, with a deep wine
  accent (`#7b2438` light, brighter `#d9718a` in dark mode). All
  defined as CSS custom properties at the top of `styles.css`.
- **Type**: Fraunces (serif, used for headings and italic emphasis)
  paired with Work Sans (body/UI). Loaded from Google Fonts.
- **Layout**: asymmetric editorial grids, hairline rules, generous
  whitespace — mobile-first, with breakpoints at 640px and 960px.

## Animation & interaction

- **Scroll reveal**: any element with `data-reveal` fades/slides in
  once via `IntersectionObserver` (see `initReveal()` in `main.js`).
  Stagger timing is set per-element with an inline
  `style="--reveal-delay:.1s"`.
- **Hero word reveal**: the homepage headline animates in word-by-word
  on load via CSS (`.hero-word` + `--word-delay`), no JS needed.
- **Hero motion**: a slow animated gradient mesh behind the homepage
  hero (`.hero-mesh`, pure CSS `@keyframes`).
- **Page transitions**: handled by the native CSS `@view-transition`
  rule at the top of `styles.css` — Chrome/Edge cross-fade between
  full page loads automatically; unsupported browsers just navigate
  normally. No JavaScript involved.
- **Reduced motion**: `prefers-reduced-motion: reduce` is respected
  globally — all transitions/animations collapse to near-instant, and
  reveal targets are shown immediately instead of observed.
- **Light/dark mode**: toggle button in the header. Defaults to system
  preference; an explicit choice is remembered in `localStorage`
  (`grain-theme`) and applied via `data-theme` on `<html>`.

## What's a placeholder (swap before going live)

- Business name "Grain", address "Λεωφ. Λάρτς 118", phone, email, hours
- Stylist names/bios (Stylists page + homepage teaser)
- Testimonials, FAQ answers, gallery descriptions — all realistic
  example content, not the real studio's actual policies/team
- Instagram / Google reviews links in the footer (currently `#`)
- The map on the Contact page is a static placeholder box, not a real
  embed — swap in a Google Maps iframe once there's a real address
- `og:url` tags point at `https://grainhairstudio.example/` — replace
  with the real domain once one exists
- No Open Graph image (`og:image`) is set — add a real 1200×630 image
  per page for nicer social-media link previews
- The booking form does **not** send anywhere yet — `main.js` just
  shows a placeholder confirmation message. Wire it to a real system
  (Calendly, Square Appointments, Fresha, Acuity, or your own
  backend/email endpoint) before relying on it

## Running it

Open any `.html` file directly, or serve the folder locally, e.g.:

```
python -m http.server 8000
```

then visit `http://localhost:8000/index.html`. To host it, upload the
whole folder to any static host (Netlify, Vercel, GitHub Pages,
Cloudflare Pages) — no build step required.

## Suggested next steps

- Replace placeholder content (see list above) with the real studio's
  details, then update the `og:url` domain and add `og:image` per page
- Wire the contact form to an actual backend or form service
- Add real photography (stylists, studio interior, finished work) —
  currently there's intentionally no imagery, since none was available
- Consider a `sitemap.xml` and `robots.txt` once there's a real domain
- Run a Lighthouse pass once hosted, to confirm performance/SEO scores
  in a real deployment (fonts, in particular, are worth checking under
  real network conditions)
