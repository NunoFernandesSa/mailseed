import { AppTheme } from "@/constants/theme";

export const makeStyles = (t: AppTheme) => ({
  miniCard: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.sm + 2,
  },
  miniAvatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: t.colors.accent.blue + "1A",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  miniName: {
    fontSize: t.typography.size.base,
    color: t.colors.text.primary,
    fontWeight: t.typography.weight.semibold,
  },
  miniSub: {
    fontSize: t.typography.size.sm,
    color: t.colors.text.secondary,
  },
  accentBlue: t.colors.accent.blue,
  accentGreen: t.colors.accent.green,
  borderSubtle: t.colors.border.subtle,
  chevron: t.colors.text.disabled,
});
