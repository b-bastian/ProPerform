import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="OnboardingScreen" />
      <Stack.Screen name="OnboardingStep2" />
      <Stack.Screen name="OnboardingStep3" />
      <Stack.Screen name="OnboardingStep4" />
      <Stack.Screen name="OnboardingStep5" />
    </Stack>
  );
}
