import { ThemeProvider, useTheme } from "@/src/context/ThemeContext";
import { WorkoutProvider } from "@/src/context/WorkoutContext";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { OnboardingContext } from "../src/context/OnboardingContext";

function AppShell() {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <WorkoutProvider>
      <OnboardingContext.Provider
        value={{
          finishOnboarding: () => router.replace("/(tabs)/HomeScreen"),
        }}
      >
        <StatusBar style={isDark ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }} />
      </OnboardingContext.Provider>
    </WorkoutProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
