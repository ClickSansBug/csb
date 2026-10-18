export const emails = {
  notification: {
    subject: "Nouveau projet · {company}",
    title: "Nouveau projet reçu depuis clicksansbug.ch",
    receivedAt: "Reçu le {date} à {time} (heure de Zurich)",
    row: "{label} : {value}",
    activityHeading: "{label} :",
    labels: {
      type: "TYPE DE SITE",
      company: "ENTREPRISE",
      name: "CONTACT",
      email: "EMAIL",
      phone: "TÉLÉPHONE",
      pack: "OFFRE SOUHAITÉE",
      activity: "ACTIVITÉ",
    },
    notSpecified: "non précisé",
    replyHint: "Répondre à cet email écrit directement à {name} ({email}).",
    siteTypes: {
      vitrine: "Une page pour se lancer",
      complet: "Un site complet",
      ecommerce: "Boutique en ligne",
      grosprojet: "Gros projet, sur mesure",
    },
    packs: {
      indecis: "Je ne sais pas encore",
      essentiel: "Essentiel · 500 CHF",
      presence: "Présence · 1'500 CHF",
      performance: "Performance · dès 3'500 CHF",
      surMesure: "Autre, sur mesure",
    },
  },
  acknowledgement: {
    subject: "Votre demande a bien été reçue · ClickSansBug",
    greeting: "Bonjour {name},",
    received:
      "Merci pour votre message : votre demande est bien arrivée. On vous répond au plus vite.",
    followUp: "Une précision à ajouter ? Répondez simplement à cet email.",
    closing: "À bientôt !",
  },
};
