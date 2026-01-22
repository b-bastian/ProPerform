import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { OnboardingContext } from "@/src/context/OnboardingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("onboardingFinished");
      setFinished(value === "true");
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  if (!finished) {
    return <Redirect href="/(onboarding)/OnboardingScreen" />;
  }

  return <Redirect href="/(tabs)/HomeScreen" />;
}
