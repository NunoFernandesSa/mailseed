import { useDashboardStyles } from "@/hooks/useDashboardStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const EmptyState = () => {
  const s = useDashboardStyles();

  return (
    <View style={s.emptyCard}>
      <View style={s.emptyBubble}>
        <Ionicons name="leaf" size={48} color={s.accentGreen} />
      </View>
      <Text style={s.emptyTitle}>Bienvenue sur Mailseed</Text>
      <Text style={s.emptySub}>
        Suivez toutes les plateformes où vous utilisez vos adresses emails, en
        local.
      </Text>
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
        <Text style={s.emptyCtaText}>Ajouter une première donnée</Text>
      </Pressable>
    </View>
  );
};
