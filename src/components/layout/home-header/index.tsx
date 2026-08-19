import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { makeStyle } from "./styles";
import { HomeHeaderProps } from "./types";

/**
 * HomeHeader - Top statistics card for the dashboard home screen
 * Displays key metrics for total emails and connected platforms in a styled header card
 */
export const HomeHeader = ({
  emailsCount,
  platformsCount,
  subtitle,
}: HomeHeaderProps) => {
  const s = useThemedStyles(makeStyle);

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
