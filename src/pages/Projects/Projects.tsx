import { projects } from '../../data/projects';
import ProjectGallery from '../../components/ProjectGallery/ProjectGallery';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './Projects.css';

export default function Projects() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="projects-page">
      <ProjectGallery
        items={projects.map((p) => ({
          // Mobile shows the SECOND photo of each project (with a safe
          // fallback to the cover if a project only has one image).
          src: isMobile ? p.images[1] ?? p.coverImage : p.coverImage,
          alt: p.title,
          href: `/work/${p.slug}`,
          caption: p.title,
        }))}
      />
    </div>
  );
}
