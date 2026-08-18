import { useThemedStyles } from "@/hooks/useThemedStyles";
import { HomeHeaderProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

/**
 * HomeHeader - Top statistics card for the dashboard home screen
 * Displays key metrics for total emails and connected platforms in a styled header card
 */
export const HomeHeader = ({
  emailsCount,
  platformsCount,
  subtitle,
}: HomeHeaderProps) => {
  const s = useThemedStyles((t) => {
    const BLUE = t.colors.accent.blue;
    const GREEN = t.colors.accent.green;
    return {
      card: {
        ...t.mixins.card,
        paddingVertical: t.spacing.lg,
        paddingHorizontal: t.spacing.lg,
        gap: t.spacing.md,
      },
      row: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "space-between" as const,
      },
      stat: {
        flex: 1,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: t.spacing.sm,
      },
      statRight: {
        justifyContent: "flex-end" as const,
      },
      bubble: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center" as const,
        justifyContent: "center" as const,
      },
      bubbleBlue: { backgroundColor: BLUE + "1A" },
      bubbleGreen: { backgroundColor: GREEN + "1A" },
      textCol: {
        justifyContent: "center" as const,
        gap: 2,
      },
      textColRight: {
        alignItems: "flex-end" as const,
      },
      label: {
        fontSize: t.typography.size.sm,
        color: t.colors.text.secondary,
        fontWeight: t.typography.weight.medium,
      },
      count: {
        fontSize: t.typography.size.xl,
        color: t.colors.text.primary,
        fontWeight: t.typography.weight.bold,
        lineHeight: t.typography.size.xl + 4,
      },
      subtitle: {
        fontSize: t.typography.size.sm,
        color: t.colors.text.secondary,
        marginTop: t.spacing.xs,
        lineHeight: (t.typography.size.sm ?? 12) * 1.45,
      },
      BLUE,
      GREEN,
    };
  });

  return (
    <View style={s.card}>
      <View style={s.row}>
        {/* Bloc gauche : Emails */}
        <View style={s.stat}>
          <View style={[s.bubble, s.bubbleBlue]}>
            <Ionicons name="mail-outline" size={20} color={s.BLUE} />
          </View>
          <View style={s.textCol}>
            <Text style={s.label}>Emails</Text>
            <Text style={s.count}>{emailsCount}</Text>
          </View>
        </View>

        {/* Bloc droit : Platforms */}
        <View style={[s.stat, s.statRight]}>
          <View style={[s.textCol, s.textColRight]}>
            <Text style={s.label}>Platforms</Text>
            <Text style={s.count}>{platformsCount}</Text>
          </View>
          <View style={[s.bubble, s.bubbleGreen]}>
            <Ionicons name="globe-outline" size={20} color={s.GREEN} />
          </View>
        </View>
      </View>

      {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};
