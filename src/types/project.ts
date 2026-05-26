export interface LocalizedString {
  fr: string;
  en: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;

  /** Cover for homepage / grid */
  coverImage: string;

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
