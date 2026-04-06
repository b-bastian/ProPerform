import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ColorSchemePreference = "system" | "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  borderLight: string;
  borderGray: string;
  inputBg: string;
  // constants — same in both themes
  primaryBlue: string;
  accentOrange: string;
  white: string;
  black: string;
  danger: string;
  errorBlue: string;
};

const lightColors: ThemeColors = {
  background: "#F2F4F8",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  borderLight: "#E5E7EB",
  borderGray: "#9CA3AF",
  inputBg: "#FFFFFF",
  primaryBlue: "#1c3a8a",
  accentOrange: "#ff7700",
  white: "#FFFFFF",
  black: "#000000",
  danger: "#D32F2F",
  errorBlue: "#FFB4AB",
};

const darkColors: ThemeColors = {
  background: "#0D1117",
  surface: "#161B27",
  surfaceElevated: "#1E2438",
  textPrimary: "#F0F2F5",
  textSecondary: "#8B95A7",
  borderLight: "#262D42",
  borderGray: "#4B5563",
  inputBg: "#161B27",
  primaryBlue: "#1c3a8a",
  accentOrange: "#ff7700",
  white: "#FFFFFF",
  black: "#000000",
  danger: "#D32F2F",
  errorBlue: "#FFB4AB",
};

type ThemeContextType = {
  colors: ThemeColors;
  isDark: boolean;
  colorSchemePreference: ColorSchemePreference;
  setColorSchemePreference: (pref: ColorSchemePreference) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  colors: lightColors,
  isDark: false,
  colorSchemePreference: "system",
  setColorSchemePreference: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = "color_scheme_preference";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [preference, setPreference] = useState<ColorSchemePreference>("system");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark" || stored === "system") {
        setPreference(stored);
      }
      setLoaded(true);
    });
  }, []);

  const setColorSchemePreference = useCallback(
    (pref: ColorSchemePreference) => {
      setPreference(pref);
      AsyncStorage.setItem(STORAGE_KEY, pref);
    },
    [],
  );

  const isDark =
    preference === "system"
      ? systemColorScheme === "dark"
      : preference === "dark";

  const colors = isDark ? darkColors : lightColors;

  if (!loaded) return null;

  return (
    <ThemeContext.Provider
      value={{ colors, isDark, colorSchemePreference: preference, setColorSchemePreference }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
