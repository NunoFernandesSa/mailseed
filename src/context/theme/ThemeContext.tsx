import { ThemeMode } from "@/constants/colors.constants";
import { createTheme } from "@/constants/theme";
import { ThemeContextType } from "@/types/context/theme-context.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

const STORAGE_KEY = "app-theme";

// Context theme
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Provider theme
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // initialize theme mode with default 'null'
  const [mode, setMode] = useState<ThemeMode | null>(null);
  // --- Loading State ---
  const [isLoading, setIsLoading] = useState(true);

  // --- Load Theme from AsyncStorage, if not exists, set default 'dark' ---
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedMode === "dark" || storedMode === "light") {
          setMode(storedMode);
        } else {
          // if not exists, set default 'dark'
          setMode("dark");
        }
      } catch (error) {
        console.error("Error on load theme:", error);
        setMode("dark"); // Fallback for safe default
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // --- Save Theme to AsyncStorage ---
  useEffect(() => {
    if (mode) {
      const saveTheme = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, mode);
        } catch (error) {
          console.error("Error on save theme:", error);
        }
      };
      saveTheme();
    }
  }, [mode]);

  // --- Toggle Theme ---
  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (isLoading || !mode) {
    return null; // TODO: show custom SplashScreen here
  }

  // --- generate theme ---
  const theme = createTheme(mode);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
