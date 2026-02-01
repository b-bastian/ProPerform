import React from "react";
import {
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/components/header";
import SecondaryButton from "@/src/components/secondaryButton";
import InputField from "@/src/components/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { typography } from "@/src/theme/typography";
import { spacing } from "@/src/theme/spacing";
import { colors } from "@/src/theme/colors";

export default function OnboardingScreen2() {
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [errors, setErrors] = React.useState({
    firstName: "",
    password: "",
    passwordRepeat: "",
    birthDate: "",
    email: "",
  });

  const handleContinue = async () => {
    const newErrors = {
      firstName: "",
      password: "",
      passwordRepeat: "",
      birthDate: "",
      email: "",
    };
    let hasError = false;

    if (!firstName.trim()) {
      newErrors.firstName = "Bitte gib deinen Vornamen ein.";
      hasError = true;
    }

    if (!email.includes("@")) {
      newErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
      hasError = true;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Passwort muss mind. 8 Zeichen, 1 Großbuchstaben, 1 Kleinbuchstaben, 1 Zahl und 1 Sonderzeichen enthalten.";
      hasError = true;
    }

    if (password !== passwordRepeat) {
      newErrors.passwordRepeat = "Passwörter stimmen nicht überein.";
      hasError = true;
    }

    if (!birthDate) {
      newErrors.birthDate = "Bitte gib dein Geburtsdatum ein.";
      hasError = true;
    } else {
      const selectedDate = new Date(birthDate);
      const today = new Date();
      if (selectedDate >= today) {
        newErrors.birthDate = "Bitte gib ein gültiges Geburtsdatum ein.";
        hasError = true;
      } else {
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(today.getFullYear() - 10);
        if (selectedDate > tenYearsAgo) {
          newErrors.birthDate = "Du musst mindestens 10 Jahre alt sein.";
          hasError = true;
        }
      }
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      /*
      TODO CAN: Im OnboardingScreen2.tsx nach der Eingabe firstname, birthdate, email und password_hash in AsyncStorage speichern.
                Im OnboardingScreen3.tsx diese Werte wieder abrufen.
                Danach zusätzlich weight, height und gender abfragen.
                Anschließend alle Felder gemeinsam an das Backend senden:
                  
                  await axios.post("https://api.properform.app/users/createUser", {
                    firstname: firstName,
                    birthdate: birthDate,
                    email,
                    password: passwordHash,
                    weight,
                    height,
                    gender, // ENUM: "male", "female", "other", "not specified"
                    onboarding_completed: true,
                    fitness_level,
                    training_frequency,
                    primary_goal,
                  });


Route heißt jetzt /createUser (nicht mehr /register).

Backend erwartet password → wird automatisch gehasht.
      */
      await AsyncStorage.setItem("onboarding_firstName", firstName);
      await AsyncStorage.setItem("onboarding_email", email);
      await AsyncStorage.setItem("onboarding_password", password);
      await AsyncStorage.setItem("onboarding_birthDate", birthDate);

      Alert.alert("Erfolg", "Dein Account wurde erfolgreich erstellt!");
      router.push("../(onboarding)/OnboardingScreen3");
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Fehler",
        error.response?.data?.error || "Registrierung fehlgeschlagen.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header />
          <Text style={styles.title}>Persönliche Daten</Text>

          <InputField
            title="Vorname"
            value={firstName}
            placeholder="Max Mustermann"
            onChange={setFirstName}
          />
          {errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : (
            <Text style={styles.emptyError}> </Text>
          )}

          <InputField
            title="E-Mail"
            value={email}
            placeholder="max@beispiel.at"
            onChange={setEmail}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : (
            <Text style={styles.emptyError}> </Text>
          )}

          <InputField
            title="Passwort"
            value={password}
            placeholder="********"
            onChange={setPassword}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : (
            <Text style={styles.emptyError}> </Text>
          )}

          <InputField
            title="Passwort wiederholen"
            value={passwordRepeat}
            placeholder="********"
            onChange={setPasswordRepeat}
          />
          {errors.passwordRepeat ? (
            <Text style={styles.errorText}>{errors.passwordRepeat}</Text>
          ) : (
            <Text style={styles.emptyError}> </Text>
          )}

          <View style={styles.hintBox}>
            <Text style={styles.hintText}>• Mind. 8 Zeichen</Text>
            <Text style={styles.hintText}>• 1 Sonderzeichen</Text>
            <Text style={styles.hintText}>• 1 Großbuchstabe</Text>
          </View>

          <InputField
            title="Geburtsdatum"
            value={birthDate}
            placeholder="TT.MM.JJJJ"
            onChange={setBirthDate}
          />
          {errors.birthDate ? (
            <Text style={styles.errorText}>{errors.birthDate}</Text>
          ) : (
            <Text style={styles.emptyError}> </Text>
          )}

          <SecondaryButton text="WEITER" onPress={handleContinue} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primaryBlue },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  error: { color: "red", fontSize: 13, marginTop: 2, marginLeft: 4 },
  title: {
    ...typography.title,
    color: colors.white,
    marginVertical: spacing.lg,
  },
  errorText: {
    ...typography.error,
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 4,
  },
  emptyError: {
    color: "transparent",
    fontSize: 13,
    marginTop: 6,
    marginBottom: 8,
    marginLeft: 4,
  },
  hintBox: {
    marginBottom: spacing.lg,
    marginTop: -spacing.xs,
    paddingLeft: spacing.md,
  },
  hintText: {
    ...typography.hint,
    color: "#ffffffb3",
  },
});
