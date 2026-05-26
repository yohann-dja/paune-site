import { Link } from 'react-router-dom';
import { useLocale } from '../../i18n/LocaleContext';
import LogoPauneBlack from '../../data/LOGO_PAUNE_BLACK.svg?react';
import './Footer.css';

export default function Footer() {
  const { locale, setLocale, t } = useLocale();

  return (
    <footer className="footer">
      {/* Top row — all three items vertically centred */}
      <div className="footer__top">
        {/* Left: Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          {t.footer.instagram}
        </a>

        {/* Center: logo → home */}
        <Link to="/" className="footer__logo" aria-label="PAUNE — accueil">
          <LogoPauneBlack aria-hidden="true" />
        </Link>

        {/* Right: language toggle */}
        <div className="footer__lang" role="group" aria-label="Language">
          <button
            type="button"
            className={`footer__lang-btn${locale === 'fr' ? ' footer__lang-btn--active' : ''}`}
            onClick={() => setLocale('fr')}
            aria-pressed={locale === 'fr'}
          >
            fr
          </button>
          <span className="footer__lang-sep" aria-hidden="true">|</span>
          <button
            type="button"
            className={`footer__lang-btn${locale === 'en' ? ' footer__lang-btn--active' : ''}`}
            onClick={() => setLocale('en')}
            aria-pressed={locale === 'en'}
          >
            en
          </button>
        </div>
      </div>

      {/* Copyright — fine print pinned to bottom-right inside the gutters */}
      <div className="footer__copy">
        © {new Date().getFullYear()} Paune Architectes. {t.footer.rights}
      </div>
    </footer>
  );
}
