import { useTheme } from "@/src/context/ThemeContext";
import { ColorSchemePreference } from "@/src/context/ThemeContext";
import { spacing } from "@/src/theme/spacing";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useMemo } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { colors, isDark, colorSchemePreference, setColorSchemePreference } = useTheme();
  const router = useRouter();
  const { width, height: screenHeight } = useWindowDimensions();
  const isCompact = width < 380 || screenHeight < 750;
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      paddingHorizontal: spacing.screenPaddingHorizontal,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    backButton: {
      padding: spacing.sm,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "700" as const,
      color: colors.textPrimary,
      fontFamily: "Inter",
    },
    content: {
      paddingHorizontal: spacing.screenPaddingHorizontal,
      paddingVertical: spacing.lg,
    },
    contentCompact: {
      paddingVertical: spacing.md,
    },
    section: {
      marginBottom: spacing.xl,
      backgroundColor: colors.surface,
      borderRadius: 15,
      overflow: "hidden" as const,
      shadowColor: "#000",
      shadowOpacity: isDark ? 0 : 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    sectionCompact: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: "800" as const,
      letterSpacing: 1.5,
      color: colors.textSecondary,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
      fontFamily: "Inter",
    },
    settingItem: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    settingItemCompact: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    settingLeft: {
      flex: 1,
      flexDirection: "row" as const,
      alignItems: "center" as const,
    },
    settingText: {
      marginLeft: spacing.lg,
      flex: 1,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: "600" as const,
      color: colors.textPrimary,
      fontFamily: "Inter",
    },
    settingDescription: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: spacing.xs,
      fontFamily: "Inter",
    },
    // Appearance segmented control
    appearanceItem: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    },
    appearanceItemCompact: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    appearanceTop: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      marginBottom: spacing.md,
    },
    appearanceSegmented: {
      flexDirection: "row" as const,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.borderLight,
      overflow: "hidden" as const,
    },
    segmentBtn: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      backgroundColor: colors.surface,
    },
    segmentBtnActive: {
      backgroundColor: colors.primaryBlue,
    },
    segmentBtnText: {
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "600" as const,
      color: colors.textSecondary,
    },
    segmentBtnTextActive: {
      color: colors.white,
    },
    logoutSection: {
      marginBottom: spacing.xl,
    },
    logoutButton: {
      backgroundColor: "#DC2626",
      borderRadius: 16,
      minHeight: 58,
      paddingHorizontal: spacing.lg,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      shadowColor: "#991B1B",
      shadowOpacity: 0.25,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
    logoutButtonCompact: {
      minHeight: 54,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "800" as const,
      color: colors.white,
      fontFamily: "Inter",
      flex: 1,
      marginLeft: spacing.md,
    },
    footer: {
      textAlign: "center" as const,
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
      fontWeight: "600" as const,
      fontFamily: "Inter",
    },
  }), [colors, isDark]);

  const clearUserSessionData = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("user_id");
    await SecureStore.deleteItemAsync("push_token");

    await AsyncStorage.multiRemove([
      "onboarding_email",
      "stay_logged_in",
      "home_streak_last_visit",
      "home_streak_current",
      "home_streak_week_visits",
      "last_workout",
      "workout_history",
    ]);
  };

  const handleLogout = () => {
    Alert.alert(
      "Abmelden",
      "Möchtest du dich wirklich abmelden? Streak und letztes Workout werden gelöscht.",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Abmelden",
          style: "destructive",
          onPress: async () => {
            await clearUserSessionData();
            router.replace("/(onboarding)/OnboardingScreen");
          },
        },
      ],
    );
  };

  const handlePasswordReset = async () => {
    const storedEmail = await AsyncStorage.getItem("onboarding_email");

    try {
      const passwordRes = await axios.post(
        "https://api.properform.app/auth/reset-password",
        {
          email: storedEmail,
        },
      );

      if (passwordRes.status === 500) {
        return Alert.alert(
          "Fehler",
          "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
        );
      }

      Alert.alert(
        "Passwort zurücksetzen",
        "Anweisungen zum Zurücksetzen wurden gesendet.",
      );
    } catch (err: any) {
      console.log(err.message);

      Alert.alert(
        "Fehler",
        "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
      );
    }
  };

  const handleOpenWebsite = async () => {
    const url = "https://properform.app";

    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert("Fehler", "Die URL kann nicht geöffnet werden.");
      return;
    }

    await Linking.openURL(url);
  };

  const SCHEME_OPTIONS: { label: string; value: ColorSchemePreference }[] = [
    { label: "System", value: "system" },
    { label: "Hell", value: "light" },
    { label: "Dunkel", value: "dark" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Einstellungen</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          isCompact ? styles.contentCompact : null,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.section, isCompact ? styles.sectionCompact : null]}
        >
          <Text style={styles.sectionTitle}>KONTO</Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              isCompact ? styles.settingItemCompact : null,
            ]}
            onPress={() => router.push("/(settings)/EditProfileScreen")}
          >
            <View style={styles.settingLeft}>
              <Icon name="person" size={22} color={colors.primaryBlue} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Profil bearbeiten</Text>
                <Text style={styles.settingDescription}>
                  Deine persönlichen Daten
                </Text>
              </View>
            </View>
            <Icon name="arrow-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              isCompact ? styles.settingItemCompact : null,
            ]}
            onPress={handlePasswordReset}
          >
            <View style={styles.settingLeft}>
              <Icon name="lock" size={22} color={colors.primaryBlue} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Passwort ändern</Text>
                <Text style={styles.settingDescription}>
                  Ändere dein Passwort
                </Text>
              </View>
            </View>
            <Icon name="arrow-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View
          style={[styles.section, isCompact ? styles.sectionCompact : null]}
        >
          <Text style={styles.sectionTitle}>BENACHRICHTIGUNGEN</Text>

          <View
            style={[
              styles.settingItem,
              isCompact ? styles.settingItemCompact : null,
            ]}
          >
            <View style={styles.settingLeft}>
              <Icon name="notifications" size={22} color={colors.primaryBlue} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Push-Benachrichtigungen</Text>
                <Text style={styles.settingDescription}>
                  Erhalte Training-Updates
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor={notificationsEnabled ? colors.primaryBlue : "#ccc"}
            />
          </View>

          <View
            style={[
              styles.settingItem,
              isCompact ? styles.settingItemCompact : null,
            ]}
          >
            <View style={styles.settingLeft}>
              <Icon name="mail" size={22} color={colors.primaryBlue} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>
                  Email-Benachrichtigungen
                </Text>
                <Text style={styles.settingDescription}>
                  Wichtige Updates per Email
                </Text>
              </View>
            </View>
            <Switch
              disabled={true}
              value={false}
              onValueChange={() => {}}
              thumbColor="#ccc"
            />
          </View>
        </View>

        <View
          style={[styles.section, isCompact ? styles.sectionCompact : null]}
        >
          <Text style={styles.sectionTitle}>DARSTELLUNG</Text>

          <View
            style={[
              isCompact ? styles.appearanceItemCompact : styles.appearanceItem,
            ]}
          >
            <View style={styles.appearanceTop}>
              <Icon name="dark-mode" size={22} color={colors.primaryBlue} />
              <View style={[styles.settingText]}>
                <Text style={styles.settingLabel}>Erscheinungsbild</Text>
                <Text style={styles.settingDescription}>Design bevorzugen</Text>
              </View>
            </View>

            <View style={styles.appearanceSegmented}>
              {SCHEME_OPTIONS.map((opt) => {
                const isActive = colorSchemePreference === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[
                      styles.segmentBtn,
                      isActive && styles.segmentBtnActive,
                    ]}
                    onPress={() => setColorSchemePreference(opt.value)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.segmentBtnText,
                        isActive && styles.segmentBtnTextActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View
          style={[styles.section, isCompact ? styles.sectionCompact : null]}
        >
          <Text style={styles.sectionTitle}>SUPPORT</Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              isCompact ? styles.settingItemCompact : null,
            ]}
            onPress={handleOpenWebsite}
          >
            <View style={styles.settingLeft}>
              <Icon name="help" size={22} color={colors.primaryBlue} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Hilfe & Support</Text>
                <Text style={styles.settingDescription}>
                  Häufig gestellte Fragen
                </Text>
              </View>
            </View>
            <Icon name="arrow-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <View
            style={[
              styles.settingItem,
              isCompact ? styles.settingItemCompact : null,
            ]}
          >
            <View style={styles.settingLeft}>
              <Icon name="info" size={22} color={colors.primaryBlue} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Über ProPerform</Text>
                <Text style={styles.settingDescription}>Version 1.0.0</Text>
              </View>
            </View>
            <Icon name="arrow-forward" size={20} color={colors.textSecondary} />
          </View>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[
              styles.logoutButton,
              isCompact ? styles.logoutButtonCompact : null,
            ]}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Icon name="logout" size={22} color={colors.white} />
            <Text style={styles.logoutText}>Abmelden</Text>
            <Icon name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          ProPerform © {new Date().getFullYear()}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
