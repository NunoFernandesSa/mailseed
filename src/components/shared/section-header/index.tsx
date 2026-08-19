import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { s } from "./styles";
import { SectionHeaderProps } from "./types";

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
