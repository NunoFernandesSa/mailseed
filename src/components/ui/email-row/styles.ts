import { AppTheme } from "@/constants/theme";

export const makeStyles = (t: AppTheme) => ({
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingVertical: t.spacing.sm + 2,
    paddingHorizontal: t.spacing.md,
    gap: t.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: t.colors.border.subtle,
  },
  firstRow: {
    borderTopWidth: 0,
    paddingTop: t.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: t.colors.accent.blue + "1A",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  initials: {
    fontSize: t.typography.size.sm,
    fontWeight: t.typography.weight.bold,
    color: t.colors.accent.blue,
  },
  content: {
    flex: 1,
    justifyContent: "center" as const,
    gap: 2,
  },
  email: {
    fontSize: t.typography.size.base,
    color: t.colors.text.primary,
    fontWeight: t.typography.weight.semibold,
  },
  label: {
    fontSize: t.typography.size.sm,
    color: t.colors.text.secondary,
  },
  badge: {
    ...t.mixins.badge(t.colors.text.secondary),
  },
  rightCol: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: t.spacing.sm,
  },
  chevron: {
    color: t.colors.text.disabled,
  },
});
