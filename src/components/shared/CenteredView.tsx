import { CenteredViewProps } from "@/types";
import { View } from "react-native";

/**
 * A React Native View component that centers its child content both vertically and horizontally.
 * Applies full-screen flex layout with customizable background color and additional styling.
 * @param bgColor - Background color to apply to the container view
 * @param children - Child elements to render inside the centered container
 * @param style - Optional additional styles to merge with the base container styles
 */
const CenteredView = ({ bgColor, children, style }: CenteredViewProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export { CenteredView };
