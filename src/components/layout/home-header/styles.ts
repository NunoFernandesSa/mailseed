import { AppTheme } from "@/constants/theme";

export const makeStyle = (t: AppTheme) => {
  const BLUE = t.colors.accent.blue;
  const GREEN = t.colors.accent.green;
  return {
    card: {
      ...t.mixins.card,
      paddingVertical: t.spacing.lg,
      paddingHorizontal: t.spacing.lg,
      gap: t.spacing.md,
    },
    row: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
    },
    stat: {
      flex: 1,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing.sm,
    },
    statRight: {
      justifyContent: "flex-end" as const,
    },
    bubble: {
      width: 42,
      height: 42,
      borderRadius: 12,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    bubbleBlue: { backgroundColor: BLUE + "1A" },
    bubbleGreen: { backgroundColor: GREEN + "1A" },
    textCol: {
      justifyContent: "center" as const,
      gap: 2,
    },
    textColRight: {
      alignItems: "flex-end" as const,
    },
    label: {
      fontSize: t.typography.size.sm,
      color: t.colors.text.secondary,
      fontWeight: t.typography.weight.medium,
    },
    count: {
      fontSize: t.typography.size.xl,
      color: t.colors.text.primary,
      fontWeight: t.typography.weight.bold,
      lineHeight: t.typography.size.xl + 4,
    },
    subtitle: {
      fontSize: t.typography.size.sm,
      color: t.colors.text.secondary,
      marginTop: t.spacing.xs,
      lineHeight: (t.typography.size.sm ?? 12) * 1.45,
    },
    BLUE,
    GREEN,
  };
};
