# PAUNE Architectes — Portfolio

Architecture portfolio website inspired by [concina.fr](https://www.concina.fr/).
Built with React + Vite + TypeScript.

---

## Quickstart

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Design System

### Palette (strict)

| Token | Value | Usage |
|---|---|---|
| `--color-cream` | `#fbf8f6` | Main background |
| `--color-grey`  | `#e5e2de` | Hover / active state |
| `--color-white` | `#ffffff` | On dark backgrounds |
| `--color-black` | `#000000` | All text — including the header on the home page |

### Spacing — two-tier margin system

The site uses a deliberate **dual-gutter system** so the header/footer stay flush with the window edges while page content lives inside generous editorial margins.

| Token | Value | Used by |
|---|---|---|
| `--edge-px`     | `clamp(1.25rem, 2.5vw, 2.25rem)` | Header, Footer, Work grid (concina-style edge-aligned content) |
| `--content-px`  | `clamp(1.5rem, 8vw, 7rem)` | About, Contact, Press, Project pages (editorial body) |
| `--content-max` | `1240px` | Soft upper bound on content width on very wide screens |

The `.container` utility class encapsulates the editorial pattern:

```css
.container {
  width: 100%;
  max-width: var(--content-max);
  margin-inline: auto;
  padding-inline: var(--content-px);
}
```

### Typography

- **Titles & subtitles** → `Centaur MT Regular` (humanist serif)
- **Body** → `Sequel Sans Light Body` (clean neogrotesque)

#### Font availability

Both brand fonts are **commercial** and not available on Google Fonts, Adobe Fonts, or any free CDN:

- **Centaur MT** — Monotype, ~$35 per style on MyFonts
- **Sequel Sans** — OGJ Type Design, sold as a family on MyFonts

The codebase loads them from `/public/fonts/` via `@font-face`. **Drop the licensed `.woff2` files there and they will be used automatically — no code changes required.** Expected filenames:

```
public/fonts/centaur-mt-regular.woff2
public/fonts/sequel-sans-light-body.woff2
```

While the brand fonts are absent, the fallback chain renders:

| Slot | Web fallback (loaded from Google Fonts) | System fallback |
|---|---|---|
| Display | EB Garamond | Georgia, Times New Roman, serif |
| Body | Inter | Helvetica, Arial, sans-serif |

These were chosen because EB Garamond shares the humanist proportions and old-style figure feel of Centaur, and Inter mirrors Sequel Sans's neutral neo-grotesque rhythm.

---

## Internationalization (FR / EN)

The site has full bilingual support via a lightweight React context (`src/i18n/`).

- Default language is detected from `navigator.language`
- The user's choice is persisted in `localStorage`
- The toggle lives in the footer (`fr | en`)
- All UI strings, project metadata (program, location, client, status), and editorial content are bilingual

To add a new string, edit `src/i18n/translations.ts` — both `fr` and `en` are required by TypeScript.

---

## Architecture

```
src/
├── components/
│   ├── Layout/         # Page shell with overlay header
│   ├── Header/         # Transparent, centered, no underline
│   ├── Footer/         # No separator, FR|EN toggle, right-aligned ©
│   ├── Grid/           # ⭐ Reusable responsive grid (configurable columns)
│   ├── ProjectCard/    # Cover + dark overlay + centered title on hover
│   └── ProjectGallery/ # Slideshow for project pages
├── pages/
│   ├── Home/           # Slow auto-advance slideshow (7.5s per slide)
│   ├── About/          # Centered editorial layout
│   ├── Contact/        # Minimalist, no separators, all black
│   ├── Press/          # Coming soon placeholder
│   └── Projects/       # Work grid + individual project pages
├── i18n/               # FR/EN translation system
├── data/projects.ts    # All 6 projects with bilingual fields
└── types/project.ts    # Project type with required spec fields
```

### Reusable `<Grid>` component

```tsx
import Grid from './components/Grid/Grid';

<Grid columns={3} gap="1rem">
  {items.map(item => <Card key={item.id} {...item} />)}
</Grid>
```

The grid auto-collapses on smaller breakpoints — pass `columns` and `gap`, drop in any children, and images keep their aspect ratio because `<ProjectCard>` controls its own ratio rather than letting the grid stretch them.

---

## Pages overview

### Home
Full-width image slideshow that starts **below** the header on initial load (so the hero never sits behind the logo on first paint, but the transparent fixed header overlays it during scroll). Slowed auto-advance from 5 s → **7.5 s** per slide for a calmer rhythm; 1.4 s cross-fade between images. Two open-angle SVG chevrons (`<` / `>`) sit at the left and right edges of the hero for manual navigation.

### Work (`/work`)
Two-column responsive grid (collapses to 1 column on mobile). Each card displays a cover image; hovering reveals a soft dark overlay with the project name fading in. **No zoom-on-hover.**

### Project (`/work/:slug`)
Two-column layout with the gallery on the left and the project metadata pinned to the right. Metadata fields per spec: Program, Location, Surface, Client, Status, Photographer (when provided).

### About (`/about`)
Two-column layout — image on the **left**, text on the **right** — with the whole block centered horizontally inside the editorial content margins. Collapses to a stacked single-column layout on tablet/mobile. The PAUNE bilingual manifesto replaces the previous biography. Email block removed per spec.

### Contact (`/contact`)
Centered, no separators, all text in black. Tighter vertical rhythm than the previous version.

---

## Notes

- All images are placeholder Unsplash URLs — replace with the agency's photography by editing `src/data/projects.ts`.
- The portrait on the About page is also a placeholder (`PORTRAIT_URL` in `About.tsx`).
- The Header swaps logo colour automatically depending on the route — white on the home page (full-bleed photo), black elsewhere.
