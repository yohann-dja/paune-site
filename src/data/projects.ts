import { Project } from '../types/project';

/* ─────────────────────────────────────────────────────────────────────
   Project data
   ─────────────────────────────────────────────────────────────────────
*/

// Images are loaded from their folders in natural (alphabetical) order.
const martelImages = Object.values(
  import.meta.glob('./Projets/MARTEL/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[];

const josephDeMaistreImages = Object.values(
  import.meta.glob('./Projets/JOSEPH_DE_MAISTRE/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[];

const MARTEL_COVER_FILE = 'PAUNE_02_15';
const JOSEPH_DE_MAISTRE_COVER_PHOTO = 3;

const MARTEL_HERO_PHOTO = 1;
const JOSEPH_DE_MAISTRE_HERO_PHOTO = 1;

/** Pick the Nth photo (1-based), falling back to the first if out of range. */
function coverPhoto(images: string[], photoNumber: number): string {
  return images[photoNumber - 1] ?? images[0];
}

/** Pick the image whose URL contains `name`, falling back to the first. */
function photoByName(images: string[], name: string): string {
  return images.find((src) => decodeURIComponent(src).includes(name)) ?? images[0];
}

export const projects: Project[] = [

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
    coverImage: photoByName(martelImages, MARTEL_COVER_FILE),
    heroImage: coverPhoto(martelImages, MARTEL_HERO_PHOTO),
    images: martelImages,
    program: { fr: 'Rénovation d’appartement', en: 'Apartment renovation' },
    location: { fr: 'Paris 10', en: 'Paris 10' },
    surface: '35 m²',
    client: { fr: 'Privé', en: 'Private' },
    status: { fr: 'Livré avril 2025', en: 'Delivered April 2025' },
    photographer: 'Jean de Blignières',
  },

  
];
