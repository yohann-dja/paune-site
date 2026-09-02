import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLocale } from '../../i18n/LocaleContext';
import './Header.css';
import LOGOTYPE_PAUNE_BLACK from '../../data/LOGOTYPE_PAUNE_BLACK.svg';

export default function Header() {
  const { t } = useLocale();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `header__link${isActive ? ' header__link--active' : ''}`;

  return (
    <header className="header">
      <div className="header__inner">
        {/* Far left: logo */}
        <Link
          to="/"
          className="header__logo"
          onClick={closeMenu}
          aria-label="PAUNE — accueil"
        >
          <img src={LOGOTYPE_PAUNE_BLACK} alt="PAUNE Architectes" />
        </Link>

        {/* Far right: nav (desktop) */}
        <nav className="header__nav" aria-label="Primary">
          <NavLink to="/work" className={linkClass}>
            {t.nav.work}
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            {t.nav.about}
          </NavLink>
          {/* 
          //Pour afficher Press
          <NavLink to="/press" className={linkClass}>
            {t.nav.press}
          </NavLink> */}
          <NavLink to="/contact" className={linkClass}>
            {t.nav.contact}
          </NavLink>
        </nav>

        {/* Mobile burger */}
        <div className="header__right">
          <button
            className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`header__mobile-nav${menuOpen ? ' header__mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav>
          <NavLink to="/work" onClick={closeMenu} className={linkClass}>
            {t.nav.work}
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className={linkClass}>
            {t.nav.about}
          </NavLink>
          {/*
          // Pour réactiver Presse sur mobile
          <NavLink to="/press" onClick={closeMenu} className={linkClass}>
            {t.nav.press}
          </NavLink> */}
          <NavLink to="/contact" onClick={closeMenu} className={linkClass}>
            {t.nav.contact}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
