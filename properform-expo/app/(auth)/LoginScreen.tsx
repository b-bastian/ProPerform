import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Header from "@/src/components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { typography } from "@/src/theme/typography";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";
import InputField from "../../src/components/input";
import SecondaryButton from "@/src/components/secondaryButton";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayloggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const requestBody = {
      email: email.trim().toLowerCase(),
      password: password,
      stayloggedIn,
    };

    try {
      setLoading(true);
      setError(null);

      console.log("sending login data to api:", requestBody);

      const res = await axios.post(
        "https://api.properform.app/auth/login",
        requestBody,
      );

      const { token, uid } = res.data;
      console.log("login success");

      await AsyncStorage.setItem("auth_token", token);
      await AsyncStorage.setItem("user_id", String(uid));

      
      // wird noch nicht verwendet
      if (stayloggedIn) await AsyncStorage.setItem("stay_logged_in", "true");
      else {
        await AsyncStorage.removeItem("stay_logged_in");
      }
      

      router.replace("/(tabs)/HomeScreen");
    } catch (error: any) {
      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
        console.log("HEADERS:", error.response.headers);
        setError(error.response.data?.message || "Login fehlgeschlagen");
      } else {
        console.log("ERROR:", error.message);
        setError("Netzwerkfehler");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <Header></Header>
        <Text style={typography.secondary}>
          Melde dich mit deinem Account an
        </Text>

        <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
          <InputField
            title="Email"
            value={email}
            placeholder="z.B. max@mustermann.de"
            onChange={setEmail}
          ></InputField>
        </View>

        <View style={{ marginTop: spacing.sm, gap: spacing.md }}>
          <InputField
            title="Password"
            value={password}
            placeholder="••••••••"
            onChange={setPassword}
          ></InputField>
        </View>

        <SecondaryButton
          text="Anmelden"
          onPress={handleLogin}
        ></SecondaryButton>
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
});
