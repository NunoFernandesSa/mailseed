import { CenteredView } from "@/components/shared";
import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator } from "react-native";

const SuspenseFallback = () => {
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

export { SuspenseFallback };
