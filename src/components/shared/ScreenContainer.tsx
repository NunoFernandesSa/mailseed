import { useTheme } from "@/hooks/useTheme";
import { ScreenContainerProps } from "@/types";
import { ScrollView, StyleSheet, View, type FlexStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * A foundational wrapper component that should be used as the root element for every screen in the application.
 * Automatically handles core screen layout concerns: applies theme-consistent background colors, standardizes spacing
 * across the app, manages safe area insets for notch/dynamic island devices, and supports scrollable content when needed.
 * Eliminates the need to manually set background colors or recreate base layout styling on each individual screen.
 */
export const ScreenContainer = ({
  children,
  scrollable = false,
  style,
  contentStyle,
  safeArea = true,
  paddingX,
  paddingY,
  gap = 12,
  scrollViewProps,
}: ScreenContainerProps) => {
  const { theme } = useTheme();

  const defaultPadX = paddingX ?? theme.spacing.xl;
  const defaultPadY = paddingY ?? theme.spacing.lg;

  const innerContent = {
    paddingHorizontal: defaultPadX,
    paddingVertical: defaultPadY,
    gap,
  } as FlexStyle;

  const Outer = safeArea ? SafeAreaView : View;
  const Inner = scrollable ? ScrollView : View;

  return (
    <Outer
      style={[styles.outer, { backgroundColor: theme.colors.bg.base }, style]}
      edges={safeArea ? undefined : undefined}
    >
      {scrollable ? (
        <ScrollView
          style={styles.innerScroll}
          contentContainerStyle={[innerContent, contentStyle]}
          keyboardShouldPersistTaps="handled"
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.innerView, innerContent, contentStyle]}>
          {children}
        </View>
      )}
    </Outer>
  );
};

// ============================================================================
// ScreenContainer styles
// =============================================================================
const styles = StyleSheet.create({
  outer: { flex: 1 },
  innerScroll: { flex: 1 },
  innerView: { flex: 1 },
});
