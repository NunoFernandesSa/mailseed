import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg.base }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.bg.surface,
            borderTopColor: theme.colors.border.subtle,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: theme.colors.accent.blue,
          tabBarInactiveTintColor: theme.colors.text.secondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            fontFamily: theme.typography.family,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
