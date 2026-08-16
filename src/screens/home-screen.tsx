import { Header, ScreenContainer } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
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
