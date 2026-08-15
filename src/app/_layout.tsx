import { Ionicons } from "@expo/vector-icons";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "../db";
import migrations from "../drizzle/migrations";

/**
 * Prevents the Splash Screen from disappearing automatically
 */
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // compare the current schema with the expected schema and apply any missing migrations
  // @ts-expect-error
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (error) {
      console.error("Erreur critique de migration DB:", error);
      // Even if there's an error, we must release the UI to show the fatal error message
      SplashScreen.hideAsync();
    } else if (success) {
      SplashScreen.hideAsync();
    }
  }, [success, error]);

  // --- Fatal Error Handling ---
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "red",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Erreur de démarrage
        </Text>
        <Text style={{ textAlign: "center", color: "gray" }}>
          Impossible d'initialiser la base de données locale. Veuillez relancer
          l'application.
        </Text>
      </View>
    );
  }

  // --- Loading State Management ---
  // As long as the database is not ready, we render nothing at all (the Splash Screen covers the screen)
  if (!success) {
    return null;
  }

  return (
    <Suspense
      fallback={<ActivityIndicator animating={true} color="red" size="large" />}
    >
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          title: "MailSeed",
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="settings" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Suspense>
  );
}
