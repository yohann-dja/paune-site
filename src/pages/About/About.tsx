import { useLocale } from '../../i18n/LocaleContext';
import './About.css';

import aboutPicture from '../../data/about_picture.jpg';

export default function About() {
  const { t } = useLocale();
  const paragraphs = t.about.body.split('\n');

  return (
    <div className="about-page">
      <div className="about-page__row">
        {/* LEFT: portrait */}
        <div className="about-page__image">
          <img
            src={aboutPicture}
            alt="Emma Pauzner & Sasha Neveu — PAUNE Architectes"
            className="about-page__portrait"
            loading="eager"
          />
        </div>

        {/* RIGHT: text */}
        <div className="about-page__text">
          {/* Invisible copy of the header nav — sizes the text column to
              exactly the menu width (so the text starts under the "P" of
              "Projets"). Adapts automatically to FR/EN and to the menu
              font via shared --nav-* tokens. */}
          <div className="about-page__widthref" aria-hidden="true">
            <span>{t.nav.work}</span>
            <span>{t.nav.about}</span>
            <span>{t.nav.contact}</span>
          </div>

          <div className="about-page__body">
            {paragraphs.map((para, i) => (
              <p key={i} className="about-page__para">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
