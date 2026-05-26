# Athallazhafran — Interactive Portfolio

A motion-rich, single-page developer portfolio built with **React**, **Vite**, **Three.js** (`@react-three/fiber`), **GSAP**, **Framer Motion**, and **Tailwind CSS**. All content lives in JSON files—no backend required. Deploy anywhere static files are hosted.

## Quick start

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # output in dist/
npm run preview  # preview production build
```

## Deploy (one command)

**Vercel** (recommended):

```bash
npx vercel
```

**Netlify**:

```bash
npm run build && npx netlify deploy --prod --dir=dist
```

**GitHub Pages**: set `base` in `vite.config.ts` to your repo name, then use `gh-pages` or Actions to publish `dist/`.

---

## Editing your content

All copy is in `src/data/`. Edit these files—no code changes needed for basic updates.

### `profile.json`

| Field | Description |
|-------|-------------|
| `name`, `shortName`, `title`, `tagline`, `location`, `email` | Hero & about |
| `cvPath` | Path to PDF in `public/` (default `/cv.pdf`) |
| `socials` | `github`, `linkedin`, `email` URLs |
| `bio` | About section paragraph |
| `terminalLines` | Fake terminal commands (strings) |

### `skills.json`

```json
{ "name": "React.js", "level": 5, "category": "frontend" }
```

`level` is **0–10**. Bars animate on scroll when the About section enters view.

### `study.json`

- `current`: institution, program, focus areas, progress %, modules, semester goals, syllabus
- `timeline[]`: `{ year, title, institution, description }` for the scroll-scrubbed journey

### `projects.json`

```json
{
  "id": "my-app",
  "name": "Project Name",
  "description": "Short blurb",
  "longDescription": "Modal / case study text",
  "tech": ["React", "TypeScript"],
  "category": "Web",
  "demo": "https://...",
  "repo": "https://github.com/...",
  "thumbnail": "/placeholders/project-placeholder.svg",
  "featured": true,
  "challenges": "...",
  "learnings": "...",
  "role": "Developer",
  "timeline": "2025",
  "beforeImage": "/path/before.svg",
  "afterImage": "/path/after.svg",
  "caseStudy": {
    "problem": "...",
    "approach": "...",
    "outcome": "..."
  }
}
```

- Set **exactly one** project with `"featured": true` for the full-width case study + before/after slider.
- `filters` at the top control tab labels (must match `category` values or `"All"`).

### `certificates.json`

```json
{
  "id": "cert-1",
  "name": "Certificate Name",
  "issuer": "Issuer",
  "date": "Jan 2025",
  "link": "https://verify...",
  "credentialId": "optional-id",
  "type": "Certificates"
}
```

`type` must match a value in `filters` (e.g. `Certificates`, `Hackathons`, `Awards`, `Competitions`).

---

## Assets

| File | Purpose |
|------|---------|
| `public/cv.pdf` | Resume for “Download CV” — **replace with your real PDF** |
| `public/placeholders/` | Default project images — swap for WebP/PNG (use `loading="lazy"`) |

---

## Features

- **3D hero**: Torus knot with mouse parallax (simplified on mobile / `prefers-reduced-motion`)
- **GSAP ScrollTrigger**: section reveals, skill bars, study timeline scrub
- **Lenis** smooth scroll (disabled when reduced motion is preferred)
- **Themes**: Dark / Darker / Retro terminal (palette icon in nav)
- **Keyboard**: `P` Projects, `S` Study, `C` Certificates, `A` About, `H` Home, `O` Contact, `?` help
- **Konami code**: Matrix rain easter egg
- **DevTools panel**: Terminal icon in nav — fake console logs
- **Contact form**: Front-end validation + toast (wire [Formspree](https://formspree.io) for real email)

### Formspree (optional)

1. Create a form at formspree.io  
2. Add `VITE_FORMSPREE_ID=your_id` to `.env`  
3. Point the contact form `action` to `https://formspree.io/f/${id}`

---

## Project structure

```
src/
├── components/
│   ├── hero/          HeroSection, HeroScene (R3F)
│   ├── about/         AboutSection, SkillsBars, TerminalWidget
│   ├── study/         StudySection, StudyTimeline
│   ├── projects/      ProjectsSection, ProjectCard, FeaturedCaseStudy, …
│   ├── certificates/  CertificatesSection, CertificateCard (flip)
│   ├── contact/       ContactSection
│   ├── layout/        Navbar, Footer, LoadingScreen, DevTools, ShortcutHelp
│   ├── effects/       MatrixRain, CursorTrail
│   └── ui/            SectionWrapper, MagneticButton, ThemeSwitcher
├── context/           AppProvider (theme, sound, logs, matrix mode)
├── data/              JSON content files
└── hooks/             Lenis, Konami, keyboard shortcuts
```

---

## Tech stack

- React 19 + TypeScript + Vite  
- Tailwind CSS v4  
- @react-three/fiber + drei + three  
- GSAP + ScrollTrigger  
- Framer Motion  
- Lenis  
- Lucide icons  

---

## License

MIT — customize freely for your portfolio.
