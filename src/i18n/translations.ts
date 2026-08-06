export type Locale = 'fr' | 'en';

export interface Translations {
  // Navigation
  nav: {
    work: string;
    about: string;
    press: string;
    contact: string;
  };
  // Footer
  footer: {
    rights: string; // "All rights reserved"
    instagram: string;
  };
  // About page
  about: {
    title: string;
    body: string; // \n\n separated paragraphs
  };
  // Contact page
  contact: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
    instagramLabel: string;
  };
  // Press page
  press: {
    title: string;
    coming: string;
  };
  // Project page meta labels
  project: {
    program: string;
    location: string;
    surface: string;
    client: string;
    status: string;
    photographer: string;
    allProjects: string;
    nextProject: string;
    prevProject: string;
    galleryPrev: string;
    galleryNext: string;
  };
}

export const translations: Record<Locale, Translations> = {
  fr: {
    nav: {
      work: 'Projets',
      about: 'À propos',
      press: 'Presse',
      contact: 'Contact',
    },
    footer: {
      rights: 'Tous droits réservés',
      instagram: 'Instagram',
    },
    about: {
      title: 'Paune',
      body: `PAUNE, fondé à Paris par Emma Pauzner et Sasha Neveu, est né d'une rencontre évidente — celle de deux regards qui, dès 2018, se reconnaissent dans une même manière de percevoir les espaces. Formées à l'ENSA Paris-Val de Seine, toutes deux architectes HMONP, elles développent ensemble une écriture singulière, où l'intuition dialogue avec le Genius Loci.
Chaque projet débute comme une immersion. Observer, ressentir, comprendre. Laisser apparaître les lignes de force d'un espace, capter une lumière, deviner une atmosphère. Puis vient le geste, mesuré, essentiel, qui transforme sans jamais brusquer.
Leur architecture cultive une élégance silencieuse. Matières naturelles, textures profondes, palettes nuancées : tout concourt à composer des lieux habités, où chaque détail semble à sa place.
Le sur-mesure y dialogue avec des pièces choisies avec soin, dans une recherche constante d'équilibre et de cohérence.
À travers ses réalisations, Paune dessine des intérieurs intemporels, sensibles et incarnés. Des espaces qui racontent une histoire sans jamais la figer.`,
    },
    contact: {
      title: 'Agence',
      phoneLabel: 'Téléphone',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
    },
    press: {
      title: 'Presse',
      coming: 'Bientôt disponible',
    },
    project: {
      program: 'Programme',
      location: 'Lieu',
      surface: 'Surface',
      client: 'Client',
      status: 'Statut',
      photographer: 'Photographe',
      allProjects: 'Tous les projets',
      nextProject: 'Projet suivant',
      prevProject: 'Projet précédent',
      galleryPrev: 'Image précédente',
      galleryNext: 'Image suivante',
    },
  },
  en: {
    nav: {
      work: 'Work',
      about: 'About',
      press: 'Press',
      contact: 'Contact',
    },
    footer: {
      rights: 'All rights reserved',
      instagram: 'Instagram',
    },
    about: {
      title: 'Paune',
      body: `PAUNE, founded in Paris by Emma Pauzner and Sasha Neveu, was born from an obvious encounter — that of two perspectives which, as early as 2018, recognised in each other a shared way of perceiving spaces. Trained at ENSA Paris-Val de Seine, both architects HMONP, they have developed together a singular voice, in which intuition dialogues with the Genius Loci.\n
Each project begins as an immersion. Observe, feel, understand. Let the lines of force of a space emerge, capture a quality of light, sense an atmosphere. Then comes the gesture — measured, essential — that transforms without ever forcing.\n
Their architecture cultivates a quiet elegance. Natural materials, deep textures, nuanced palettes: everything contributes to composing inhabited places, where each detail seems to be in its right place.\n
Bespoke pieces dialogue with carefully chosen ones, in a constant search for balance and coherence.\n
Through its work, Paune designs timeless, sensitive, embodied interiors. Spaces that tell a story without ever fixing it.`,
    },
    contact: {
      title: 'Studio',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
    },
    press: {
      title: 'Press',
      coming: 'Coming soon',
    },
    project: {
      program: 'Program',
      location: 'Location',
      surface: 'Surface',
      client: 'Client',
      status: 'Status',
      photographer: 'Photographer',
      allProjects: 'All projects',
      nextProject: 'Next project',
      prevProject: 'Previous project',
      galleryPrev: 'Previous image',
      galleryNext: 'Next image',
    },
  },
};
