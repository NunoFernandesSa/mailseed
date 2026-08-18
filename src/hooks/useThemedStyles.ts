import type { AppTheme } from "@/constants/theme";
import { useTheme } from "./useTheme";

/**
 * Build + retourne un objet de styles ET de valeurs utilitaires (couleurs, nombres…)
 * dérivé du thème courant.
 *
 * Contrairement à `useStylesheetOnly`, ce hook **N'IMPose PAS** que chaque propriété
 * soit un `ViewStyle | TextStyle | ImageStyle` — tu peux mélanger styles bruts
 * avec des chaînes `accent: theme.colors.accent.blue`.
 *
 * ⚠️ Utilise `useStylesheetOnly` (si on le crée plus tard) ou un spread séparé
 * quand tu veux un typage strict compatible `StyleSheet`.
 *
 * @example
 * ```tsx
 * const s = useThemedStyles((theme) => ({
 *   // Styles bruts (style={s.card})
 *   card: {
 *     backgroundColor: theme.colors.bg.card,
 *     borderRadius: 16,
 *     padding: theme.spacing.md,
 *   },
 *   title: { color: theme.colors.text.primary, fontSize: theme.typography.size.xl },
 *   // Valeurs utilitaires (utilisées dans color={s.accent})
 *   accent: theme.colors.accent.blue,
 *   borderSubtle: theme.colors.border.subtle,
 *   chevron: theme.colors.text.disabled,
 * }));
 * ```
 */
export function useThemedStyles<T>(factory: (theme: AppTheme) => T): T {
  const { theme } = useTheme();
  return factory(theme);
}
