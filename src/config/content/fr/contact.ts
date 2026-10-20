// Contact page and "Démarrer un projet" form (contact.html of the design, clarifications.md › Formulaires).
export const contact = {
  hero: {
    badge: "Contact",
    title: "Parlons de <em>votre projet.</em>",
    text: "Décrivez-le en quelques lignes. On vous répond sous deux jours ouvrables, puis on planifie un appel.",
  },
  highlights: {
    reply: {
      title: "Réponse sous 2 jours ouvrables",
      text: "Puis on planifie un appel, sans engagement",
    },
    location: {
      title: "Basés en Suisse",
      text: "Canton de Vaud · Suisse romande & alémanique",
    },
  },
  people: {
    adrien: {
      initials: "AR",
      name: "Adrien Redolat",
      role: "Communication & vente",
    },
    ralph: {
      initials: "RH",
      name: "Ralph Honhon",
      role: "Développement & production",
    },
  },
  form: {
    brief: "BRIEF PROJET",
    progress: "{count}/5 ESSENTIELS",
    title: "Démarrer un projet",
    intro:
      "Remplissez le formulaire, on revient vers vous sous deux jours ouvrables.",
    type: {
      label: "Quel type de site cherchez-vous ?",
      options: {
        vitrine: { label: "Une page pour se lancer", hint: "Exister en ligne" },
        complet: { label: "Un site complet", hint: "Jusqu'à 5 pages" },
        ecommerce: { label: "Boutique en ligne", hint: "Vente de produits" },
        grosprojet: {
          label: "Gros projet, sur mesure",
          hint: "Application, espace client",
        },
      },
    },
    company: {
      label: "Nom de l'entreprise",
      placeholder: "Ex. Pizzeria Bellini",
    },
    name: {
      label: "Votre nom",
      placeholder: "Prénom et nom",
    },
    activity: {
      label: "Votre activité, en quelques lignes",
      placeholder:
        "Ce que vous faites, à qui, et ce que le site doit vous apporter.",
    },
    email: {
      label: "Email",
      placeholder: "vous@entreprise.ch",
    },
    phone: {
      label: "Téléphone",
      optional: "(optionnel)",
      placeholder: "+41 79 000 00 00",
    },
    pack: {
      label: "Offre souhaitée",
      options: {
        indecis: "Je ne sais pas encore",
        essentiel: "Essentiel · 500 CHF",
        presence: "Présence · 1'500 CHF",
        performance: "Performance · dès 3'500 CHF",
        surMesure: "Autre, sur mesure",
      },
    },
    hint: {
      missing: "TYPE, ENTREPRISE, NOM, ACTIVITÉ, EMAIL REQUIS",
      ready: "TOUT EST PRÊT",
    },
    submit: "Envoyer →",
    pending: "Envoi en cours…",
    reassurance: "On vous répond sous deux jours ouvrables · Sans engagement",
    privacy:
      "Vos informations servent uniquement à répondre à votre demande. Détails dans les <link>mentions légales</link>.",
    honeypot: "Ne pas remplir ce champ",
    noscript:
      "Le formulaire a besoin de JavaScript pour fonctionner. Écrivez-nous directement à <link>info@clicksansbug.ch</link>, on vous répond au plus vite.",
    failure:
      "L'envoi n'a pas abouti. Réessayez dans un instant, ou écrivez-nous directement à <link>info@clicksansbug.ch</link>.",
    success: {
      title: "Message envoyé !",
      text: "Merci, votre demande est bien arrivée. On vous répond au plus vite, à l'adresse que vous avez indiquée.",
      reset: "Remplir un autre projet",
    },
  },
};
