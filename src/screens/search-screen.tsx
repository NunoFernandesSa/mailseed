import { ScreenContainer } from "@/components";
import type { Platform } from "@/db/schema";
import { useTheme } from "@/hooks/useTheme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const SearchScreen = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Platform[]>([]);

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
      <Text style={s.title}>🔍 Search</Text>
      <TextInput
        style={s.input}
        placeholder="Name, email, URL, notes…"
        placeholderTextColor={theme.colors.text.disabled}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardAppearance={theme.mode}
      />
      {query.trim().length > 0 && results.length === 0 ? (
        <Text style={s.empty}>No results for "{query}"</Text>
      ) : null}
      {results.length > 0 ? (
        <View style={s.card}>
          <Text style={s.resultTitle}>{results.length} results</Text>
          {results.map((p) => (
            <View key={p.id} style={s.row}>
              <Text style={s.resultTitle}>
                {p.starred ? "⭐ " : ""}
                {p.name}
              </Text>
              <Text style={s.resultSub}>{p.email}</Text>
              {p.url ? <Text style={s.resultSub}>{p.url}</Text> : null}
            </View>
          ))}
        </View>
      ) : null}
    </ScreenContainer>
  );
};

export { SearchScreen };
