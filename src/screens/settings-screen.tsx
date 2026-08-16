import { Header, ScreenContainer } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Text, View } from "react-native";

const SettingsScreen = () => {
  const { mode, toggleTheme } = useTheme();

  const s = useThemedStyles((t) => ({
    title: {
      fontSize: t.typography.size.xl,
      fontWeight: t.typography.weight.bold,
      color: t.colors.text.primary,
      marginBottom: t.spacing.md,
    },
    card: {
      ...t.mixins.card,
    },
    rowGroup: {
      ...t.mixins.card,
      paddingHorizontal: 0,
      paddingVertical: 0,
      overflow: "hidden",
    },
    groupTitle: {
      paddingHorizontal: t.spacing.md,
      paddingTop: t.spacing.md,
      paddingBottom: t.spacing.sm,
      color: t.colors.text.secondary,
      fontSize: t.typography.size.sm,
      fontWeight: t.typography.weight.semibold,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    row: {
      minHeight: 56,
      paddingHorizontal: t.spacing.md,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: t.colors.border.subtle,
    },
    rowFirst: {
      borderTopWidth: 0,
    },
    rowLabelGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing.sm + 4,
    },
    rowLabel: {
      color: t.colors.text.primary,
      fontSize: t.typography.size.base,
      fontWeight: t.typography.weight.medium,
    },
    rowValue: {
      color: t.colors.text.secondary,
      fontSize: t.typography.size.sm,
    },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: t.colors.bg.hover,
    },
    chevron: {
      color: t.colors.text.disabled,
    },
  }));

  return (
    <ScreenContainer scrollable safeArea={false}>
      <Header title="Settings" />

      <View style={s.rowGroup}>
        <Text style={s.groupTitle}>Appearance</Text>
      </View>
      <View style={s.rowGroup}>
        <Text style={s.groupTitle}>Language</Text>
      </View>
    </ScreenContainer>
  );
};

export { SettingsScreen };
