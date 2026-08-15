import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

const DB_NAME = process.env.EXPO_PUBLIC_DB_NAME ?? "mailseed.db";

const expoDb = SQLite.openDatabaseSync(DB_NAME);

export const db = drizzle(expoDb);

export { DB_NAME, expoDb, migrations };
