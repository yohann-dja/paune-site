import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { useLocale } from '../../i18n/LocaleContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Projects from '../Projects/Projects';
import './Home.css';

/** Auto-advance interval for the hero slideshow. */
const SLIDE_INTERVAL_MS = 7500;

export default function Home() {
  const { t } = useLocale();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % projects.length) + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const id = window.setInterval(next, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // On mobile the landing page IS the Work gallery (no hero slideshow).
  if (isMobile) return <Projects />;

  const project = projects[current];

  return (
    <section className="home">
      <div className="home__slide">
        {projects.map((p, idx) => (
          <div
            key={p.id}
            className={`home__bg${idx === current ? ' home__bg--active' : ''}`}
            aria-hidden={idx !== current}
          >
            <img
              src={p.heroImage ?? p.coverImage}
              alt={p.title}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className="home__bg-img"
            />
          </div>
        ))}

        {/* Centered title */}
        <div className="home__title-wrap" aria-live="polite">
          <Link
            key={project.id}
            to={`/work/${project.slug}`}
            className="home__project-title"
          >
            {project.title}
          </Link>
        </div>

        {/* Edge chevrons */}
        <button
          type="button"
          className="home__chevron home__chevron--left"
          onClick={prev}
          aria-label={t.project.prevProject}
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          className="home__chevron home__chevron--right"
          onClick={next}
          aria-label={t.project.nextProject}
        >
          <Chevron direction="right" />
        </button>
      </div>

    </section>
  );
}

/** Open-angle chevron used by the slideshow prev/next controls. */
function Chevron({ direction }: { direction: 'left' | 'right' }) {
  const isLeft = direction === 'left';
  return (
    <svg
      viewBox="0 0 24 32"
      width="20"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {isLeft ? (
        // Open chevron pointing left: from (18,4) → (6,16) → (18,28)
        <polyline points="18,4 6,16 18,28" />
      ) : (
        // Open chevron pointing right: from (6,4) → (18,16) → (6,28)
        <polyline points="6,4 18,16 6,28" />
      )}
    </svg>
  );
}
