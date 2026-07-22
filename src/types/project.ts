export interface LocalizedString {
  fr: string;
  en: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;

  /** Portrait cover shown on the Projects index */
  coverImage: string;

  /** Landscape image shown on the home slideshow */
  heroImage?: string;

  /** Full project gallery */
  images: string[];

  /** Project meta — bilingual where needed */
  program: LocalizedString;
  location: LocalizedString;
  surface: string;
  client: LocalizedString;
  status: LocalizedString;
  photographer?: string;
}
