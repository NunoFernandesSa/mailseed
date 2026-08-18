import { ScreenContainer } from "@/components";
import { HomeHeader } from "@/components/layout/Header";
import { useTheme } from "@/hooks/useTheme";
import useMailseedStore from "@/store/useMailseedStore";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const { theme } = useTheme();
  const { emails } = useMailseedStore();

  const emailsCount = emails.length;

  return (
    <ScreenContainer scrollable={true} safeArea={false}>
      <HomeHeader
        icon={
          <Ionicons name="mail" size={20} color={theme.colors.text.primary} />
        }
        title="Emails"
        emailsCount={emailsCount}
      />
    </ScreenContainer>
  );
};

export { HomeScreen };
