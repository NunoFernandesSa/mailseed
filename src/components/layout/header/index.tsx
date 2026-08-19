import { Text, View } from "react-native";
import { s } from "./styles";
import type { HeaderProps } from "./types";

/**
 * Header - Generic header component for settings, search, etc.
 * Displays a title, subtitle, and optional icon with a count badge.
 */
export const Header = ({ title, subtitle, icon, count }: HeaderProps) => {
  return (
    <View style={s.card}>
      <View style={s.row}>
        {icon ? <View style={s.iconWrap}>{icon}</View> : null}
        <Text style={s.title}>{title}</Text>
        {count !== undefined && count > 0 ? (
          <View style={s.badge}>
            <Text>{count}</Text>
          </View>
        ) : null}
      </View>
      {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};
