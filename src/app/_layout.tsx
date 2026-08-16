import { ThemeProvider } from "@/context/theme/ThemeContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { db } from "../db";
import migrations from "../drizzle/migrations";

/**
 * Prevents the Splash Screen from disappearing automatically
 */
SplashScreen.preventAutoHideAsync();

/**
 * Renders the main navigation stack of the application, including global header configuration
 * and theme-aware UI elements for the entire app navigation tree.
 * @returns JSX.Element containing the application's root navigation stack
 */
const MainStack = () => {
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
            },
            headerTintColor: theme.colors.text.primary,
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={toggleTheme}
                style={{ marginRight: 16 }}
              >
                <Ionicons
                  name={mode === "dark" ? "sunny" : "moon"}
                  size={24}
                  color={theme.colors.text.primary}
                />
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </>
  );
};

/**
 * Root layout component that initializes the application, handles database migrations,
 * and provides the core providers and navigation structure for the entire app.
 * Manages loading states, error handling for database initialization, and wraps
 * the application in necessary context providers.
 * @returns JSX.Element containing the fully initialized application or error/loading states
 */
export default function RootLayout() {
  // compare the current schema with the expected schema and apply any missing migrations
  // @ts-expect-error
  const { success, error } = useMigrations(db, migrations);

  const theme = useTheme();

  useEffect(() => {
    if (error) {
      console.error("Critical error in database migration:", error);
      // Even if there's an error, we must release the UI to show the fatal error message
      SplashScreen.hideAsync();
    } else if (success) {
      SplashScreen.hideAsync();
    }
  }, [success, error]);

  // --- Fatal Error Handling ---
  if (error) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: theme.theme.colors.bg.base,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.theme.colors.accent.red,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Erreur de démarrage
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: theme.theme.colors.text.secondary,
            }}
          >
            Impossible d'initialiser la base de données locale. Veuillez
            relancer l'application.
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // --- Loading State Management ---
  // As long as the database is not ready, we render nothing at all (the Splash Screen covers the screen)
  if (!success) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Suspense
          fallback={
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.theme.colors.bg.base,
              }}
            >
              <ActivityIndicator
                animating={true}
                color={theme.theme.colors.accent.blue}
                size="large"
              />
            </View>
          }
        >
          <MainStack />
        </Suspense>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
