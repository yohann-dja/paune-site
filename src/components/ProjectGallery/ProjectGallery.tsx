import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './ProjectGallery.css';

/* ─────────────────────────────────────────────────────────────────
   ProjectGallery — generic justified vertical gallery
   ─────────────────────────────────────────────────────────────────
   Each item is rendered as a cell whose width is computed so the row
   exactly fills the container, with a constant gap. Cells are plain
   <img> by default; if `href` is provided the cell becomes a router
   <Link>, and if `caption` is provided a centred title fades in on
   hover (used by the projects index page). The two extras are fully
   opt-in — project pages keep the bare image-only behaviour.
   ───────────────────────────────────────────────────────────────── */

export interface GalleryItem {
  src: string;
  alt?: string;
  /** If set, the cell becomes a clickable Link to this route. */
  href?: string;
  /** If set, this label fades in over the image on hover. */
  caption?: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
}

interface RowItem extends GalleryItem {
  aspect: number;
}

interface Row {
  items: RowItem[];
  height: number;
}

/** Constant gap (horizontal AND vertical) between cells — matches the CSS. */
const GAP_PX = 2;

export default function ProjectGallery({ items }: ProjectGalleryProps) {
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
    return () => ro.disconnect();
  }, []);

  // ─── Pack items into justified rows ────────────────────────────────
  const rows = useMemo<Row[]>(() => {
    const allLoaded = items.every((it) => aspects[it.src] != null);
    if (!allLoaded || containerWidth <= 0 || items.length === 0) return [];

    // Mobile: one full-width image per row, natural height (no cropping).
    if (isMobile) {
      return items.map((item) => {
        const aspect = aspects[item.src];
        return {
          items: [{ ...item, aspect }],
          height: containerWidth / aspect,
        };
      });
    }

    const target = containerWidth / 2;
    const out: Row[] = [];
    let current: RowItem[] = [];
    let aspectSum = 0;

    for (const item of items) {
      const aspect = aspects[item.src];
      current.push({ ...item, aspect });
      aspectSum += aspect;
      const totalGap = (current.length - 1) * GAP_PX;
      const rowHeight = (containerWidth - totalGap) / aspectSum;
      if (rowHeight <= target) {
        out.push({ items: current, height: rowHeight });
        current = [];
        aspectSum = 0;
      }
    }

    // Trailing partial row — left-aligned, capped at target height.
    if (current.length > 0) {
      const totalGap = (current.length - 1) * GAP_PX;
      const naturalHeight = (containerWidth - totalGap) / aspectSum;
      out.push({
        items: current,
        height: Math.min(naturalHeight, target),
      });
    }

    return out;
  }, [items, aspects, containerWidth, isMobile]);

  return (
    <div className="gallery" ref={containerRef}>
      {rows.map((row, ri) => (
        <div
          className="gallery__row"
          key={ri}
          style={{ height: `${row.height}px` }}
        >
          {row.items.map((item, ii) => {
            const cellStyle = { width: `${row.height * item.aspect}px` };
            const inner = (
              <>
                <img
                  src={item.src}
                  alt={item.alt ?? ''}
                  className="gallery__img"
                  loading={ri === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                {item.caption && (
                  <div className="gallery__overlay">
                    <span className="gallery__caption">{item.caption}</span>
                  </div>
                )}
              </>
            );

            const key = `${ri}-${ii}-${item.src}`;

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
                  // Mobile: first tap reveals the title, second navigates.
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
          })}
        </div>
      ))}
    </div>
  );
}
