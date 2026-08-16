import { useTheme } from "@/hooks/useTheme";
import {
  ScrollView,
  StyleSheet,
  View,
  type FlexStyle,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ScreenContainerProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView. Default: false */
  scrollable?: boolean;
  /** Extra styles added to the outer wrapper. Overrides bg if provided. */
  style?: StyleProp<ViewStyle>;
  /** Styles for the inner padding zone. Use this instead of padding in `style`. */
  contentStyle?: StyleProp<FlexStyle>;
  /** Apply SafeAreaView insets. Default: true (safe area respects bg color) */
  safeArea?: boolean;
  /** Horizontal padding for the content area. Default: theme.spacing.xl (32) */
  paddingX?: number;
  /** Vertical padding for the content area. Default: theme.spacing.lg (24) */
  paddingY?: number;
  /** Gap between children inside content area. Default: 12 */
  gap?: number;
  /** Props forwarded to ScrollView when `scrollable` is true */
  scrollViewProps?: Omit<ScrollViewProps, "style" | "contentContainerStyle">;
}

/**
 * Use this wrapper as the ROOT of every screen.
 * → Automatically applies the theme bg, default spacing, safe area, and optional scroll.
 * → NEVER set `backgroundColor` manually on a screen again!
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

const styles = StyleSheet.create({
  outer: { flex: 1 },
  innerScroll: { flex: 1 },
  innerView: { flex: 1 },
});
