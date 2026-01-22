import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingContext } from "../src/context/OnboardingContext";

export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const finished = await AsyncStorage.getItem("onboardingFinished");
      setShowOnboarding(finished !== "true");
    })();
  }, []);

  if (showOnboarding === null) {
    return null;
  }

  return (
    <OnboardingContext.Provider
      value={{
        finishOnboarding: () => setShowOnboarding(false),
        resetOnboarding: () => setShowOnboarding(true),
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <Stack.Screen name="(onboarding)"></Stack.Screen>
        ) : (
          <Stack.Screen name="(tabs)"></Stack.Screen>
        )}
      </Stack>
    </OnboardingContext.Provider>
  );
}
