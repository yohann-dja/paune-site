import { Link } from 'react-router-dom';
import { useLocale } from '../../i18n/LocaleContext';
import LogoPauneBlack from '../../data/LOGO_PAUNE_BLACK.svg?react';
import './Footer.css';

export default function Footer() {
  const { locale, setLocale } = useLocale();

  return (
    <footer className="footer">
      {/* Top row — logo centred, language toggle on the right */}
      <div className="footer__top">
        {/* Left: empty placeholder keeps the logo centred in the grid */}
        <span aria-hidden="true" />

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
    </footer>
  );
}
