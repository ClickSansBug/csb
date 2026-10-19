// Home page (design: index.html). Display order of keyed lists: see the exports below.
export const home = {
  hero: {
    chip: "Agence web · Canton de Vaud",
    title: "Votre site en ligne, <em>et plus rien à gérer.</em>",
    lead: "On construit votre site, on le met en ligne, et on s'en occupe ensuite. Vous n'avez rien de technique à faire.",
    primaryCta: "Demander un devis →",
    secondaryCta: "Voir les tarifs",
    facts: {
      price: "Dès 500 CHF",
      warranty: "12 mois de garantie",
      ownership: "Site 100% à vous",
    },
  },
  preview: {
    label: "Aperçu",
    caption: "Votre futur site",
    address: "votre-entreprise.ch",
    videoLabel: "Aperçu animé d'un site ClickSansBug",
    tags: {
      colors: "À VOS COULEURS",
      delivery: "LIVRÉ EN 2 À 3 SEM.",
    },
  },
  included: {
    eyebrow: "Ce qui est compris",
    title: "Ce qui est compris, <mark>toujours.</mark>",
    stats: {
      price: {
        prefix: "CHF",
        value: "500",
        title: "Prix de départ",
        text: "Une page pour exister en ligne. Vous grandissez dans l'année ? Ces 500 CHF sont déduits.",
      },
      delay: {
        value: "2 à 3",
        suffix: "sem.",
        title: "Délai annoncé",
        text: "Vous savez à l'avance quand vous êtes en ligne.",
      },
      ownership: {
        value: "100",
        suffix: "%",
        title: "Le site est à vous",
        text: "Le code, le nom de domaine, tout. Vous partez quand vous voulez.",
      },
      warranty: {
        value: "12",
        suffix: "mois",
        title: "De garantie",
        text: "Un problème venant de notre code, on le corrige sans frais.",
      },
    },
  },
  offers: {
    eyebrow: "Nos offres",
    title: "Trois formules, <em>un prix par formule.</em>",
    arrow: "→",
    rows: {
      essentiel: {
        name: "Essentiel",
        text: "Une page pour exister en ligne.",
        currency: "CHF",
        price: "500",
        delay: "2 À 3 SEM.",
      },
      presence: {
        name: "Présence",
        text: "Cinq pages pour être trouvé et convaincre.",
        currency: "CHF",
        price: "1'500",
        delay: "4 À 6 SEM.",
      },
      performance: {
        name: "Performance",
        text: "Pour vendre en ligne, jusqu'à 50 produits.",
        currency: "dès CHF",
        price: "3'500",
        delay: "6 À 10 SEM.",
      },
    },
    note: "Prix fixes · Acompte 30% à la commande · Commencez petit, grandissez sans rien perdre",
    link: "Voir le détail de chaque offre →",
  },
  after: {
    eyebrow: "Après la mise en ligne",
    title: "Et <mark>après ?</mark>",
    free: {
      label: "10 jours offerts",
      text: "Pendant 10 jours après la mise en ligne, tout ce que vous demandez est gratuit. Un bug, un mot à changer, une photo : on le fait.",
    },
    then: {
      label: "Ensuite, comme vous voulez",
      text: "On garde votre site en ligne, sauvegardé et à jour. <strong>Dès 19 CHF par mois, sans engagement.</strong>",
      alternative: "Ou vous reprenez tout, et on vous laisse tranquille.",
    },
    link: "Voir les formules d'abonnement →",
  },
  team: {
    eyebrow: "L'équipe",
    title: "Deux personnes, <mark>pas un service client.</mark>",
    intro:
      "ClickSansBug, c'est Adrien et Ralph, dans le canton de Vaud. Adrien s'occupe du projet et du contact, Ralph du développement et de la mise en ligne.",
    promise:
      "Vous parlez toujours à la même personne, du premier message à la mise en ligne.",
    asideStart: "Deux associés",
    asideEnd: "Canton de Vaud",
    members: {
      adrien: {
        initials: "AR",
        name: "Adrien Redolat",
        role: "Communication, vente et gestion de projet.",
        tags: "Projet  ·  Contact  ·  Design",
      },
      ralph: {
        initials: "RH",
        name: "Ralph Honhon",
        role: "Développement, déploiement et production.",
        tags: "Développement  ·  Déploiement  ·  Mise en ligne",
      },
    },
  },
  cta: {
    eyebrow: "Démarrer",
    title: "Parlons de <em>votre projet.</em>",
    text: "Décrivez-le en quelques lignes. Réponse sous deux jours ouvrables.",
    button: "Écrire un message →",
  },
};

export const homeFactKeys = ["price", "warranty", "ownership"] as const;
// The price figure comes first (unit before the number), then these three (unit after).
export const homeSuffixedStatKeys = ["delay", "ownership", "warranty"] as const;
export const homeOfferKeys = ["essentiel", "presence", "performance"] as const;
export const homeMemberKeys = ["adrien", "ralph"] as const;
