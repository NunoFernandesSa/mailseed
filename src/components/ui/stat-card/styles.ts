import { useThemedStyles } from "@/hooks/useThemedStyles";

export const s = useThemedStyles((t) => {
  const accent =
    (color as string) ??
    (variant === "positive"
      ? t.colors.accent.green
      : variant === "danger"
        ? t.colors.accent.red
        : t.colors.accent.blue);
  return {
    card: {
      ...t.mixins.card,
      padding: t.spacing.md,
      flex: 1,
      minHeight: 82,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing.sm,
    },
    bubble: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: accent + "1A",
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    textCol: {
      flex: 1,
      justifyContent: "center" as const,
      gap: 2,
    },
    label: {
      fontSize: t.typography.size.sm,
      color: t.colors.text.secondary,
      fontWeight: t.typography.weight.medium,
    },
    value: {
      fontSize: t.typography.size.xl,
      color: t.colors.text.primary,
      fontWeight: t.typography.weight.bold,
      lineHeight: t.typography.size.xl + 4,
    },
    accent,
  };
});
