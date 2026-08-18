import type { AppTheme } from "@/constants/theme";
import { useTheme } from "./useTheme";

/**
 * Creates and returns an object of styles and utility values (colors, numbers, etc.)
 * derived from the current app theme.
 *
 * Unlike the planned `useStylesheetOnly` hook, this hook **does NOT enforce** that each
 * property is a valid `ViewStyle`, `TextStyle`, or `ImageStyle` — you can freely mix
 * standard React Native styles with raw theme values like `accent: theme.colors.accent.blue`.
 *
 * ⚠️ Use `useStylesheetOnly` (if implemented later) or a separate spread operation
 * when you need strict TypeScript compatibility with React Native's `StyleSheet`.
 *
 * @example
 * ```tsx
 * const s = useThemedStyles((theme) => ({
 *   // Raw styles (usable directly in style={s.card})
 *   card: {
 *     backgroundColor: theme.colors.bg.card,
 *     borderRadius: 16,
 *     padding: theme.spacing.md,
 *   },
 *   title: { color: theme.colors.text.primary, fontSize: theme.typography.size.xl },
 *   // Utility values (usable in color={s.accent})
 *   accent: theme.colors.accent.blue,
 *   borderSubtle: theme.colors.border.subtle,
 *   chevron: theme.colors.text.disabled,
 * }));
 * ```
 */
export const useThemedStyles = <T>(factory: (theme: AppTheme) => T): T => {
  const { theme } = useTheme();
  return factory(theme);
};
