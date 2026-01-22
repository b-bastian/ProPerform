import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../src/components/header";
import PrimaryButton from "../../src/components/primaryButton";
import SecondaryButton from "../../src/components/secondaryButton";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Profile: undefined;
};

export default function HomeScreen({ navigation }: Props) {
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
          <Text style={styles.greeting}>Hallo, Max!</Text>
          {/* Wöchentliches Ziel, TODO: Fortschritt Kreis mit API*/}
          <View style={styles.goalCard}>
            <Text style={styles.cardValue}>50 %</Text>
            <Text style={styles.cardTitle}>Wöchentliches Ziel</Text>
          </View>

          {/* Heutiges Training*/}
          <View style={styles.trainCard}>
            <Text style={styles.trainTitle}>Heutiges Training</Text>
            <Text style={styles.trainText}>Brust & Trizeps</Text>
            <Text style={styles.trainText}>45 min.</Text>
            <SecondaryButton text="TRAINING STARTEN"></SecondaryButton>
          </View>

          {/* Zitat des Tages*/}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteTitle}>Zitat des Tages</Text>
            <Text style={styles.quote}>
              Katzen sind wahre Genießer des Komforts.
            </Text>
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
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Inter",
    color: "#111",
    textAlign: "center",
  },
  goalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    borderWidth: 10,
    borderColor: "#ff7700ff",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 6,
    fontFamily: "Inter",
    textAlign: "center",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111",
    fontFamily: "Inter",
    textAlign: "center",
  },
  trainCard: {
    backgroundColor: "#1c3a8a",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    borderWidth: 10,
    borderColor: "#1c3a8a",
  },
  trainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffffff",
    fontFamily: "Inter",
  },
  trainText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffffff",
    fontFamily: "Inter",
  },
  quoteCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    borderWidth: 10,
    borderColor: "#ffffffff",
  },
  quoteTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000ff",
    fontFamily: "Inter",
    textAlign: "center",
  },
  quote: {
    fontSize: 15,
    color: "#000000ff",
    fontFamily: "Inter",
    textAlign: "center",
  },
});
