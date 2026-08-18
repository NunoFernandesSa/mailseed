import { useThemedStyles } from "@/hooks/useThemedStyles";
import type { HeaderProps } from "@/types";
import { Text, View } from "react-native";

/**
 * Header - Generic header component for settings, search, etc.
 * Displays a title, subtitle, and optional icon with a count badge.
 */
export const Header = ({ title, subtitle, icon, count }: HeaderProps) => {
  const s = useThemedStyles((t) => ({
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

  return (
    <View style={s.card}>
      <View style={s.row}>
        {icon ? <View style={s.iconWrap}>{icon}</View> : null}
        <Text style={s.title}>{title}</Text>
        {count !== undefined && count > 0 ? (
          <View style={s.badge}>
            <Text>{count}</Text>
          </View>
        ) : null}
      </View>
      {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};
