import { useLocale } from '../../i18n/LocaleContext';
import './About.css';

import aboutPicture from '../../data/about_picture.jpeg';

export default function About() {
  const { t } = useLocale();
  const paragraphs = t.about.body.split('\n');

  return (
    <div className="about-page">
      <div className="container">
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
            <h1 className="about-page__title">{t.about.title}</h1>

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
    </div>
  );
}
