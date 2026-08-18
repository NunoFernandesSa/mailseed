import { Ionicons } from "@expo/vector-icons";

// ===============================
// home header props type
// ===============================
export interface HomeHeaderProps {
  emailsCount: number;
  platformsCount: number;
  subtitle?: string;
}

// ===============================
// StatCard props type
// ===============================
export type StatVariant = "default" | "positive" | "danger";

export interface StatCardProps {
  icon: keyof typeof Ionicons.defaultProps;
  label: string;
  value: number | string;
  color?: string;
  variant?: StatVariant;
}

// ===============================
// PlatformMiniCard props type - dashboard component
// ===============================
export interface PlatformMiniCardProps {
  name: string;
  url?: string;
  email?: string;
  isFirst: boolean;
}

// ===============================
// components UI props type
// ===============================
export interface EmailRowProps {
  email: string;
  label?: string;
  platformCount?: number;
  onPress?: () => void;
  disabled?: boolean;
  showInitials?: boolean;
}
