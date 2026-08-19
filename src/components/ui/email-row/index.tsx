import { initialsFromEmail } from "@/helpers";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { makeStyles } from "./styles";
import { EmailRowProps } from "./types";

/** Email row component */
export const EmailRow = ({
  email,
  label,
  platformCount,
  onPress,
  disabled = false,
  showInitials = false,
}: EmailRowProps) => {
  const s = useThemedStyles(makeStyles);

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
