import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './ProjectGallery.css';

/* ─────────────────────────────────────────────────────────────────
   ProjectGallery — vertical photo gallery with two layout variants
   ─────────────────────────────────────────────────────────────────
   variant="covers"  → 2 photos per row, each row filling the zone
                        between header and footer (projects index).
                        Photos are cropped to fill (object-fit: cover).
   variant="project" → landscape photos fill the width alone; portrait
                        photos are paired two-per-row, sized to keep
                        their native proportions (project pages).

   A cell with `href` becomes a Link with a hover overlay + caption.
   On mobile both variants collapse to one full-width photo per row.
   ───────────────────────────────────────────────────────────────── */

export interface GalleryItem {
  src: string;
  alt?: string;
  href?: string;
  caption?: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
  variant?: 'covers' | 'project';
  /** Gap between cells, in px (horizontal AND vertical). */
  gap?: number;
}

interface RowItem extends GalleryItem {
  aspect: number;
}

interface Row {
  items: RowItem[];
  height: number;
}

export default function ProjectGallery({
  items,
  variant = 'project',
  gap = 8,
}: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspects, setAspects] = useState<Record<string, number>>({});
  const [containerWidth, setContainerWidth] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  // Mobile two-tap: first tap on a clickable cell reveals its title,
  // second tap navigates. Tracks which cell is currently revealed.
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // ─── Pre-load each image to discover its native aspect ratio ───────
  useEffect(() => {
    let cancelled = false;
    setAspects({});
    Promise.all(
      items.map(
        (item) =>
          new Promise<[string, number]>((resolve) => {
            const img = new Image();
            img.onload = () =>
              resolve([
                item.src,
                img.naturalWidth && img.naturalHeight
                  ? img.naturalWidth / img.naturalHeight
                  : 1.5,
              ]);
            img.onerror = () => resolve([item.src, 1.5]);
            img.src = item.src;
          })
      )
    ).then((pairs) => {
      if (!cancelled) setAspects(Object.fromEntries(pairs));
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  // ─── Track container width (resizes on zoom / window resize) ───────
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    // Also listen to window resize as a reliable fallback (some browsers
    // don't fire the observer for viewport-driven size changes).
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Shared cell renderer (used by both variants).
  const renderCell = (
    item: GalleryItem,
    key: string,
    cellStyle?: React.CSSProperties
  ) => {
    const inner = (
      <>
        <img
          src={item.src}
          alt={item.alt ?? ''}
          className="gallery__img"
          loading="lazy"
          decoding="async"
        />
        {item.caption && (
          <div className="gallery__overlay">
            <span className="gallery__caption">{item.caption}</span>
          </div>
        )}
      </>
    );

    return item.href ? (
      <Link
        key={key}
        to={item.href}
        className={`gallery__cell gallery__cell--link${
          activeKey === key ? ' gallery__cell--active' : ''
        }`}
        style={cellStyle}
        aria-label={item.alt ?? item.caption}
        onClick={(e) => {
          if (isMobile && activeKey !== key) {
            e.preventDefault();
            setActiveKey(key);
          }
        }}
      >
        {inner}
      </Link>
    ) : (
      <div key={key} className="gallery__cell" style={cellStyle}>
        {inner}
      </div>
    );
  };

  // ─── Covers variant: 2-up full-height grid (CSS-driven) ────────────
  if (variant === 'covers') {
    return (
      <div
        className="gallery gallery--covers"
        ref={containerRef}
        style={{ gap: `${gap}px` }}
      >
        {items.map((item, i) => renderCell(item, `cover-${i}-${item.src}`))}
      </div>
    );
  }

  // ─── Project variant: aspect-packed rows ───────────────────────────
  const rows = ((): Row[] => {
    const allLoaded = items.every((it) => aspects[it.src] != null);
    if (!allLoaded || containerWidth <= 0 || items.length === 0) return [];

    // Mobile: one full-width photo per row, natural height.
    if (isMobile) {
      return items.map((item) => ({
        items: [{ ...item, aspect: aspects[item.src] }],
        height: containerWidth / aspects[item.src],
      }));
    }

    // Desktop: landscapes full width alone, portraits paired.
    const out: Row[] = [];
    let pendingPortrait: RowItem | null = null;

    const flushPortrait = () => {
      if (!pendingPortrait) return;
      const cellW = (containerWidth - gap) / 2;
      out.push({
        items: [pendingPortrait],
        height: cellW / pendingPortrait.aspect,
      });
      pendingPortrait = null;
    };

    for (const item of items) {
      const aspect = aspects[item.src];
      if (aspect >= 1) {
        flushPortrait();
        out.push({ items: [{ ...item, aspect }], height: containerWidth / aspect });
      } else if (pendingPortrait) {
        const a1 = pendingPortrait.aspect;
        out.push({
          items: [pendingPortrait, { ...item, aspect }],
          height: (containerWidth - gap) / (a1 + aspect),
        });
        pendingPortrait = null;
      } else {
        pendingPortrait = { ...item, aspect };
      }
    }
    flushPortrait();

    return out;
  })();

  return (
    <div className="gallery" ref={containerRef} style={{ gap: `${gap}px` }}>
      {rows.map((row, ri) => (
        <div
          className="gallery__row"
          key={ri}
          style={{ height: `${row.height}px`, gap: `${gap}px` }}
        >
          {row.items.map((item, ii) =>
            renderCell(item, `${ri}-${ii}-${item.src}`, {
              width: `${row.height * item.aspect}px`,
            })
          )}
        </div>
      ))}
    </div>
  );
}
