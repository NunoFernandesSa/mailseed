import { db, migrations } from "@/db";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  const [state, setState] = useState<{
    success: boolean;
    error: string | null;
  }>({ success: false, error: null });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await migrate(db, migrations);
        if (!active) return;
        if (
          result &&
          typeof result === "object" &&
          "success" in result === false
        ) {
          const res = result as any;
          if (res?.errors?.length) {
            setState({ success: false, error: res.errors.join(", ") });
            return;
          }
        }
        setState({ success: true, error: null });
      } catch (e: any) {
        if (!active) return;
        setState({ success: false, error: e?.message ?? String(e) });
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (state.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Migration error: {state.error}</Text>
      </View>
    );
  }

  if (!state.success) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Applying migrations…</Text>
      </View>
    );
  }

  return <Stack />;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  error: { color: "red", fontSize: 16, padding: 20, textAlign: "center" },
  loading: { color: "#666", fontSize: 16 },
});
