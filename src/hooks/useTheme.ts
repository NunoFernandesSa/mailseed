import { ThemeContext } from "@/context/theme/ThemeContext";
import { useContext } from "react";

/**
 * Returns the current app theme from the context.
 * If not used within a `ThemeProvider`, throws an error.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
