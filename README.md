# Grain Hair Studio — website

A unisex hair salon website. Static HTML/CSS/JS, no build step — just open `index.html`.

## Files
- `index.html` — all page content/structure
- `styles.css` — all styling (colors/fonts as CSS variables at the top)
- `script.js` — mobile nav toggle + placeholder booking form handler
- `assets/favicon.svg` — browser tab icon

## What's a placeholder (swap before going live)
- Business name "Grain", address "118 Larch Street", phone, email, hours
- Stylist names/bios in the Stylists section
- Testimonials
- Prices in the Services section
- Instagram / Google reviews links in the footer (currently `#`)
- The booking form does **not** send anywhere yet — `script.js` just shows a
  fake confirmation message. Wire it to a real system (Calendly, Square
  Appointments, Fresha, Acuity, or your own backend/email endpoint) before
  relying on it.

## Customizing look
Colors and fonts live as CSS custom properties at the top of `styles.css`
(`:root { --plaster, --ink, --walnut, --brass, ... }`) — change them there and
they apply everywhere.

Fonts are loaded from Google Fonts (Big Shoulders Display for headings, IBM
Plex Sans for body) via the `<link>` tags in `index.html`.

## Running it
Just double-click `index.html` to preview locally. To host it, upload the
whole folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare
Pages) or a regular web host — no server/build process required.
