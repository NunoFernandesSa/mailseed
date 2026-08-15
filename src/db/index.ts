import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

// --- DB Name ---
const DB_NAME = process.env.EXPO_PUBLIC_DB_NAME ?? "mailseed.db";

// --- DB Instance ---
const expoDb = openDatabaseSync(DB_NAME);
const db = drizzle(expoDb);

export { db };
