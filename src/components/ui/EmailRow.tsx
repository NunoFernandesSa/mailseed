import { initialsFromEmail } from "@/helpers";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { EmailRowProps } from "@/types/global-types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

/** Email row component */
const EmailRow = ({
  email,
  label,
  platformCount,
  onPress,
  disabled = false,
  showInitials = false,
}: EmailRowProps) => {
  // ==========================================================================
  // Styles
  // ==========================================================================
  const s = useThemedStyles((t) => ({
    row: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingVertical: t.spacing.sm + 2,
      paddingHorizontal: t.spacing.md,
      gap: t.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: t.colors.border.subtle,
    },
    firstRow: {
      borderTopWidth: 0,
      paddingTop: t.spacing.sm,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: t.colors.accent.blue + "1A",
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    initials: {
      fontSize: t.typography.size.sm,
      fontWeight: t.typography.weight.bold,
      color: t.colors.accent.blue,
    },
    content: {
      flex: 1,
      justifyContent: "center" as const,
      gap: 2,
    },
    email: {
      fontSize: t.typography.size.base,
      color: t.colors.text.primary,
      fontWeight: t.typography.weight.semibold,
    },
    label: {
      fontSize: t.typography.size.sm,
      color: t.colors.text.secondary,
    },
    badge: {
      ...t.mixins.badge(t.colors.text.secondary),
    },
    rightCol: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: t.spacing.sm,
    },
    chevron: {
      color: t.colors.text.disabled,
    },
  }));

  // ==========================================================================
  // Content
  // ==========================================================================
  const content = (
    <View style={s.row}>
      <View style={s.avatar}>
        {showInitials ? (
          <Text style={s.initials}>{initialsFromEmail(email)}</Text>
        ) : (
          <Ionicons name="mail-outline" size={18} color={"#58A6FF" as any} />
        )}
      </View>
      <View style={s.content}>
        <Text style={s.email} numberOfLines={1}>
          {email}
        </Text>
        {label ? <Text style={s.label}>{label}</Text> : null}
      </View>
      <View style={s.rightCol}>
        {platformCount !== undefined && platformCount >= 0 ? (
          <View style={s.badge} pointerEvents="none">
            <Text>{platformCount}</Text>
          </View>
        ) : null}
        {!disabled ? (
          <Ionicons name="chevron-forward" size={16} style={s.chevron} />
        ) : null}
      </View>
    </View>
  );

  if (disabled || !onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "rgba(100,100,100,0.12)",
        borderless: false,
        radius: 14,
      }}
    >
      {content}
    </Pressable>
  );
};

export { EmailRow };
