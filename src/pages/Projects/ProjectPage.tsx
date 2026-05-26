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
      {/* Small title above the gallery */}
      <h2 className="project-page__title-small">{project.title}</h2>

      {/* Justified vertical gallery — full width between page-edge gutters */}
      <div className="project-page__gallery">
        <ProjectGallery
          items={project.images.map((src, i) => ({
            src,
            alt: `${project.title} — ${i + 1}`,
          }))}
        />
      </div>

      {/* Title + meta below the gallery — title row contains the
          "next project" link, aligned with the title baseline. */}
      <header className="project-page__header">
        <div className="project-page__title-row">
          <h1 className="project-page__title">{project.title}</h1>

          {nextProject && (
            <Link
              to={`/work/${nextProject.slug}`}
              className="project-page__next"
              aria-label={`${t.project.nextProject} — ${nextProject.title}`}
            >
              {t.project.nextProject}
            </Link>
          )}
        </div>

        <dl className="project-page__meta">
          {metaRows.map((row) => (
            <div key={row.label} className="project-page__meta-row">
              <dt className="project-page__meta-label">{row.label}</dt>
              <dd className="project-page__meta-value">{row.value}</dd>
            </div>
          ))}
        </dl>
      </header>
    </article>
  );
}
