import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Main tab bar layout.
 * - Uses useSafeAreaInsets() to dynamically calculate the height
 *   of the iPhone home indicator or Android gesture/navigation bar (3-button or gesture-based).
 * - tabBarItemStyle: internal padding for EACH tab button (icon + label)
 *                   → this prevents the label from touching the bottom edge on Android ✔
 */
export default function TabsLayout() {
  const { theme } = useTheme();

  const insets = useSafeAreaInsets();

  const TABBAR_TOTAL_HEIGHT = 66 + Math.max(insets.bottom, 8);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg.base }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.bg.surface,
            borderTopColor: theme.colors.border.subtle,
            borderTopWidth: 1,
            height: TABBAR_TOTAL_HEIGHT,
            paddingTop: 6,
          },
          tabBarActiveTintColor: theme.colors.accent.blue,
          tabBarInactiveTintColor: theme.colors.text.secondary,
          tabBarItemStyle: {
            paddingTop: 6,
            paddingBottom: Math.max(
              insets.bottom > 0 ? insets.bottom + 4 : 10,
              10,
            ),
            height: TABBAR_TOTAL_HEIGHT,
          },
          tabBarLabelStyle: {
            fontSize: 11,
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
