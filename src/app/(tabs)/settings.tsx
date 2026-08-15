import { ScrollView, StyleSheet, Text, View } from "react-native";

const settings = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, gap: 12 }}
    >
      <View>
        <Text>settings</Text>
      </View>
    </ScrollView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
