import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, gap: 12 }}
    >
      <Text style={styles.title}>📬 Mailseed</Text>
      <Text style={styles.subtitle}>Local-first email-platform tracker</Text>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>🌱 Insert demo data</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnGhost]} onPress={() => {}}>
          <Text style={styles.btnTextGhost}>🧹 Clear all</Text>
        </Pressable>
      </View>

      <View style={styles.card}></View>
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
});
