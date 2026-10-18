export const validation = {
  contact: {
    type: {
      invalid: "Choisissez le type de site qui vous correspond.",
    },
    company: {
      required: "Indiquez le nom de votre entreprise.",
      tooShort: "Au moins 2 caractères.",
      tooLong: "100 caractères au maximum.",
      link: "Les liens ne sont pas acceptés dans ce champ.",
    },
    name: {
      required: "Indiquez votre prénom et votre nom.",
      tooShort: "Au moins 2 caractères.",
      tooLong: "100 caractères au maximum.",
      link: "Les liens ne sont pas acceptés dans ce champ.",
    },
    activity: {
      required: "Décrivez votre activité en quelques lignes.",
      tooShort: "Encore quelques mots : 10 caractères au minimum.",
      tooLong: "2000 caractères au maximum.",
    },
    email: {
      required: "Indiquez votre adresse email.",
      invalid: "Cette adresse email ne semble pas valide.",
      tooLong: "254 caractères au maximum.",
    },
    phone: {
      invalid: "Ce numéro ne semble pas valide. Exemple : +41 79 000 00 00",
      tooLong: "30 caractères au maximum.",
    },
    pack: {
      invalid: "Choisissez une offre dans la liste.",
    },
  },
};
