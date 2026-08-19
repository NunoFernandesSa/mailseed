import { useThemedStyles } from "@/hooks/useThemedStyles";
import { View } from "react-native";
import { makeStyle } from "./styles";
import { CenteredViewProps } from "./types";

/**
 * A flexible React Native container component that centers its child content both vertically and horizontally using flex layout.
 * Spans the full available space of its parent, with support for custom background colors and extended styling options.
 * @param bgColor - Custom background color to apply to the root container view
 * @param children - React elements to be rendered within the centered container
 * @param style - Optional additional style properties to merge with the base container styles
 */
export const CenteredView = ({
  bgColor,
  children,
  style,
}: CenteredViewProps) => {
  const s = useThemedStyles(makeStyle);

  return (
    <View style={[s.container, { backgroundColor: bgColor }, style]}>
      {children}
    </View>
  );
};
