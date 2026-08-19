import { ScreenContainer } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useState } from "react";
import { TextInput } from "react-native";

export const SearchScreen = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");

  const s = useThemedStyles((t) => ({
    title: {
      fontSize: t.typography.size.xl,
      fontWeight: t.typography.weight.bold,
      color: t.colors.text.primary,
    },
    input: {
      marginTop: t.spacing.md,
      backgroundColor: t.colors.bg.input,
      borderRadius: 12,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.sm + 4,
      color: t.colors.text.primary,
      fontSize: t.typography.size.base,
      borderWidth: 1,
      borderColor: t.colors.border.subtle,
    },
    card: { ...t.mixins.card, marginTop: t.spacing.md },
    resultTitle: {
      color: t.colors.text.primary,
      fontWeight: t.typography.weight.semibold,
    },
    resultSub: {
      color: t.colors.text.secondary,
      fontSize: t.typography.size.sm,
    },
    row: {
      paddingVertical: t.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: t.colors.border.subtle,
      gap: 2,
    },
    empty: {
      color: t.colors.text.secondary,
      marginTop: t.spacing.md,
      textAlign: "center",
    },
  }));

  return (
    <ScreenContainer scrollable={false}>
      <TextInput
        style={s.input}
        placeholder="Search email or platform"
        placeholderTextColor={theme.colors.text.disabled}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardAppearance={theme.mode}
      />
    </ScreenContainer>
  );
};
