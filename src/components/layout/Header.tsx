import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Text, View } from "react-native";

const Header = () => {
  const s = useThemedStyles((theme) => ({
    title: {
      fontSize: theme.typography.size.xl,
      fontWeight: theme.typography.weight.bold,
      color: theme.colors.text.primary,
    },
    subtitle: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.size.sm,
      marginBottom: theme.spacing.md,
    },
    card: { ...theme.mixins.card },
    cardTitle: {
      color: theme.colors.text.primary,
      fontWeight: theme.typography.weight.semibold,
    },
    cardRow: {
      paddingVertical: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.subtle,
      gap: 2,
    },
    starred: {
      color: theme.colors.text.primary,
      fontWeight: theme.typography.weight.semibold,
      fontSize: theme.typography.size.base,
    },
    normal: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.size.base,
    },
    meta: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.size.sm,
    },
    rowBadge: {
      ...theme.mixins.badge(theme.colors.accent.blue),
      alignSelf: "flex-start",
      marginTop: theme.spacing.xs,
    },
  }));

  return (
    <View style={s.card}>
      <Text style={s.title}>📬 Mailseed</Text>
      <Text style={s.subtitle}>x platforms connected</Text>
    </View>
  );
};

export { Header };
