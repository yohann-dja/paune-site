import { useLocale } from '../../i18n/LocaleContext';
import './Contact.css';

export default function Contact() {
  const { t } = useLocale();

  return (
    <div className="contact-page">
      <div className="contact-page__inner">
        <h1 className="contact-page__title">{t.contact.title}</h1>

        <address className="contact-page__address">
          11 rue Hérold 75001 Paris
        </address>

        <div className="contact-page__links">
          <div className="contact-page__row">
            <span className="contact-page__label">{t.contact.phoneLabel}</span>
            <span className="contact-page__sep">:</span>
            <a href="tel:+33662118403" className="contact-page__value">
              +33 (0)6 62 11 84 03
            </a>
          </div>

          <div className="contact-page__row">
            <span className="contact-page__label">{t.contact.emailLabel}</span>
            <span className="contact-page__sep">:</span>
            <a href="mailto:contact@paune.fr" className="contact-page__value">
              contact@paune.fr
            </a>
          </div>

          <div className="contact-page__row">
            <span className="contact-page__label">{t.contact.instagramLabel}</span>
            <span className="contact-page__sep">:</span>
            <a
              href="https://www.instagram.com/paune.architectes/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-page__value"
            >
              paune.architectes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
