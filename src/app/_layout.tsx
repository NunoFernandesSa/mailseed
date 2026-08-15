import { SplashScreen, Stack } from "expo-router";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "../db";
import migrations from "../drizzle/migrations";

/**
 * Prevents the Splash Screen from disappearing automatically
 */
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Le hook de Drizzle se charge de comparer le schéma actuel et d'appliquer les migrations manquantes
  // @ts-expect-error
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (error) {
      console.error("Erreur critique de migration DB:", error);
      // Même en cas d'erreur, on doit libérer l'UI pour afficher le message d'erreur fatal
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
      <Stack />
    </Suspense>
  );
}
