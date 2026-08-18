import { FlexStyle, ScrollViewProps, StyleProp, ViewStyle } from "react-native";

// ==========================================================================
// CenteredViewProps
// ==========================================================================
export interface CenteredViewProps {
  bgColor: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// ==========================================================================
// ScreenContainerProps
// ==========================================================================
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

// ==========================================================================
// SectionHeaderProps
// ==========================================================================
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  seeAllLabel?: string;
  onPressSeeAll?: () => void;
}
