import { ScrollView, StyleSheet, Text, View } from "react-native";

const search = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, gap: 12 }}
    >
      <View>
        <Text>search</Text>
      </View>
    </ScrollView>
  );
};

export default search;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
