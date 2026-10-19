// Pricing page (design: tarifs.html). Display order of keyed lists: see the exports below.
export const pricing = {
  intro: {
    chip: "Tarifs",
    title: "Trois formules, <em>un prix par formule.</em>",
    lead: "Un prix ferme, un périmètre écrit, un délai annoncé. Vous choisissez, on s'occupe du reste.",
  },
  offers: {
    includedTitle: "Ce qui est inclus",
    cta: "Choisir cette offre →",
    plans: {
      essentiel: {
        tab: "Essentiel",
        number: "Offre 1",
        name: "Essentiel",
        price: "500",
        currency: "CHF",
        meta: "Prix fixe · 2 à 3 sem.",
        text: "Une page pour exister en ligne.",
        items: {
          page: "1 page complète, en plusieurs sections",
          design: "Design adapté à votre logo et à vos couleurs",
          screens: "Affichage adapté à tous les écrans",
          form: "Formulaire de contact",
          security: "Connexion sécurisée et bandeau cookies",
          seo: "Référencement de base et fiche Google",
          handover: "Une série de modifications et une séance de prise en main",
          warranty: "10 jours de retouches, puis 12 mois de garantie",
          upgrade:
            "Vous passez à Présence dans les 12 mois ? Vos 500 CHF sont déduits",
        },
      },
      presence: {
        tab: "Présence",
        number: "Offre 2",
        name: "Présence",
        price: "1'500",
        currency: "CHF",
        meta: "Prix fixe · 4 à 6 sem.",
        text: "Cinq pages pour être trouvé et convaincre.",
        items: {
          pages: "Jusqu'à 5 pages",
          design: "Design sur mesure, tous les écrans",
          form: "Formulaire de contact",
          security: "Connexion sécurisée et bandeau cookies",
          seo: "Référencement de base et statistiques de fréquentation",
          speed: "Vitesse d'affichage vérifiée avant la mise en ligne",
          handover:
            "Deux allers-retours de design et une séance de prise en main",
          warranty: "10 jours de retouches, puis 12 mois de garantie",
        },
      },
      performance: {
        tab: "Performance",
        number: "Offre 3",
        name: "Performance",
        prefix: "dès",
        price: "3'500",
        currency: "CHF",
        meta: "Prix fixe · 6 à 10 sem.",
        text: "Pour vendre en ligne, jusqu'à 50 produits.",
        items: {
          pages: "Jusqu'à 5 pages et la boutique, design sur mesure",
          shop: "Boutique en ligne, jusqu'à 50 produits",
          payment: "Paiement en ligne par prestataire externe",
          seo: "Référencement et statistiques de fréquentation",
          handover: "Deux séances de prise en main, dont une sur vos produits",
          warranty: "10 jours de retouches, puis 12 mois de garantie",
          options: "Deuxième langue, blog et lettre d'information en option",
        },
      },
    },
  },
  terms: {
    payment: {
      title: "Paiement en deux fois",
      text: "30% d'acompte à la commande, 70% à la livraison. Aucun frais caché.",
    },
    deployment: {
      title: "Déploiement",
      text: "Avec l'abonnement, dès 19 CHF/mois, on met votre site en ligne et on le met à jour pour vous, sur un compte ouvert à votre nom. Sans abonnement, on vous remet le code complet et vous gérez vous-même domaine et mise en ligne.",
    },
    ownership: {
      title: "Propriété à 100%",
      text: "Le site, le code et le domaine vous appartiennent. Vous partez quand vous voulez.",
    },
  },
  maintenance: {
    eyebrow: "Maintenance",
    title: "Votre site reste <mark>vivant.</mark>",
    aside: {
      edition: "Édition 2026",
      prices: "Prix fermes en CHF",
      commitment: "Sans engagement de durée",
    },
    text: "Deux chemins après la livraison : vous reprenez tout et vous gérez, ou on garde votre site en ligne. Dépliez une formule pour en voir le détail.",
    columns: {
      ref: "Réf.",
      plan: "Formule",
      amount: "Montant",
    },
    detailTitle: "Détail de la prestation",
    unit: "CHF/mois",
    cta: "Retenir cette formule →",
    plans: {
      essentiel: {
        ref: "A",
        name: "Essentiel",
        summary: "Déploiement, sauvegardes et surveillance, sans y penser",
        price: "19",
        items: {
          deployment: "Déploiement inclus, sur un compte à votre nom",
          domain: "Gestion du nom de domaine",
          versions: "Chaque version du site conservée",
          monitoring: "Surveillance du site et alerte automatique",
          updates: "Mises à jour techniques et correction de nos bugs",
          support: "Prise en charge sous 72 h ouvrables",
        },
      },
      presence: {
        ref: "B",
        name: "Présence",
        summary: "L'Essentiel, plus deux petites modifications par mois",
        price: "39",
        items: {
          essentials: "Tout l'Essentiel",
          edits: "2 petites modifications par mois",
          rollover: "Non utilisées, elles passent au mois suivant",
          examples: "Un texte, une photo, un horaire, un prix, un lien",
          support: "Prise en charge sous 48 h ouvrables",
          fit: "La formule pensée pour Présence",
        },
      },
      performance: {
        ref: "C",
        name: "Performance",
        summary: "Pour les boutiques : sécurité du paiement et priorité",
        price: "79",
        items: {
          essentials: "Tout l'Essentiel",
          security: "Suivi de sécurité de la boutique et du paiement",
          support: "Prise en charge sous 24 h ouvrables",
          edits: "4 petites modifications par mois, ou une moyenne",
          review: "Point trimestriel de 30 minutes",
          fit: "La formule des boutiques en ligne",
        },
      },
    },
    conditions:
      "Sans engagement · Résiliable pour la fin du mois suivant, par email · Forfait de sortie 90 CHF",
    discounts: "Au trimestre : −10 % · À l'année : −15 %",
  },
  options: {
    eyebrow: "Options",
    title: "Besoin de <mark>plus ?</mark>",
    text: "Ajoutez ce dont vous avez besoin, quand vous en avez besoin. Prix fermes.",
    currency: "CHF",
    items: {
      page: { name: "Page supplémentaire", price: "250" },
      copywriting: { name: "Rédaction des textes (par page)", price: "100" },
      blog: { name: "Blog", price: "350" },
      language: { name: "Structure d'une langue supplémentaire", price: "250" },
      newsletter: { name: "Lettre d'information", price: "250" },
      booking: { name: "Réservation en ligne", price: "dès 700" },
      members: { name: "Espace membre", price: "dès 900" },
      redesign: { name: "Refonte de site existant", price: "sur devis" },
      smallEdit: { name: "Petite modification, hors abonnement", price: "50" },
      mediumEdit: {
        name: "Modification moyenne, hors abonnement",
        price: "150",
      },
    },
  },
  cta: {
    title: "Une question sur <em>nos tarifs ?</em>",
    text: "Un message suffit. Réponse sous deux jours ouvrables.",
    button: "Nous contacter →",
  },
};

export const pricingOfferKeys = [
  "essentiel",
  "presence",
  "performance",
] as const;

export const pricingOfferItemKeys = {
  essentiel: [
    "page",
    "design",
    "screens",
    "form",
    "security",
    "seo",
    "handover",
    "warranty",
    "upgrade",
  ],
  presence: [
    "pages",
    "design",
    "form",
    "security",
    "seo",
    "speed",
    "handover",
    "warranty",
  ],
  performance: [
    "pages",
    "shop",
    "payment",
    "seo",
    "handover",
    "warranty",
    "options",
  ],
} as const;

// Highlighted line of an offer (design: green, weight 500).
export const pricingOfferHighlight = { essentiel: "upgrade" } as const;

export const pricingTermKeys = ["payment", "deployment", "ownership"] as const;

export const maintenancePlanKeys = [
  "essentiel",
  "presence",
  "performance",
] as const;

// Two columns per plan, as in the design.
export const maintenancePlanItemKeys = {
  essentiel: [
    ["deployment", "domain", "versions"],
    ["monitoring", "updates", "support"],
  ],
  presence: [
    ["essentials", "edits", "rollover"],
    ["examples", "support", "fit"],
  ],
  performance: [
    ["essentials", "security", "support"],
    ["edits", "review", "fit"],
  ],
} as const;

export const pricingOptionKeys = [
  "page",
  "copywriting",
  "blog",
  "language",
  "newsletter",
  "booking",
  "members",
  "redesign",
  "smallEdit",
  "mediumEdit",
] as const;

// Options shown without a currency unit after the price (design: "sur devis").
export const pricingOptionsWithoutUnit = ["redesign"] as const;
