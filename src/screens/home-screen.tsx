import {
  EmailRow,
  ScreenContainer,
  SectionHeader,
  StatCard,
} from "@/components";
import { PlatformMiniCard } from "@/components/dashboard/PlatformMiniCard";
import { HomeHeader } from "@/components/layout/Header";
import { uniqueTags } from "@/helpers/uniqueTags";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import useMailseedStore from "@/store/useMailseedStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

/**
 * Écran Home — Dashboard principal de Mailseed.
 *
 * Structure (de haut en bas) :
 *   1. HomeHeader stats KPIs : Emails count | Platforms count
 *   2. SI VIDE : empty state avec CTA "Ajouter une première donnée"
 *   3. SI DONNÉES :
 *      • Row StatCards [⏱ Ce mois · 📌 Tags uniques]
 *      • Section "Your Emails"  → liste EmailRow (cliquable vers search)
 *      • Section "Recent platforms" → mini cards (3 dernières)
 */
const HomeScreen = () => {
  const { emails, platforms } = useMailseedStore();
  const s = useDashboardStyles();

  const platformCountByEmail = useMemo(() => {
    const map = new Map<number, number>();
    platforms.forEach((p) => {
      map.set(p.emailId, (map.get(p.emailId) ?? 0) + 1);
    });
    return map;
  }, [platforms]);

  const topRecentPlatforms = useMemo(
    () => [...platforms].slice(0, 3),
    [platforms],
  );

  const totalUniqueTags = useMemo(
    () =>
      uniqueTags(
        platforms.map((p) => p.tags).filter((t): t is string => Boolean(t)),
      ),
    [platforms],
  );

  const isEmpty = emails.length === 0 && platforms.length === 0;

  return (
    <ScreenContainer scrollable safeArea>
      {/* ─── 1. Header KPIs ─── */}
      <HomeHeader
        emailsCount={emails.length}
        platformsCount={platforms.length}
        subtitle="Votre empreinte digitale numérique 💚"
      />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* ─── 2. Row StatCards ─── */}
          <View style={s.statsRow}>
            <StatCard
              icon="time-outline"
              label="Total platforms"
              value={platforms.length}
              variant="default"
            />
            <View style={{ width: 12 }} />
            <StatCard
              icon="pricetags-outline"
              label="Tags uniques"
              value={totalUniqueTags}
              variant="positive"
            />
          </View>

          {/* ─── 3. Your Emails ─── */}
          <SectionHeader
            title="Your Emails"
            subtitle="Sélectionnez une adresse pour voir ses plateformes"
            seeAllLabel="Search"
            onPressSeeAll={() => router.navigate("/(tabs)/search")}
          />
          <View style={s.cardGroup}>
            {emails.map((email) => (
              <EmailRow
                key={email.id}
                email={email.address}
                label={email.label ?? undefined}
                platformCount={platformCountByEmail.get(email.id) ?? 0}
                onPress={() => router.navigate("/(tabs)/search")}
              />
            ))}
            {emails.length === 0 ? (
              <Text style={s.softEmpty}>Aucun email enregistré</Text>
            ) : null}
          </View>

          {/* ─── 4. Recent platforms ─── */}
          <SectionHeader
            title="Recent platforms"
            subtitle="Dernières plateformes enregistrées"
            seeAllLabel={platforms.length > 3 ? "Voir tout" : undefined}
            onPressSeeAll={() => router.navigate("/(tabs)/search")}
          />
          <View style={s.cardGroup}>
            {topRecentPlatforms.length > 0 ? (
              topRecentPlatforms.map((p, idx) => (
                <PlatformMiniCard
                  key={p.id}
                  isFirst={idx === 0}
                  name={p.name}
                  url={p.url ?? undefined}
                  email={p.email?.address}
                />
              ))
            ) : (
              <Text style={s.softEmpty}>Aucune plateforme enregistrée</Text>
            )}
          </View>
        </>
      )}
    </ScreenContainer>
  );
};

/* =======================================================================
 * Empty state dashboard
 * ===================================================================== */
function EmptyState() {
  const s = useDashboardStyles();
  return (
    <View style={s.emptyCard}>
      <View style={s.emptyBubble}>
        <Ionicons name="leaf" size={48} color={s.accentGreen} />
      </View>
      <Text style={s.emptyTitle}>Bienvenue sur Mailseed</Text>
      <Text style={s.emptySub}>
        Suivez toutes les plateformes où vous utilisez vos adresses emails, en
        local.
      </Text>
      <Pressable
        onPress={() => router.push("/settings")}
        style={({ pressed }) => [
          s.emptyCta,
          pressed ? { opacity: 0.85 } : null,
        ]}
        android_ripple={{
          color: "rgba(255,255,255,0.18)",
          borderless: false,
          radius: 14,
        }}
      >
        <Ionicons name="add-circle" size={18} color="#FFFFFF" />
        <Text style={s.emptyCtaText}>Ajouter une première donnée</Text>
      </Pressable>
    </View>
  );
}

/* =======================================================================
 * Styles dashboard (styles utilitaires mélangés : styles RN + accents strings)
 * ===================================================================== */
function useDashboardStyles() {
  return useThemedStyles((t) => {
    const BLUE = t.colors.accent.blue;
    const GREEN = t.colors.accent.green;
    return {
      statsRow: {
        marginTop: t.spacing.md,
        flexDirection: "row" as const,
        alignItems: "stretch" as const,
      },
      cardGroup: {
        ...t.mixins.card,
        padding: 0,
        overflow: "hidden" as const,
      },
      softEmpty: {
        padding: t.spacing.md,
        color: t.colors.text.secondary,
        fontSize: t.typography.size.sm,
        textAlign: "center" as const,
      },

      emptyCard: {
        ...t.mixins.card,
        marginTop: t.spacing.lg,
        paddingVertical: t.spacing.xl,
        paddingHorizontal: t.spacing.lg,
        alignItems: "center" as const,
        gap: t.spacing.md,
      },
      emptyBubble: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: GREEN + "1A",
        alignItems: "center" as const,
        justifyContent: "center" as const,
        marginBottom: t.spacing.sm,
      },
      emptyTitle: {
        fontSize: t.typography.size.xl,
        color: t.colors.text.primary,
        fontWeight: t.typography.weight.bold,
      },
      emptySub: {
        fontSize: t.typography.size.sm,
        color: t.colors.text.secondary,
        textAlign: "center" as const,
        lineHeight: (t.typography.size.sm ?? 12) * 1.5,
        paddingHorizontal: t.spacing.sm,
      },
      emptyCta: {
        marginTop: t.spacing.sm,
        paddingVertical: t.spacing.sm + 2,
        paddingHorizontal: t.spacing.md,
        borderRadius: 14,
        backgroundColor: BLUE,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: t.spacing.xs,
      },
      emptyCtaText: {
        color: "#FFFFFF",
        fontWeight: t.typography.weight.bold,
        fontSize: t.typography.size.sm,
      },

      accentGreen: GREEN,
      accentBlue: BLUE,
    };
  });
}

export { HomeScreen };
