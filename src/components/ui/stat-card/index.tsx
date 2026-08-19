import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { makeStyles } from "./styles";
import type { StatCardProps } from "./types";

/**
 * A card component that displays a key statistic with an icon, label, and value.
 * Supports custom colors and semantic variants for positive/danger states.
 */
export const StatCard = ({
  icon,
  label,
  value,
  variant = "default",
  color,
}: StatCardProps) => {
  const s = useThemedStyles((theme) => makeStyles(theme, variant, color));

  return (
    <View style={s.card}>
      <View style={s.bubble}>
        <Ionicons name={icon as any} size={20} color={s.accent} />
      </View>
      <View style={s.textCol}>
        <Text style={s.label}>{label}</Text>
        <Text style={s.value}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </Text>
      </View>
    </View>
  );
};

export default StatCard;
