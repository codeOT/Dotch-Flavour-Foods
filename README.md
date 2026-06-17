# Swigo — Next.js Restaurant Website

This project has been migrated from a static HTML template to a modern **Next.js**, **TypeScript**, and **Tailwind CSS** stack.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # React components (layout, home sections, UI)
  lib/              # Shared data and navigation config
public/
  assets/           # Images, fonts, and legacy static files
legacy/             # Original HTML templates (reference only)
```

## Available Routes

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about-us` | About Us |
| `/contact-us` | Contact |
| `/our-menu` | Menu |
| `/shop` | Shop |
| `/blog` | Blog |
| `/faq` | FAQ |
| `/services` | Services |
| `/team` | Team |
| `/testimonial` | Testimonials |

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Migration Notes

- Original HTML files are in `legacy/` for reference.
- Static assets (images, etc.) are served from `public/assets/`.
- Styling uses Tailwind CSS with the brand palette: cream `#D6B898`, orange `#CF5C0B`, rust `#9E4122`, red `#630A0A`, olive `#574821`, forest `#192E22`.
- Interactive carousels use [Swiper](https://swiperjs.com/).
