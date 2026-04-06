import { useTheme } from "@/src/context/ThemeContext";
import { spacing } from "@/src/theme/spacing";
import api from "@/src/utils/axiosInstance";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const { width, height: screenHeight } = useWindowDimensions();
  const isCompact = width < 380 || screenHeight < 750;

  const [user, setUser] = React.useState<{
    firstname: string;
    email: string;
    profile_image_url: string | null;
    created_at: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [greeting, setGreeting] = React.useState("");

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loaderContainer: {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    topSection: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      marginBottom: spacing.xl,
    },
    topSectionCompact: {
      marginBottom: spacing.lg,
    },
    profileIconWrap: {
      width: 90,
      height: 90,
      borderRadius: 999,
      backgroundColor: isDark ? colors.surfaceElevated : "#EEF2F7",
      alignItems: "center" as const,
      justifyContent: "center" as const,
      marginRight: spacing.lg,
    },
    profileIconWrapCompact: {
      width: 72,
      height: 72,
      marginRight: spacing.md,
    },
    goodMorning: {
      fontSize: 14,
      fontWeight: "700" as const,
      letterSpacing: 1,
      color: colors.textSecondary,
      fontFamily: "Inter",
    },
    hello: {
      fontSize: 28,
      fontWeight: "900" as const,
      color: colors.textPrimary,
      fontFamily: "Inter",
    },
    helloCompact: {
      fontSize: 24,
    },
    infoSection: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: spacing.lg,
      marginBottom: spacing.xl,
      shadowColor: "#000",
      shadowOpacity: isDark ? 0 : 0.05,
      shadowRadius: 12,
      elevation: 3,
    },
    infoSectionCompact: {
      padding: spacing.md,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "800" as const,
      letterSpacing: 2,
      color: colors.borderGray,
      marginBottom: spacing.lg,
      fontFamily: "Inter",
    },
    row: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      paddingVertical: spacing.md,
    },
    label: {
      fontSize: 18,
      color: colors.textSecondary,
      fontFamily: "Inter",
    },
    value: {
      fontSize: 18,
      fontWeight: "700" as const,
      color: colors.textPrimary,
      fontFamily: "Inter",
    },
    emailValue: {
      fontSize: 14,
      maxWidth: "62%" as any,
      flexShrink: 1,
      textAlign: "right" as const,
    },
    separator: {
      height: 1,
      backgroundColor: colors.borderLight,
    },
    copyRightText: {
      textAlign: "center" as const,
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: spacing.xl,
      fontWeight: "800" as const,
    },
    settingsButton: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      backgroundColor: isDark ? colors.surfaceElevated : "#f0f4f8",
      borderRadius: 12,
      borderColor: colors.primaryBlue,
      borderWidth: 1.5,
    },
    settingsButtonCompact: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    settingsButtonText: {
      flex: 1,
      fontSize: 16,
      fontWeight: "600" as const,
      color: colors.textPrimary,
      marginLeft: spacing.lg,
      fontFamily: "Inter",
    },
  }), [colors, isDark]);

  const calculateGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Guten Morgen,";
    if (hour < 18) return "Guten Tag,";
    return "Guten Abend,";
  };

  useFocusEffect(
    React.useCallback(() => {
      const getUser = async () => {
        setLoading(true);

        try {
          const response = await api.get("/users/me");
          setUser(response.data);
        } catch (err) {
          console.log("Fehler beim Laden des Profils:", err);
        } finally {
          setLoading(false);
        }
      };

      setGreeting(calculateGreeting());
      void getUser();
    }, []),
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primaryBlue} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: isCompact ? 20 : 30,
          paddingBottom: tabBarHeight + spacing.xl,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.topSection,
            isCompact ? styles.topSectionCompact : null,
          ]}
        >
          <View
            style={[
              styles.profileIconWrap,
              isCompact ? styles.profileIconWrapCompact : null,
            ]}
          >
            <Icon name="person" size={48} color={colors.primaryBlue} />
          </View>

          <View>
            <Text style={styles.goodMorning}>{greeting}</Text>
            <Text
              style={[styles.hello, isCompact ? styles.helloCompact : null]}
            >
              {user?.firstname ?? "..."}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.infoSection,
            isCompact ? styles.infoSectionCompact : null,
          ]}
        >
          <Text style={styles.sectionTitle}>PERSÖNLICHE INFORMATIONEN</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Benutzername</Text>
            <Text style={styles.value}>{user?.firstname ?? "..."}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.label}>E-Mail</Text>
            <Text
              style={[styles.value, styles.emailValue]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {user?.email ?? "..."}
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.label}>Trainiert seit</Text>
            <Text style={styles.value}>
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("de-AT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : ""}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.settingsButton,
            isCompact ? styles.settingsButtonCompact : null,
          ]}
          onPress={() => router.push("/(settings)/SettingsScreen")}
          activeOpacity={0.7}
        >
          <Icon name="settings" size={24} color={colors.primaryBlue} />
          <Text style={styles.settingsButtonText}>Einstellungen</Text>
          <Icon name="arrow-forward" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>

        <Text style={styles.copyRightText}>
          ProPerform © {new Date().getFullYear()}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
