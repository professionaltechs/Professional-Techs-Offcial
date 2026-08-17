# Professional Techs — Corporate Website

A premium, animated, multinational-style corporate website for a software development company, built with Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + React Three Fiber (3D hero).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom bright premium theme — indigo/violet/cyan gradient on off-white base)
- Framer Motion (scroll reveals, transitions, counters)
- React Three Fiber + drei (3D floating shapes in Hero)
- React Hook Form + Zod (Contact form validation)
- lucide-react (icons)
- Font: Poppins (via next/font/google)

## Project Structure

See `app/` for routes, `components/` for UI (layout, sections, three, ui, shared), `data/` for editable content (services, projects, testimonials, team), `lib/` for utils & constants, `types/` for shared TypeScript types.

## What's Done (Session 1)

- Full project scaffold, Tailwind theme, global styles
- Home page: Hero (3D), Client Logos marquee, Services grid, Stats counters, Portfolio preview, Process timeline, Testimonials carousel, CTA
- About page (mission/vision/values, stats, team grid)
- Services page + dynamic `/services/[slug]` detail pages
- Portfolio page + dynamic `/portfolio/[slug]` detail pages
- Careers page (placeholder open positions)
- Contact page with validated form (React Hook Form + Zod) — currently logs to console, needs backend wiring
- Navbar (responsive, scroll-aware) + rich Footer
- 404 page

## What's Still Needed / TODO

1. **Real portfolio data** — replace placeholder projects in `data/projects.ts` with actual client projects (images, descriptions, links)
2. **Real images** — add actual project screenshots, team photos, client logos to `public/images/`, `public/logos/`
3. **Contact form backend** — wire `components/sections/ContactForm.tsx` `onSubmit` to a real API route or service (e.g. Resend, SendGrid, Formspree, or a Next.js API route + email)
4. **Careers data** — replace placeholder job openings in `app/careers/page.tsx` with real listings (or move to `data/careers.ts`)
5. **Team data** — replace placeholder team in `data/team.ts` with real names/photos
6. **Client logos** — replace text marquee in `ClientLogos.tsx` with actual logo images
7. Run `npm install` and test build locally — this project was scaffolded without network access, so dependencies have NOT been installed or build-tested yet. Please run `npm run build` and fix any type/lint errors that surface.
8. Optional: add a light/dark mode toggle, blog section, case-study rich content for portfolio pages, analytics integration

## Notes for the Next AI Agent / Developer

- All content-heavy sections pull from `data/*.ts` — do not hardcode content inside components.
- Theme colors/fonts are centralized in `tailwind.config.ts` — adjust there, not per-component.
- 3D scene (`components/three/HeroScene.tsx`) is loaded via `next/dynamic` with `ssr: false` to avoid SSR issues — keep this pattern for any new 3D components.
- This codebase has not yet been `npm install`-ed or build-tested (sandboxed environment had no network access during scaffolding). First step for whoever picks this up: install dependencies and run a build to catch any issues.
