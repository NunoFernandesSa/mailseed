export const TYPOGRAPHY = {
  family: '"Inter", system-ui, -apple-system, sans-serif',

  size: {
    xs: 10, // Badges (PRO, 2FA)
    sm: 12, // Sous-titres (ex: "6 platforms connected")
    base: 14, // Barre de recherche et noms de plateformes
    lg: 15, // Adresses emails (ex: "nuno.m@entreprise.pro")
    xl: 18, // Titres de page ("Mail Accounts", "Dashboard")
  },

  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
