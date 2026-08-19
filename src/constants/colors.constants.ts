// 1. Les couleurs d'accentuation (Elles ne changent pas entre Dark et Light)
export const BASE_COLORS = {
  accent: {
    blue: "#58A6FF",
    green: "#3FB950",
    orange: "#D29922",
    purple: "#BC8CFF",
    red: "#F85149",
  },
  // Couleurs pour les logos Gmail, Outlook, etc. si besoin
  brand: {
    gmail: "#EA4335",
    outlook: "#0078D4",
    google: "#4285F4",
  },
} as const;

// 2. Les palettes de fond et texte (Celles-ci changent avec le mode)
export const COLOR_PALETTES = {
  dark: {
    bg: {
      base: "#0D1117",
      surface: "#161B22",
      card: "#1C2128",
      input: "#21262D",
      hover: "#30363D",
    },
    text: {
      primary: "#F0F6FC",
      secondary: "#8B949E",
      disabled: "#484F58",
    },
    border: {
      subtle: "#21262D",
      strong: "#30363D",
    },
  },
  light: {
    bg: {
      base: "#F6F8FA", // Gris très clair (Github Light)
      surface: "#FFFFFF", // Blanc pur pour la zone principale
      card: "#FFFFFF",
      input: "#E1E4E8", // Gris clair
      hover: "#F3F4F6",
    },
    text: {
      primary: "#24292F", // Presque noir
      secondary: "#57606A", // Gris foncé
      disabled: "#AFB8C1", // Gris clair
    },
    border: {
      subtle: "#D0D7DE",
      strong: "#8B949E",
    },
  },
} as const;

// Type utilitaire pour typer les couleurs
export type ThemeMode = "dark" | "light";
export type ThemeColors = typeof COLOR_PALETTES.dark;
