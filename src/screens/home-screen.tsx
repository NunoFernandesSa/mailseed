import {
  EmailRow,
  EmptyState,
  HomeHeader,
  ScreenContainer,
  SectionHeader,
  StatCard,
} from "@/components";
import { PlatformMiniCard } from "@/components/dashboard/platform-mini-card/index.tsx";
import { uniqueTags } from "@/helpers/uniqueTags";
import { useDashboardStyles } from "@/hooks/useDashboardStyles";
import useMailseedStore from "@/store/useMailseedStore";
import { router } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";

export const HomeScreen = () => {
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
