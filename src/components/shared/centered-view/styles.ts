import { AppTheme } from "@/constants/theme";

export const makeStyle = (t: AppTheme) => {
  return {
    container: {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      backgroundColor: t.colors.bg.card,
    },
  };
};
