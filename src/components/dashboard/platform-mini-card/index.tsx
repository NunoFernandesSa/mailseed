import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { s } from "./styles";
import { PlatformMiniCardProps } from "./types";

/**
 * PlatformMiniCard - A mini card component for displaying platform information
 * @param name - Name of the platform
 * @param url - URL of the platform
 * @param email - Email address of the platform
 * @param isFirst - Whether this is the first platform card in the list
 * @returns React component for platform mini display
 */
export const PlatformMiniCard = ({
  name,
  url,
  email,
  isFirst,
}: PlatformMiniCardProps) => {
  return (
    <View
      style={[
        s.miniCard,
        !isFirst ? { borderTopWidth: 1, borderTopColor: s.borderSubtle } : null,
      ]}
    >
      <View style={s.miniAvatar}>
        <Ionicons name="globe-outline" size={16} color={s.accentBlue} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={s.miniName} numberOfLines={1}>
          {name}
        </Text>
        {url ? (
          <Text style={s.miniSub} numberOfLines={1}>
            {url}
          </Text>
        ) : null}
        {email ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="mail" size={12} color={s.miniSub.color as any} />
            <Text style={s.miniSub} numberOfLines={1}>
              {email}
            </Text>
          </View>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={14} color={s.chevron} />
    </View>
  );
};
