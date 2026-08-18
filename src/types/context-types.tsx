import { ThemeMode } from "@/constants/colors";
import { AppTheme } from "@/constants/theme";

export interface ThemeContextType {
  theme: AppTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}
