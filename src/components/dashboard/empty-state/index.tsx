import { useAppData } from "@/hooks/useAppData";
import { useDashboardStyles } from "@/hooks/useDashboardStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const EmptyState = () => {
  const s = useDashboardStyles();
  const { t } = useAppData();

  return (
    <View style={s.emptyCard}>
      <View style={s.emptyBubble}>
        <Ionicons name="leaf" size={48} color={s.accentGreen} />
      </View>
      <Text style={s.emptyTitle}>{t.emptyState.title}</Text>
      <Text style={s.emptySub}>{t.emptyState.subtitle}</Text>
      <Pressable
        onPress={() => router.push("/settings")}
        style={({ pressed }) => [
          s.emptyCta,
          pressed ? { opacity: 0.85 } : null,
        ]}
        android_ripple={{
          color: "rgba(255,255,255,0.18)",
          borderless: false,
          radius: 14,
        }}
      >
        <Ionicons name="add-circle" size={18} color="#FFFFFF" />
        <Text style={s.emptyCtaText}>{t.emptyState.cta}</Text>
      </Pressable>
    </View>
  );
};
