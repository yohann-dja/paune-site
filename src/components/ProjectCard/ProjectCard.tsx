import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types/project';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  /** Aspect ratio for the image, e.g. "4 / 3", "3 / 4", "1 / 1" */
  aspectRatio?: string;
  /** Eager-load the image (use for above-the-fold cards) */
  eager?: boolean;
}

export default function ProjectCard({
  project,
  aspectRatio = '4 / 3',
  eager = false,
}: ProjectCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/work/${project.slug}`}
      className="project-card"
      aria-label={project.title}
    >
      <div
        className="project-card__media"
        style={{ aspectRatio }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className={`project-card__img${loaded ? ' project-card__img--loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          loading={eager ? 'eager' : 'lazy'}
        />

        <div className="project-card__overlay">
          <span className="project-card__title">{project.title}</span>
        </div>
      </div>
    </Link>
  );
}
