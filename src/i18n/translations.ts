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
    instagram: string;
  };
  // About page
  about: {
    body: string; // \n separated paragraphs
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
    nextProject: string;
    prevProject: string;
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
      instagram: 'Instagram',
    },
    about: {
      body: `PAUNE, fondé à Paris par Emma Pauzner et Sasha Neveu, est né d’une rencontre évidente — celle de deux regards qui, dès 2018, se reconnaissent dans une même manière de percevoir les espaces.
Formées à l’ENSA Paris-Val de Seine et l’UNIFI, toutes deux architectes HMONP, elles développent ensemble une écriture singulière, où l’intuition dialogue avec le Genius Loci. 
Chaque projet débute comme une immersion. Observer, ressentir, comprendre. Laisser apparaître les lignes de force d’un espace, capter une lumière, deviner une atmosphère. Puis vient le geste, mesuré, essentiel, qui transforme sans jamais brusquer.
Leur architecture cultive une élégance silencieuse. Matières naturelles, textures profondes, palettes nuancées : tout concourt à composer des lieux habités, où chaque détail semble à sa place. Le sur-mesure y dialogue avec des pièces choisies avec soin, dans une recherche constante d’équilibre et de cohérence.
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
      nextProject: 'Projet suivant',
      prevProject: 'Projet précédent',
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
      instagram: 'Instagram',
    },
    about: {
      body: `PAUNE, founded in Paris by Emma Pauzner and Sasha Neveu, grew out of a natural connection—a meeting of two perspectives that, as early as 2018, recognized a shared way of perceiving space.
Trained at ENSA Paris-Val de Seine and UNIFI, and both qualified architects (HMONP), they have developed a distinctive design language together, one where intuition engages in a dialogue with the genius loci.
Every project begins with immersion: observing, feeling, and understanding. It involves allowing a space’s defining lines to emerge, capturing the light, and sensing the atmosphere. Then comes the gesture—measured and essential—that transforms the space without ever disrupting it.
Their architecture cultivates a quiet elegance. Natural materials, rich textures, and nuanced palettes all combine to create living spaces where every detail feels perfectly placed. Bespoke elements converse with carefully curated pieces in a constant pursuit of balance and coherence.
Through their work, PAUNE creates interiors that are timeless, sensitive, and full of character—spaces that tell a story without ever freezing it in time.`,
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
      nextProject: 'Next project',
      prevProject: 'Previous project',
    },
  },
};
