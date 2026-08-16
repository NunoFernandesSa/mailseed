import { ScreenContainer } from "@/components/shared";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { platformService } from "@/services/platformService";
import { usePlatformStore } from "@/store/platformStore";
import { useEffect } from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  const { items, isLoading, error } = usePlatformStore();
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

  const stats = platformService.stats();

  useEffect(() => {
    platformService.loadAll();
  }, []);

  return (
    <ScreenContainer scrollable={false}>
      <Text style={s.title}>📬 Mailseed</Text>
      <Text style={s.subtitle}>{stats.total} platforms connected</Text>

      <View style={s.card}>
        <Text style={s.cardTitle}>
          Dashboard · {isLoading ? "loading…" : `${stats.total} rows`}
        </Text>
        {error ? (
          <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
        ) : null}
        <View style={s.cardRow}>
          <Text style={s.meta}>⭐ Starred: {stats.starred}</Text>
        </View>
        {stats.topTags.length > 0 ? (
          <View style={s.cardRow}>
            <Text style={s.meta}>
              🏷️ Top tags:{" "}
              {stats.topTags.map(([name, n]) => `${name} (${n})`).join(", ")}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={[s.card, { padding: 0, overflow: "hidden" }]}>
        <View
          style={{
            padding: s.card.padding,
            paddingBottom: s.card.padding as number,
          }}
        >
          <Text style={s.cardTitle}>Platforms</Text>
        </View>
        {items.length === 0 ? (
          <View style={{ padding: s.card.padding, paddingTop: 0 }}>
            <Text style={s.meta}>No platforms yet.</Text>
          </View>
        ) : (
          items.map((p) => (
            <View
              key={p.id}
              style={[s.cardRow, { paddingHorizontal: s.card.padding }]}
            >
              <Text style={p.starred ? s.starred : s.normal}>
                {p.starred ? "⭐ " : ""}
                {p.name}
              </Text>
              <Text style={s.meta}>{p.email}</Text>
              {p.tags && p.tags.length > 0 ? (
                <Text style={s.rowBadge}>{p.tags.join(" · ")}</Text>
              ) : null}
            </View>
          ))
        )}
      </View>
    </ScreenContainer>
  );
};

export { HomeScreen };
