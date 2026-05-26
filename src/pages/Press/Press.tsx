import { useLocale } from '../../i18n/LocaleContext';
import './Press.css';

export default function Press() {
  const { t } = useLocale();

  return (
    <div className="press-page">
      <div className="press-page__inner">
        <h1 className="press-page__title">{t.press.title}</h1>
        <p className="press-page__coming">{t.press.coming}</p>
      </div>
    </div>
  );
}
