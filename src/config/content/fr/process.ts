// Process page (processus.html of the design).
// Not named `process`, which would shadow the Node.js global where it is imported.
export const processPage = {
  hero: {
    badge: "Comment ça marche",
    title: "Simple, <em>de A à Z.</em>",
    text: "Du premier message à la mise en ligne, vous n'avez rien de technique à faire.",
  },
  steps: {
    contact: {
      number: "01",
      tag: "EMAIL · GRATUIT",
      title: "Premier contact",
      text: "Vous nous décrivez votre projet en quelques lignes. <strong>On vous répond sous deux jours ouvrables</strong>, puis on planifie un appel. Sans engagement.",
    },
    quote: {
      number: "02",
      tag: "PRIX FIXE",
      title: "Devis et contrat",
      text: "Un devis clair : <strong>prix ferme, périmètre écrit, délai annoncé</strong>. Vous signez, vous versez 30 % d'acompte, on démarre.",
    },
    build: {
      number: "03",
      tag: "SELON LA FORMULE",
      title: "Design & construction",
      text: "On construit votre site et vous suivez l'avancement sur un <strong>lien de prévisualisation</strong>. Le délai commence quand on a reçu vos textes et vos photos.",
    },
    launch: {
      number: "04",
      tag: "VOUS ÊTES EN LIGNE",
      title: "Mise en ligne",
      text: "Votre site est en ligne et on vous montre comment il fonctionne. <strong>Pendant 10 jours, toute retouche est gratuite.</strong>",
    },
  },
  promises: {
    eyebrow: "Nos promesses",
    title: "Trois choses, <mark>tenues.</mark>",
    items: {
      commitment: {
        number: "01",
        title: "Sans engagement",
        text: "Le premier contact est gratuit et ne vous engage à rien.",
      },
      warranty: {
        number: "02",
        title: "12 mois de garantie",
        text: "Un problème venant de notre code, on le corrige sans frais.",
      },
      ownership: {
        number: "03",
        title: "Propriété à 100%",
        text: "Le site, le domaine, le code : tout est à vous. Vous partez quand vous voulez.",
      },
    },
  },
};
