import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/components/header";
import SecondaryButton from "@/src/components/secondaryButton";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>Willkommen bei {"\n"}ProPerform</Text>
        <Text style={styles.text}>
          Erstelle dein Trainingsprofil um einen passenden Trainingsplan zu
          erhalten und direkt loszulegen!
        </Text>

        <SecondaryButton
          text="LOS GEHT'S!"
          onPress={() => {
            router.push("/(onboarding)/OnboardingScreen2");
          }}
        />

        <Text style={styles.secondaryText}>Haben Sie bereits ein Konto?</Text>

        <SecondaryButton
          text="ANMELDEN"
          color="#ff984fff"
          onPress={() => {
            // TODO CAN: navigate to login screen
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Inter",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
    fontFamily: "Inter",
    fontWeight: "500",
  },
  secondaryText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 25,
    color: "#555",
    fontFamily: "Inter",
    fontWeight: "500",
  },
});
