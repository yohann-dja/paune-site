import { Project } from '../types/project';

/* ─────────────────────────────────────────────────────────────────────
   Project data
   ─────────────────────────────────────────────────────────────────────
*/

/** Move the image whose filename contains `needle` to the front. */
function withCoverFirst(images: string[], needle: string): string[] {
  const idx = images.findIndex((src) =>
    decodeURIComponent(src).includes(needle)
  );
  if (idx <= 0) return images;
  return [images[idx], ...images.slice(0, idx), ...images.slice(idx + 1)];
}

// Martel.
const martelImages = withCoverFirst(
  Object.values(
    import.meta.glob('./n_1/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
      eager: true,
      query: '?url',
      import: 'default',
    })
  ) as string[],
  '16.36.33 (7)'
);

// Joseph de Maistre.
const josephDeMaistreImages = withCoverFirst(
  Object.values(
    import.meta.glob('./n_2/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
      eager: true,
      query: '?url',
      import: 'default',
    })
  ) as string[],
  '17.17.03'
);

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
    coverImage: josephDeMaistreImages[0],
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
    coverImage: martelImages[0],
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
