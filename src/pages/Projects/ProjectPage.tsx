import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../../data/projects';
import ProjectGallery from '../../components/ProjectGallery/ProjectGallery';
import { useLocale } from '../../i18n/LocaleContext';
import './ProjectPage.css';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLocale();

  const project = projects.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/work" replace />;

  // Next project for the inline "next project" mention
  const idx = projects.indexOf(project);
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null;

  // Build the meta rows in display order
  const metaRows: Array<{ label: string; value: string }> = [
    { label: t.project.program, value: project.program[locale] },
    { label: t.project.location, value: project.location[locale] },
    { label: t.project.surface, value: project.surface },
    { label: t.project.client, value: project.client[locale] },
    { label: t.project.status, value: project.status[locale] },
  ];
  if (project.photographer) {
    metaRows.push({ label: t.project.photographer, value: project.photographer });
  }

  return (
    <article className="project-page">
      <div className="project-page__layout">
        {/* Sticky info column (1/5 width, stays visible while scrolling) */}
        <aside className="project-page__info">
          <h1 className="project-page__title">{project.title}</h1>

          <div className="project-page__meta">
            {metaRows.map((row) => (
              <p key={row.label} className="project-page__meta-row">
                {row.label}/ {row.value}
              </p>
            ))}
          </div>

          {/* {nextProject && (
            <Link
              to={`/work/${nextProject.slug}`}
              className="project-page__next"
              aria-label={`${t.project.nextProject} — ${nextProject.title}`}
            >
              {t.project.nextProject}
            </Link>
          )} */}
        </aside>

        {/* Gallery: landscape photos full width, portraits paired 2-up */}
        <div className="project-page__gallery">
          <ProjectGallery
            variant="project"
            gap={8}
            items={project.images.map((src, i) => ({
              src,
              alt: `${project.title} — ${i + 1}`,
            }))}
          />
        </div>
      </div>
    </article>
  );
}
