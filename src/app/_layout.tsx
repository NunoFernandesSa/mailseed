import { Stack } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
// ----- Database ----- //
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

const DATABASE_NAME = process.env.EXPO_PUBLIC_DB_NAME || "mailseed";

export default function RootLayout() {
  const expo = SQLite.openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expo);

  return (
    <Suspense
      fallback={<ActivityIndicator animating={true} color="red" size="large" />}
    >
      <Stack />
    </Suspense>
  );
}
