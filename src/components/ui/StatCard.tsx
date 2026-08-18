import { useThemedStyles } from "@/hooks/useThemedStyles";
import type { StatCardProps } from "@/types/global-types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

/**
 * A card component that displays a key statistic with an icon, label, and value.
 * Supports custom colors and semantic variants for positive/danger states.
 */
export const StatCard = ({
  icon,
  label,
  value,
  color,
  variant = "default",
}: StatCardProps) => {
  // ==========================================================================
  // Styles
  // ==========================================================================
  const s = useThemedStyles((t) => {
    const accent =
      color ??
      (variant === "positive"
        ? t.colors.accent.green
        : variant === "danger"
          ? t.colors.accent.red
          : t.colors.accent.blue);
    return {
      card: {
        ...t.mixins.card,
        padding: t.spacing.md,
        flex: 1,
        minHeight: 82,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: t.spacing.sm,
      },
      bubble: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: accent + "1A",
        alignItems: "center" as const,
        justifyContent: "center" as const,
      },
      textCol: {
        flex: 1,
        justifyContent: "center" as const,
        gap: 2,
      },
      label: {
        fontSize: t.typography.size.sm,
        color: t.colors.text.secondary,
        fontWeight: t.typography.weight.medium,
      },
      value: {
        fontSize: t.typography.size.xl,
        color: t.colors.text.primary,
        fontWeight: t.typography.weight.bold,
        lineHeight: t.typography.size.xl + 4,
      },
      accent,
    };
  });

  // ==========================================================================
  // Content
  // ==========================================================================
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
