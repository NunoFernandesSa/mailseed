import { Ionicons } from "@expo/vector-icons";

export type StatVariant = "default" | "positive" | "danger";

export interface StatCardProps {
  icon: keyof typeof Ionicons.defaultProps;
  label: string;
  value: number | string;
  color?: string;
  variant?: StatVariant;
}
