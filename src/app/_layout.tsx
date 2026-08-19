import { MigrationErrorFallback } from "@/components/layout/migration-error-fallback";
import { CenteredView } from "@/components/shared/centered-view";
import { SuspenseFallback } from "@/components/shared/suspense-fallback";
import { ThemeProvider } from "@/context/theme/ThemeContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { db } from "../db";
import migrations from "../drizzle/migrations";

/**
 * Prevents the Splash Screen from disappearing automatically
 * (it is dismissed explicitly once migrations + theme are ready)
 */
SplashScreen.preventAutoHideAsync();

/**
 * Entry point for Expo Router, responsible for setting up the theme context and rendering the app inner.
 * @returns The fully initialized app UI or appropriate loading/error states
 */
export default function AppShell() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Suspense fallback={<SuspenseFallback />}>
          <AppInner />
        </Suspense>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

/**
 * Internal app component that handles database migrations, theme initialization,
 * and renders the main navigation stack once all prerequisites are met.
 * @returns The fully initialized app UI or appropriate loading/error states
 */
function AppInner() {
  const { theme } = useTheme();

  // --- Database migrations ---
  // @ts-expect-error - The `journal` field is not part of the migrations bundle.
  const { success, error } = useMigrations(db, migrations);

  // --- Dismiss SplashScreen when ready ---
  useEffect(() => {
    if (error) {
      console.error("Critical error in database migration:", error);
      SplashScreen.hideAsync();
    } else if (success) {
      SplashScreen.hideAsync();
    }
  }, [success, error]);

  // --- Fatal error view ---
  if (error) {
    return (
      <MigrationErrorFallback
        message={error instanceof Error ? error.message : String(error)}
      />
    );
  }

  // As long as `success` is false, we keep the SplashScreen displayed → no need for a separate loader.
  // We return a themed background as a precaution (in case the splash screen is hidden prematurely).
  if (!success) {
    return <CenteredView bgColor={theme.colors.bg.base} />;
  }

  // --- All set → render the navigation tree ---
  return <MainStack />;
}

/**
 * Renders the main navigation stack including global header configuration
 * and theme-aware UI elements for the entire app navigation tree.
 */
function MainStack() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <View style={{ flex: 1, backgroundColor: theme.colors.bg.base }}>
        <Stack
          screenOptions={{
            headerShown: true,
            title: "MailSeed",
            headerStyle: {
              backgroundColor: theme.colors.bg.surface,
            },
            headerTitleStyle: {
              color: theme.colors.text.primary,
              fontFamily: theme.typography.family,
              fontSize: theme.typography.size.lg,
              fontWeight: theme.typography.weight.bold,
            },
            headerTintColor: theme.colors.text.primary,
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={toggleTheme}
                style={{
                  marginRight: theme.spacing.md,
                  padding: 9,
                  backgroundColor:
                    mode === "dark"
                      ? theme.colors.border.subtle
                      : theme.colors.bg.base,
                  borderColor:
                    mode === "dark"
                      ? theme.colors.border.subtle
                      : theme.colors.bg.surface,
                  borderRadius: 12,
                }}
                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              >
                <Ionicons
                  name={mode === "dark" ? "sunny-outline" : "moon-outline"}
                  size={24}
                  color={theme.colors.text.primary}
                />
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        </Stack>
      </View>
    </>
  );
}
