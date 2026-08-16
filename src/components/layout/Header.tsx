import { useThemedStyles } from "@/hooks/useThemedStyles";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface HeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  icon?: ReactNode;
}

export const Header = ({ title, subtitle, count, icon }: HeaderProps) => {
  const s = useThemedStyles((theme) => ({
    card: {
      ...theme.mixins.card,
      gap: theme.spacing.xs,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      color: theme.colors.text.primary,
    },
    title: {
      fontSize: theme.typography.size.xl,
      fontWeight: theme.typography.weight.bold,
      color: theme.colors.text.primary,
      flexShrink: 1,
    },
    countBadge: {
      fontSize: theme.typography.size.sm,
      fontWeight: theme.typography.weight.semibold,
      color: theme.colors.text.secondary,
    },
    subtitle: {
      fontSize: theme.typography.size.sm,
      color: theme.colors.text.secondary,
    },
  }));

  return (
    <View style={s.card}>
      <View style={s.titleRow}>
        {icon && <View style={s.iconContainer}>{icon}</View>}
        <Text style={s.title}>{title}</Text>
        {count !== undefined && <Text style={s.countBadge}>({count})</Text>}
      </View>

      {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
    </View>
  );
};
