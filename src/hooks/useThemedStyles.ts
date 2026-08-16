import type { AppTheme } from "@/constants/theme";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "./useTheme";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

/**
 * Hook to build themed styles once inside a component.
 * Replaces the boilerplate of `const { theme } = useTheme();` + inline `theme.colors.*` everywhere.
 *
 * @example
 * ```tsx
 * const styles = useThemedStyles((theme) => ({
 *   card: {
 *     backgroundColor: theme.colors.bg.card,
 *     borderRadius: 16,
 *     padding: theme.spacing.md,
 *   },
 *   title: { color: theme.colors.text.primary, fontSize: theme.typography.size.xl },
 * }));
 *
 * <View style={styles.card}>…</View>
 * ```
 */
export function useThemedStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  factory: (theme: AppTheme) => T,
): T {
  const { theme } = useTheme();
  return factory(theme);
}
