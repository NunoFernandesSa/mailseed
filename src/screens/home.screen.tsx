import { EmptyState } from "@/components/dashboard/empty-state";
import { PlatformMiniCard } from "@/components/dashboard/platform-mini-card";
import { HomeHeader } from "@/components/layout/home-header";
import { ScreenContainer } from "@/components/shared/screen-container";
import { SectionHeader } from "@/components/shared/section-header";
import { EmailRow } from "@/components/ui/email-row";
import StatCard from "@/components/ui/stat-card";
import { uniqueTags } from "@/helpers/uniqueTags";
import { useAppData } from "@/hooks/useAppData";
import { useDashboardStyles } from "@/hooks/useDashboardStyles";
import useMailseedStore from "@/store/useMailseedStore";
import { router } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";

export const HomeScreen = () => {
  const { emails, platforms, getPlatformCountByEmail } = useMailseedStore();
  const s = useDashboardStyles();
  const { t } = useAppData();

  const platformCountByEmail = useMemo(
    () => getPlatformCountByEmail(),
    [platforms, getPlatformCountByEmail],
  );

  const topRecentPlatforms = useMemo(
    () => [...platforms].slice(0, t.params.maxRecentPlatformsPreview),
    [platforms, t.params.maxRecentPlatformsPreview],
  );

  const totalUniqueTags = useMemo(
    () =>
      uniqueTags(
        platforms
          .map((p) => p.tags)
          .filter((tag): tag is string => Boolean(tag)),
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
        subtitle={t.home.headerSubtitle}
      />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* ─── 2. Row StatCards ─── */}
          <View style={s.statsRow}>
            <StatCard
              icon="time-outline"
              label={t.home.stats.totalPlatforms}
              value={platforms.length}
              variant="default"
            />
            <View style={{ width: 12 }} />
            <StatCard
              icon="pricetags-outline"
              label={t.home.stats.uniqueTags}
              value={totalUniqueTags}
              variant="positive"
            />
          </View>

          {/* ─── 3. Your Emails ─── */}
          <SectionHeader
            title={t.home.sections.yourEmails.title}
            subtitle={t.home.sections.yourEmails.subtitle}
            seeAllLabel={t.common.search}
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
              <Text style={s.softEmpty}>{t.home.empty.noEmail}</Text>
            ) : null}
          </View>

          {/* ─── 4. Recent platforms ─── */}
          <SectionHeader
            title={t.home.sections.recentPlatforms.title}
            subtitle={t.home.sections.recentPlatforms.subtitle}
            seeAllLabel={
              platforms.length > t.params.maxRecentPlatformsPreview
                ? t.common.seeAll
                : undefined
            }
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
              <Text style={s.softEmpty}>{t.home.empty.noPlatform}</Text>
            )}
          </View>
        </>
      )}
    </ScreenContainer>
  );
};
