import { CenteredView } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator } from "react-native";

/**
 * SuspenseFallback - Fallback component for Suspense when loading.
 * Displays an ActivityIndicator in the center of the screen.
 * @returns React component for fallback loading display
 */
export const SuspenseFallback = () => {
  const { theme } = useTheme();
  return (
    <CenteredView bgColor={theme.colors.bg.base}>
      <ActivityIndicator
        animating={true}
        color={theme.colors.accent.blue}
        size="large"
      />
    </CenteredView>
  );
};
