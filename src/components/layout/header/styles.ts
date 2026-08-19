import { useThemedStyles } from "@/hooks/useThemedStyles";

export const s = useThemedStyles((t) => ({
  card: {
    ...t.mixins.card,
    gap: t.spacing.xs,
    paddingVertical: t.spacing.md,
    paddingHorizontal: t.spacing.md,
  },
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: t.spacing.sm,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: t.colors.bg.card,
  },
  title: {
    fontSize: t.typography.size.xl,
    fontWeight: t.typography.weight.bold,
    color: t.colors.text.primary,
    flexShrink: 1,
  },
  badge: {
    ...t.mixins.badge(t.colors.accent.blue),
  },
  subtitle: {
    fontSize: t.typography.size.sm,
    color: t.colors.text.secondary,
    marginTop: t.spacing.xs,
  },
}));
