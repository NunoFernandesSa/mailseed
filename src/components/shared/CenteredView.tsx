import { StyleProp, View, ViewStyle } from "react-native";

interface CenteredViewProps {
  bgColor: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

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
