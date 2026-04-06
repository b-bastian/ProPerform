import Header from "@/src/components/header";
import ProgressDots from "@/src/components/ProgressDots";
import { useTheme } from "@/src/context/ThemeContext";
import { spacing } from "@/src/theme/spacing";
import { typography } from "@/src/theme/typography";
import api from "@/src/utils/axiosInstance";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingTrainerCodeScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const { width, height: screenHeight } = useWindowDimensions();
  const isCompact = width < 380 || screenHeight < 750;

  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loadingConnect, setLoadingConnect] = React.useState(false);
  const [trainer, setTrainer] = React.useState<{
    tid: number;
    firstname: string;
    lastname: string;
  } | null>(null);
  const [error, setError] = React.useState("");

  const handleBack = () => {
    router.back();
  };

  const handleCheckCode = async () => {
    if (code.length < 6) {
      setError("Bitte gib einen gültigen Code ein.");
      return;
    }
    setError("");
    setTrainer(null);
    try {
      setLoading(true);
      const inviteCode = `TRN-${code.slice(0, 3)}-${code.slice(3)}`;
      const response = await axios.post(
        "https://api.properform.app/trainers/check-invite-code",
        { invite_code: inviteCode },
      );
      if (response.data.success) {
        setTrainer(response.data.trainer);
      } else {
        setError("Ungültiger Einladungscode.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setLoadingConnect(true);
      const inviteCode = `TRN-${code.slice(0, 3)}-${code.slice(3)}`;
      await api.post("/trainers/connect", { invite_code: inviteCode });
      router.push("../(onboarding)/VerifyEmailScreen");
    } catch (err: any) {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      Alert.alert(
        "Fehler",
        err.response?.data?.error || "Verbindung fehlgeschlagen.",
      );
    } finally {
      setLoadingConnect(false);
    }
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.screenPaddingHorizontal,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: spacing.md,
    },
    scrollContentCompact: {
      paddingTop: spacing.sm,
    },
    header: {
      marginBottom: spacing.lg,
    },
    headerCompact: {
      marginBottom: spacing.md,
    },
    subheader: {
      fontSize: 18,
      marginTop: spacing.md,
      color: colors.textSecondary,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: spacing.md,
      gap: spacing.sm,
      shadowColor: colors.black,
      shadowOpacity: isDark ? 0 : 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    cardCompact: {
      padding: spacing.sm,
    },
    label: {
      ...typography.label,
      color: colors.textPrimary,
      marginBottom: 4,
      marginLeft: 4,
    },
    inputRow: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      borderWidth: 2,
      borderColor: colors.borderLight,
      borderRadius: 12,
      overflow: "hidden" as const,
    },
    prefixBox: {
      backgroundColor: isDark ? colors.surfaceElevated : "#F3F4F6",
      paddingHorizontal: spacing.md,
      height: 56,
      justifyContent: "center" as const,
      borderRightWidth: 2,
      borderRightColor: colors.borderLight,
    },
    prefixText: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "700" as const,
      color: colors.textSecondary,
    },
    codeInput: {
      flex: 1,
      height: 56,
      paddingHorizontal: spacing.md,
      fontSize: 18,
      fontFamily: "Inter",
      fontWeight: "700" as const,
      color: colors.textPrimary,
      letterSpacing: 2,
    },
    checkButton: {
      backgroundColor: colors.primaryBlue,
      paddingHorizontal: spacing.md,
      height: 56,
      justifyContent: "center" as const,
    },
    checkButtonText: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "800" as const,
      color: colors.white,
    },
    errorText: {
      fontFamily: "Inter",
      fontSize: 13,
      color: "red",
      marginLeft: 4,
    },
    trainerFound: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      backgroundColor: isDark ? "#1c3a8a22" : "#EFF6FF",
      borderRadius: 12,
      padding: spacing.md,
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    trainerAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primaryBlue,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    trainerAvatarText: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "800" as const,
      color: colors.white,
    },
    trainerInfo: {
      flex: 1,
    },
    trainerFoundLabel: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: "600" as const,
      color: colors.textSecondary,
    },
    trainerName: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "800" as const,
      color: colors.textPrimary,
    },
    hintText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: spacing.sm,
      textAlign: "center" as const,
    },
    navigation: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      marginTop: "auto" as any,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl + 20,
    },
    navigationCompact: {
      paddingBottom: spacing.xl,
    },
    arrowButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primaryBlue,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
  }), [colors, isDark]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "height" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isCompact ? styles.scrollContentCompact : null,
          ]}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "none"}
        >
          <View
            style={[styles.header, isCompact ? styles.headerCompact : null]}
          >
            <Text style={[typography.title, { color: colors.textPrimary }]}>Trainer verbinden</Text>
            <Text style={[typography.body, styles.subheader]}>
              Gib den Code deines Trainers ein
            </Text>
          </View>

          <View style={[styles.card, isCompact ? styles.cardCompact : null]}>
            <Text style={styles.label}>Trainer-Code</Text>

            <View
              style={[styles.inputRow, error ? { borderColor: "red" } : null]}
            >
              <View style={styles.prefixBox}>
                <Text style={styles.prefixText}>TRN-</Text>
              </View>
              <TextInput
                style={styles.codeInput}
                value={
                  code.length > 3
                    ? `${code.slice(0, 3)}-${code.slice(3)}`
                    : code
                }
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9A-Za-z]/g, "");
                  if (cleaned.length <= 6) {
                    setCode(cleaned.toUpperCase());
                    setError("");
                    setTrainer(null);
                  }
                }}
                placeholder="ABC-DEF"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="characters"
                maxLength={7}
              />
              <TouchableOpacity
                style={[
                  styles.checkButton,
                  (loading || code.length < 6) && { opacity: 0.5 },
                ]}
                onPress={handleCheckCode}
                disabled={loading || code.length < 6}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={styles.checkButtonText}>Prüfen</Text>
                )}
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {trainer && (
              <View style={styles.trainerFound}>
                <View style={styles.trainerAvatar}>
                  <Text style={styles.trainerAvatarText}>
                    {trainer.firstname[0]}
                    {trainer.lastname[0]}
                  </Text>
                </View>
                <View style={styles.trainerInfo}>
                  <Text style={styles.trainerFoundLabel}>Trainer gefunden</Text>
                  <Text style={styles.trainerName}>
                    {trainer.firstname} {trainer.lastname}
                  </Text>
                </View>
                <Icon
                  name="check-circle"
                  size={24}
                  color={colors.primaryBlue}
                />
              </View>
            )}
          </View>

          <Text style={styles.hintText}>
            Du bekommst den Code von deinem Trainer.
          </Text>

          <View
            style={[
              styles.navigation,
              isCompact ? styles.navigationCompact : null,
            ]}
          >
            <TouchableOpacity style={styles.arrowButton} onPress={handleBack}>
              <Icon name="arrow-back" size={24} color={colors.white} />
            </TouchableOpacity>

            <ProgressDots total={6} current={5} />

            <TouchableOpacity
              style={[
                styles.arrowButton,
                (!trainer || loadingConnect) && { opacity: 0.4 },
              ]}
              onPress={handleConnect}
              disabled={!trainer || loadingConnect}
            >
              {loadingConnect ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Icon name="arrow-forward" size={24} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
