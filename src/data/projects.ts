import { Project } from '../types/project';

/* ─────────────────────────────────────────────────────────────────────
   Project data
   ─────────────────────────────────────────────────────────────────────
*/

// Images are loaded from their folders in natural (alphabetical) order.
const martelImages = Object.values(
  import.meta.glob('./n_1/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[];

const josephDeMaistreImages = Object.values(
  import.meta.glob('./n_2/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[];

/* ─── Cover photo (portrait) shown on the Projects index ───────────
   1-based photo number within each project's folder. Change these to
   pick a different illustration photo. */
const MARTEL_COVER_PHOTO = 8;
const JOSEPH_DE_MAISTRE_COVER_PHOTO = 3;

/* ─── Hero photo (landscape) shown on the home slideshow ───────────
   1-based photo number; photo 1 is landscape in both folders. */
const MARTEL_HERO_PHOTO = 1;
const JOSEPH_DE_MAISTRE_HERO_PHOTO = 1;

/** Pick the Nth photo (1-based), falling back to the first if out of range. */
function coverPhoto(images: string[], photoNumber: number): string {
  return images[photoNumber - 1] ?? images[0];
}

export const projects: Project[] = [
  /* ── Mandar — disabled (photos moved to Joseph de Maistre) ──────────
  {
    id: 'mandar',
    slug: 'mandar',
    title: 'Mandar',
    coverImage: '', // provide an images source before re-enabling
    images: [],
    program: { fr: 'Rénovation d’appartement', en: 'Apartment renovation' },
    location: { fr: 'Paris 2', en: 'Paris 2' },
    surface: '57 m²',
    client: { fr: 'Privé', en: 'Private' },
    status: {
      fr: 'En cours — livraison juillet 2025',
      en: 'Ongoing — delivered July 2025',
    },
    photographer: 'Jean de Blignières',
  },
  ─────────────────────────────────────────────────────────────────── */

  /* ── Rennequin — disabled (photos moved to Martel) ──────────────────
  {
    id: 'rennequin',
    slug: 'rennequin',
    title: 'Rennequin',
    coverImage: '', // provide an images source before re-enabling
    images: [],
    program: { fr: 'Concept de rénovation', en: 'Renovation concept' },
    location: { fr: 'Paris 17', en: 'Paris 17' },
    surface: '120 m²',
    client: { fr: 'Privé', en: 'Private' },
    status: { fr: 'Livré mai 2025', en: 'Completed May 2025' },
  },
  ─────────────────────────────────────────────────────────────────── */

  {
    id: 'joseph-de-maistre',
    slug: 'joseph-de-maistre',
    title: 'Joseph de Maistre',
    coverImage: coverPhoto(josephDeMaistreImages, JOSEPH_DE_MAISTRE_COVER_PHOTO),
    heroImage: coverPhoto(josephDeMaistreImages, JOSEPH_DE_MAISTRE_HERO_PHOTO),
    images: josephDeMaistreImages,
    program: { fr: 'Rénovation d’appartement', en: 'Apartment renovation' },
    location: { fr: 'Paris 18', en: 'Paris 18' },
    surface: '53 m²',
    client: { fr: 'Privé', en: 'Private' },
    status: { fr: 'Livré octobre 2025', en: 'Delivered October 2025' },
    photographer: 'Jean de Blignières',
  },

  {
    id: 'martel',
    slug: 'martel',
    title: 'Martel',
    coverImage: coverPhoto(martelImages, MARTEL_COVER_PHOTO),
    heroImage: coverPhoto(martelImages, MARTEL_HERO_PHOTO),
    images: martelImages,
    program: { fr: 'Rénovation d’appartement', en: 'Apartment renovation' },
    location: { fr: 'Paris 10', en: 'Paris 10' },
    surface: '35 m²',
    client: { fr: 'Privé', en: 'Private' },
    status: { fr: 'Livré avril 2025', en: 'Delivered April 2025' },
    photographer: 'Jean de Blignières',
  },

  /* ── Hauteville — disabled ─────────────────────────────────────────
  {
    id: 'hauteville',
    slug: 'hauteville',
    title: 'Hauteville',
    coverImage:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1600&q=80',
    ],
    program: { fr: 'Aménagement d’un parking', en: 'Car park design' },
    location: { fr: 'Hauteville', en: 'Hauteville' },
    surface: '20 m²',
    client: { fr: 'Privé', en: 'Private' },
    status: { fr: 'Livré décembre 2023', en: 'Delivered December 2023' },
    photographer: 'Jean de Blignières',
  },
  ─────────────────────────────────────────────────────────────────── */

  /* ── Lalonde — disabled ────────────────────────────────────────────
  {
    id: 'lalonde',
    slug: 'lalonde',
    title: 'Lalonde',
    coverImage:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=1600&q=80',
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1600&q=80',
    ],
    program: {
      fr: 'Rénovation partielle et extension de maison',
      en: 'Partial renovation and house extension',
    },
    location: { fr: 'Provence', en: 'Provence' },
    surface: '250 m²',
    client: { fr: 'Privé', en: 'Private' },
    status: {
      fr: 'En cours — livraison septembre 2023',
      en: 'Ongoing — delivered September 2023',
    },
    photographer: 'Jean de Blignières',
  },
  ─────────────────────────────────────────────────────────────────── */
];
