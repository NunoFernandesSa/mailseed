import { useThemedStyles } from "./useThemedStyles";

export const useDashboardStyles = () => {
  return useThemedStyles((t) => {
    const BLUE = t.colors.accent.blue;
    const GREEN = t.colors.accent.green;
    return {
      statsRow: {
        marginTop: t.spacing.md,
        flexDirection: "row" as const,
        alignItems: "stretch" as const,
      },
      cardGroup: {
        ...t.mixins.card,
        padding: 0,
        overflow: "hidden" as const,
      },
      softEmpty: {
        padding: t.spacing.md,
        color: t.colors.text.secondary,
        fontSize: t.typography.size.sm,
        textAlign: "center" as const,
      },

      emptyCard: {
        ...t.mixins.card,
        marginTop: t.spacing.lg,
        paddingVertical: t.spacing.xl,
        paddingHorizontal: t.spacing.lg,
        alignItems: "center" as const,
        gap: t.spacing.md,
      },
      emptyBubble: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: GREEN + "1A",
        alignItems: "center" as const,
        justifyContent: "center" as const,
        marginBottom: t.spacing.sm,
      },
      emptyTitle: {
        fontSize: t.typography.size.xl,
        color: t.colors.text.primary,
        fontWeight: t.typography.weight.bold,
      },
      emptySub: {
        fontSize: t.typography.size.sm,
        color: t.colors.text.secondary,
        textAlign: "center" as const,
        lineHeight: (t.typography.size.sm ?? 12) * 1.5,
        paddingHorizontal: t.spacing.sm,
      },
      emptyCta: {
        marginTop: t.spacing.sm,
        paddingVertical: t.spacing.sm + 2,
        paddingHorizontal: t.spacing.md,
        borderRadius: 14,
        backgroundColor: BLUE,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: t.spacing.xs,
      },
      emptyCtaText: {
        color: "#FFFFFF",
        fontWeight: t.typography.weight.bold,
        fontSize: t.typography.size.sm,
      },

      accentGreen: GREEN,
      accentBlue: BLUE,
    };
  });
};
