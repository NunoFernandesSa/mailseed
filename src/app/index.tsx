import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, gap: 12 }}
    >
      <View>
        <Text>hello</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
