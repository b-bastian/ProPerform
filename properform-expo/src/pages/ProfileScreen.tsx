import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import PrimaryButton from "../components/primaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingContext } from "../context/OnboardingContext";

export default function ProfileScreen() {
  const { resetOnboarding } = React.useContext(OnboardingContext);

  const handleResetOnboarding = async () => {
    await AsyncStorage.removeItem("onboardingFinished");
    resetOnboarding();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 30,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Header></Header>
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/images/profile_picture.png")}
              resizeMode="contain"
              style={styles.profileImage}
            />
          </View>

          <View>
            <Text style={styles.welcomeTitle}>Hi, Max!</Text>
            <Text style={styles.welcomeText}>
              Du trainierst seit 2 Monaten!
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Persönliche Information</Text>
            <Text style={styles.infoCardLabel}>Benutzername: Max Bert</Text>
            <Text style={styles.infoCardLabel}>E-Mail: •••••••••••••••••</Text>
            <Text style={styles.infoCardLabel}>Trainiert seit 04.03.2025</Text>
          </View>

          <View>
            <PrimaryButton text="🔑 Passwort ändern"></PrimaryButton>
          </View>
          <View style={styles.seperator} />

          <View>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.buttonText}>Abmelden</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.seperator} />

          <View>
            <Button
              title="Onboarding erneut starten"
              onPress={handleResetOnboarding}
            />
          </View>
        </View>
      </ScrollView>
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
  profileImage: {
    width: 120,
    height: 120,
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 15,
    textAlign: "center",
  },
  infoCard: {
    marginTop: 30,
    padding: 20,
    borderWidth: 2,
    borderColor: "#A0A0A0",
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoCardLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  seperator: {
    height: 1,
    backgroundColor: "#A0A0A0",
    marginVertical: 20,
    width: "100%",
  },
  logoutButton: {
    backgroundColor: "#D32F2F", // Rot
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
