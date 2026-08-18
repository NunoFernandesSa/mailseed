import { useThemedStyles } from "@/hooks/useThemedStyles";
import type { PlatformMiniCardProps } from "@/types/global-types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const PlatformMiniCard = ({
  name,
  url,
  email,
  isFirst,
}: PlatformMiniCardProps) => {
  const s = useThemedStyles((t) => ({
    miniCard: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing.sm,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.sm + 2,
    },
    miniAvatar: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: t.colors.accent.blue + "1A",
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    miniName: {
      fontSize: t.typography.size.base,
      color: t.colors.text.primary,
      fontWeight: t.typography.weight.semibold,
    },
    miniSub: {
      fontSize: t.typography.size.sm,
      color: t.colors.text.secondary,
    },
    accentBlue: t.colors.accent.blue,
    accentGreen: t.colors.accent.green,
    borderSubtle: t.colors.border.subtle,
    chevron: t.colors.text.disabled,
  }));

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

export { PlatformMiniCard };
