import { Header, ScreenContainer } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import { usePlatformStore } from "@/store/platformStore";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const { items, isLoading, error } = usePlatformStore();
  const { theme } = useTheme();

  return (
    <ScreenContainer scrollable={true} safeArea={true}>
      <Header
        title="Emails"
        count={10}
        icon={
          <Ionicons name="mail" size={20} color={theme.colors.text.primary} />
        }
      />
    </ScreenContainer>
  );
};

export { HomeScreen };
