// FAQ page (design: faq.html). Display order of the questions: see faqItemKeys.
export const faq = {
  intro: {
    chip: "Questions fréquentes",
    title: "Vos questions, <em>nos réponses.</em>",
    lead: "Ce qu'on nous demande le plus souvent.",
  },
  items: {
    landingPage: {
      question: "C'est quoi exactement une page de présentation ?",
      answer:
        "Une page unique qui présente votre activité : qui vous êtes, ce que vous faites, comment vous joindre. <strong>L'offre Essentiel</strong> comprend cette page et un formulaire de contact, pour 500 CHF.",
    },
    content: {
      question: "Je n'ai pas de textes ni de photos, vous pouvez m'aider ?",
      answer:
        "Oui. On rédige vos textes pour <strong>100 CHF par page</strong>. Si vous en avez déjà et qu'ils sont à retravailler, c'est 50 CHF par page.",
    },
    hosting: {
      question: "Qui s'occupe de la mise en ligne de mon site ?",
      answer:
        "Vous avez le choix. Avec un abonnement, <strong>on s'occupe de tout, dès 19 CHF par mois</strong> : déploiement sur un compte ouvert à votre nom, gestion du nom de domaine, sauvegardes, surveillance. Sans abonnement, on vous remet le code complet et vous choisissez votre hébergeur : comptez 10 à 25 CHF par an pour le domaine et quelques francs par mois pour l'hébergement. Dans les deux cas, le site vous appartient.",
    },
    area: {
      question: "Vous travaillez dans toute la Suisse ?",
      answer:
        "Oui, Suisse romande et alémanique. Tout se fait à distance : <strong>appel vidéo, lien de prévisualisation, partage d'écran</strong>. Pas besoin de se déplacer. Genève, Lausanne, Zurich, Berne : même qualité de service.",
    },
    payment: {
      question: "Comment se passe le paiement ?",
      answer:
        "<strong>30 % d'acompte</strong> à la commande, les <strong>70 % restants</strong> à la livraison. Le prix du devis est le prix final. Nos prix sont nets, la taxe sur la valeur ajoutée n'est pas applicable.",
    },
    changes: {
      question: "Et si je veux modifier quelque chose après la livraison ?",
      answer:
        "Pendant <strong>10 jours après la mise en ligne, tout est gratuit</strong>, bug ou simple détail. Ensuite, un problème venant de notre code reste corrigé sans frais pendant 12 mois. Pour des modifications régulières, l'abonnement Présence en comprend deux petites par mois. Sinon, chaque modification a un prix fixe : 50 CHF pour une petite, 150 CHF pour une moyenne. Vous recevez notre réponse sous 7 jours, avec le prix et le délai.",
    },
    start: {
      question: "Comment ça se passe concrètement pour démarrer ?",
      answer:
        "Vous nous écrivez, par le formulaire ou par email. <strong>On vous répond sous deux jours ouvrables</strong>, puis on planifie un appel pour les détails.",
    },
  },
  cta: {
    title: "Votre question n'est <em>pas ici ?</em>",
    text: "Un message suffit. Réponse sous deux jours ouvrables.",
    button: "Nous contacter →",
  },
};

export const faqItemKeys = [
  "landingPage",
  "content",
  "hosting",
  "area",
  "payment",
  "changes",
  "start",
] as const;
