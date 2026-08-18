import { useThemedStyles } from "@/hooks/useThemedStyles";
import { SectionHeaderProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

/**
 * Section header component for dashboard sections.
 * Displays section title with optional subtitle, and a "See all" link with chevron on the right.
 */
export const SectionHeader = ({
  title,
  subtitle,
  seeAllLabel,
  onPressSeeAll,
}: SectionHeaderProps) => {
  // ==========================================================================
  // Styles
  // ==========================================================================
  const s = useThemedStyles((t) => ({
    row: {
      flexDirection: "row" as const,
      alignItems: "flex-end" as const,
      justifyContent: "space-between" as const,
      marginBottom: t.spacing.sm,
      marginTop: t.spacing.lg,
      paddingHorizontal: 2,
    },
    titles: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: t.typography.size.lg,
      color: t.colors.text.primary,
      fontWeight: t.typography.weight.bold,
    },
    subtitle: {
      fontSize: t.typography.size.sm,
      color: t.colors.text.secondary,
    },
    seeAll: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 4,
      paddingVertical: 4,
      paddingLeft: t.spacing.sm,
    },
    seeAllPressed: {
      opacity: 0.7,
    },
    seeAllText: {
      fontSize: t.typography.size.sm,
      color: t.colors.accent.blue,
      fontWeight: t.typography.weight.semibold,
    },
  }));

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <View style={s.row}>
      <View style={s.titles}>
        <Text style={s.title}>{title}</Text>
        {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
      </View>

      {seeAllLabel ? (
        <Pressable
          onPress={onPressSeeAll}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          style={({ pressed }) =>
            pressed ? [s.seeAll, s.seeAllPressed] : s.seeAll
          }
        >
          <Text style={s.seeAllText}>{seeAllLabel}</Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={s.seeAllText.color as any}
          />
        </Pressable>
      ) : null}
    </View>
  );
};
