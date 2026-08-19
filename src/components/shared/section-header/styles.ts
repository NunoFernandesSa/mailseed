import { useThemedStyles } from "@/hooks/useThemedStyles";

export const s = useThemedStyles((t) => ({
  row: {
    flexDirection: "row" as const,
    alignItems: "flex-end" as const,
    justifyContent: "space-between" as const,
    marginBottom: t.spacing.sm,
    marginTop: t.spacing.lg,
    paddingHorizontal: 2,
  },
  titles: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: t.typography.size.lg,
    color: t.colors.text.primary,
    fontWeight: t.typography.weight.bold,
  },
  subtitle: {
    fontSize: t.typography.size.sm,
    color: t.colors.text.secondary,
  },
  seeAll: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    paddingVertical: 4,
    paddingLeft: t.spacing.sm,
  },
  seeAllPressed: {
    opacity: 0.7,
  },
  seeAllText: {
    fontSize: t.typography.size.sm,
    color: t.colors.accent.blue,
    fontWeight: t.typography.weight.semibold,
  },
}));
