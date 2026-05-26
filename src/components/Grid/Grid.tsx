import { ReactNode, CSSProperties } from 'react';
import './Grid.css';

interface GridProps {
  /** Number of columns at desktop width. The grid auto-collapses on smaller breakpoints. */
  columns?: number;
  /** Gap between cells (any valid CSS length, e.g. '0.75rem', '12px') */
  gap?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Responsive grid container.
 *
 * - Accepts `columns` (defaults to 2) and exposes it as a CSS custom property
 *   so the layout can be tuned without prop drilling.
 * - Auto-collapses to fewer columns on tablet / mobile.
 * - Cells stay flush — children should provide their own aspect ratio so
 *   images keep their proportions without distortion.
 */
export default function Grid({
  columns = 2,
  gap = '0.75rem',
  children,
  className = '',
}: GridProps) {
  const style = {
    '--grid-cols': columns,
    '--grid-gap': gap,
  } as CSSProperties;

  return (
    <div className={`grid ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
