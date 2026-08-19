export interface EmailRowProps {
  email: string;
  label?: string;
  platformCount?: number;
  onPress?: () => void;
  disabled?: boolean;
  showInitials?: boolean;
}
