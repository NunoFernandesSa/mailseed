import { platformService } from "@/services/platformService";
import { usePlatformStore } from "@/store/platformStore";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const items = usePlatformStore((s) => s.items);
  const isLoading = usePlatformStore((s) => s.isLoading);
  const setLoading = usePlatformStore((s) => s.setLoading);
  const setError = usePlatformStore((s) => s.setError);
  const error = usePlatformStore((s) => s.error);
  const [status, setStatus] = useState<string>("Idle");

  const refresh = async () => {
    setLoading(true);
    await platformService.loadAll();
  };

  const seedDemo = async () => {
    setLoading(true);
    setStatus("Seeding demo data…");
    try {
      await platformService.create({
        name: "GitHub",
        email: "dev@example.com",
        url: "https://github.com",
        notes: "Personal account",
        tags: ["dev", "social"],
        starred: true,
      });
      await platformService.create({
        name: "Netflix",
        email: "home@example.com",
        url: "https://netflix.com",
        tags: ["streaming"],
      });
      await platformService.create({
        name: "Gmail",
        email: "dev@example.com",
        url: "https://mail.google.com",
        notes: "Main email provider",
        tags: ["email", "google"],
        starred: true,
      });
      await refresh();
      setStatus("✅ Seeded 3 demo platforms");
    } catch (e: any) {
      const msg = `Seed failed: ${e?.message ?? String(e)}`;
      setError(msg);
      setStatus(msg);
    }
  };

  const clearAll = async () => {
    setStatus("Clearing all rows…");
    try {
      for (const p of items) await platformService.remove(p.id);
      setStatus("🧹 Cleared all platforms");
    } catch (e: any) {
      setStatus(`Clear failed: ${e?.message ?? String(e)}`);
    }
  };

  const stats = platformService.stats();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, gap: 12 }}
    >
      <Text style={styles.title}>📬 Mailseed</Text>
      <Text style={styles.subtitle}>Local-first email-platform tracker</Text>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={seedDemo}>
          <Text style={styles.btnText}>🌱 Insert demo data</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnGhost]} onPress={clearAll}>
          <Text style={styles.btnTextGhost}>🧹 Clear all</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>DB status</Text>
        <Text>• Loading: {isLoading ? "true" : "false"}</Text>
        <Text>• Total platforms: {stats.total}</Text>
        <Text>• Starred: {stats.starred}</Text>
        <Text>• Last status: {status}</Text>
        {error ? <Text style={{ color: "red" }}>Error: {error}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Platforms ({items.length})</Text>
        {items.length === 0 ? (
          <Text style={{ color: "#666" }}>
            No rows yet — press "Insert demo data"
          </Text>
        ) : (
          items.map((p) => (
            <View key={p.id} style={styles.rowItem}>
              <Text style={styles.rowTitle}>
                {p.starred ? "⭐ " : ""}
                {p.name}
              </Text>
              <Text style={styles.rowSub}>{p.email}</Text>
              {p.url ? <Text style={styles.rowSub}>{p.url}</Text> : null}
              {p.tags?.length ? (
                <Text style={styles.rowSub}>🏷️ {p.tags.join(", ")}</Text>
              ) : null}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FB" },
  title: { fontSize: 28, fontWeight: "700", color: "#111" },
  subtitle: { color: "#555", marginBottom: 8 },
  row: { flexDirection: "row", gap: 10 },
  btn: {
    flex: 1,
    backgroundColor: "#208AEF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnGhost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  btnText: { color: "white", fontWeight: "600" },
  btnTextGhost: { color: "#333", fontWeight: "600" },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  rowItem: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    gap: 2,
  },
  rowTitle: { fontWeight: "600", fontSize: 15, color: "#111" },
  rowSub: { color: "#555", fontSize: 13 },
});
