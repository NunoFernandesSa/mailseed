import { ScreenContainer } from "@/components";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

/**
 * 404 Not Found — Page affichée quand Expo Router ne résout pas l'URL demandée.
 * Rester dans le thème grâce à ScreenContainer + useThemedStyles.
 * Animation douce de "bounce" sur l'icône 404.
 * 2 CTA : Retour Home, Retour en arrière (si possible).
 */
export default function NotFoundScreen() {
  const s = useThemedStyles((t) => ({
    wrapper: {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      paddingHorizontal: t.spacing.xl,
      paddingVertical: 48,
      gap: t.spacing.lg,
    },
    iconBubble: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: t.colors.bg.card,
      borderWidth: 1,
      borderColor: t.colors.border.subtle,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      marginBottom: t.spacing.md,
    },
    bigFour: {
      fontSize: 56,
      fontWeight: t.typography.weight.bold,
      color: t.colors.accent.blue,
      letterSpacing: 2,
    },
    title: {
      fontSize: t.typography.size.xl,
      fontWeight: t.typography.weight.bold,
      color: t.colors.text.primary,
      textAlign: "center" as const,
    },
    subtitle: {
      fontSize: t.typography.size.base,
      color: t.colors.text.secondary,
      textAlign: "center" as const,
      lineHeight: (t.typography.size.base ?? 14) * 1.5,
      marginBottom: t.spacing.sm,
      paddingHorizontal: t.spacing.lg,
    },
    divider: {
      width: 48,
      height: 2,
      borderRadius: 2,
      backgroundColor: t.colors.border.subtle,
      marginVertical: t.spacing.sm,
    },
    hintText: {
      fontSize: t.typography.size.sm,
      color: t.colors.text.secondary,
      textAlign: "center" as const,
    },
    actionsRow: {
      width: "100%" as const,
      gap: t.spacing.md,
      marginTop: t.spacing.lg,
    },
    primaryBtn: {
      width: "100%" as const,
      paddingVertical: t.spacing.md,
      paddingHorizontal: t.spacing.lg,
      borderRadius: 12,
      backgroundColor: t.colors.accent.blue,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexDirection: "row" as const,
      gap: t.spacing.sm,
    },
    primaryBtnPressed: {
      backgroundColor: t.colors.accent.blue + "CC",
    },
    primaryBtnText: {
      color: "#FFFFFF",
      fontWeight: t.typography.weight.bold,
      fontSize: t.typography.size.base,
    },
    secondaryBtn: {
      width: "100%" as const,
      paddingVertical: t.spacing.md,
      paddingHorizontal: t.spacing.lg,
      ...t.mixins.card,
      borderRadius: 12,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexDirection: "row" as const,
      gap: t.spacing.sm,
    },
    secondaryBtnText: {
      color: t.colors.text.primary,
      fontWeight: t.typography.weight.semibold,
      fontSize: t.typography.size.base,
    },
    tinyTag: {
      marginTop: t.spacing.xl,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 999,
      backgroundColor: t.colors.bg.card,
      borderWidth: 1,
      borderColor: t.colors.border.subtle,
    },
    tinyTagText: {
      fontSize: t.typography.size.xs,
      color: t.colors.text.secondary,
      fontWeight: t.typography.weight.medium,
    },
  }));

  // ---- Animation : petit bounce (translate + scale) sur la bulle 404 ----
  const bounce = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 },
    ).start();
  }, [bounce]);

  const translateY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });
  const scale = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04],
  });

  const canGoBack = router.canGoBack();

  return (
    <>
      <Stack.Screen options={{ title: "Not Found", headerShown: true }} />
      <ScreenContainer safeArea>
        <View style={s.wrapper}>
          {/* BULLE ANIMÉE 404 */}
          <Animated.View
            style={[s.iconBubble, { transform: [{ translateY }, { scale }] }]}
          >
            <Text style={s.bigFour}>404</Text>
          </Animated.View>

          {/* TITRE + SOUS-TITRE */}
          <Text style={s.title}>Cette page est introuvable</Text>

          <View style={s.divider} />

          {/* BOUTONS D'ACTION */}
          <View style={s.actionsRow}>
            <Link href="/" asChild push={false}>
              <Pressable
                android_ripple={{
                  color: "rgba(255,255,255,0.12)",
                  borderless: false,
                  radius: 12,
                }}
                style={({ pressed }) => [
                  s.primaryBtn,
                  pressed ? s.primaryBtnPressed : null,
                ]}
              >
                <Ionicons name="home" size={18} color="#FFFFFF" />
                <Text style={s.primaryBtnText}>Retourner à l&apos;accueil</Text>
              </Pressable>
            </Link>

            {canGoBack ? (
              <Pressable
                onPress={() => router.back()}
                android_ripple={{
                  color: "rgba(100,100,100,0.12)",
                  borderless: false,
                  radius: 12,
                }}
                style={s.secondaryBtn}
              >
                <Ionicons
                  name="arrow-back"
                  size={18}
                  color={s.secondaryBtnText.color as string}
                />
                <Text style={s.secondaryBtnText}>Page précédente</Text>
              </Pressable>
            ) : null}
          </View>

          {/* BADGE VERSION APP DISCRET */}
          <View style={s.tinyTag}>
            <Text style={s.tinyTagText}>MAILSEED · PAGE INCONNUE</Text>
          </View>
        </View>
      </ScreenContainer>
    </>
  );
}
