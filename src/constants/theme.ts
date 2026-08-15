import { BASE_COLORS, COLOR_PALETTES, ThemeMode } from "./colors";
import { SPACING } from "./spacing";
import { TYPOGRAPHY } from "./typography";

// Fonction qui génère le thème complet selon le mode passé en paramètre
export const createTheme = (mode: ThemeMode = "dark") => {
  const colors = COLOR_PALETTES[mode];

  return {
    mode,
    // On assemble les couleurs dynamiques + les accents fixes
    colors: {
      ...colors,
      accent: BASE_COLORS.accent,
      brand: BASE_COLORS.brand,
    },
    spacing: SPACING,
    typography: TYPOGRAPHY,

    // Tes "Mixins" (styles réutilisables) dépendent maintenant du thème
    mixins: {
      card: {
        backgroundColor: colors.bg.card,
        borderRadius: 16,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: colors.border.subtle, // Bordure subtile pour le Light mode
      },
      badge: (color: string) => ({
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: color,
        color: color,
        borderRadius: 12,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        fontSize: TYPOGRAPHY.size.xs,
        fontWeight: TYPOGRAPHY.weight.semibold,
      }),
    },
  };
};

// Type pour l'inférence TypeScript
export type AppTheme = ReturnType<typeof createTheme>;
