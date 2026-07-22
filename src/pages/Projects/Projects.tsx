import { projects } from '../../data/projects';
import ProjectGallery from '../../components/ProjectGallery/ProjectGallery';
import './Projects.css';

export default function Projects() {
  return (
    <div className="projects-page">
      <ProjectGallery
        variant="covers"
        gap={10}
        items={projects.map((p) => ({
          src: p.coverImage,
          alt: p.title,
          href: `/work/${p.slug}`,
          caption: p.title,
        }))}
      />
    </div>
  );
}
