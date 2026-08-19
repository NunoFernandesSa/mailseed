import { FlexStyle, ScrollViewProps, StyleProp, ViewStyle } from "react-native";

export interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<FlexStyle>;
  safeArea?: boolean;
  paddingX?: number;
  paddingY?: number;
  gap?: number;
  scrollViewProps?: Omit<ScrollViewProps, "style" | "contentContainerStyle">;
}
