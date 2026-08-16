import { Header, ScreenContainer } from "@/components";
import { usePlatformStore } from "@/store/platformStore";

const HomeScreen = () => {
  const { items, isLoading, error } = usePlatformStore();

  return (
    <ScreenContainer scrollable={true} safeArea={true}>
      <Header />
    </ScreenContainer>
  );
};

export { HomeScreen };
