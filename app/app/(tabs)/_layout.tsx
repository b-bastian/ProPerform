import { MaterialIcons as Icon } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function TabLayout() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isSmallPhone = width < 390 || height < 760;
  const tabBarHeight = isSmallPhone ? 58 : 70;

  useEffect(() => {
    console.log("🚀 TabLayout mounted");

    const registerPush = async () => {
      try {
        console.log("🔔 Starting push registration...");

        const projectId = Constants.expoConfig?.extra?.eas?.projectId;

        console.log("📦 projectId:", projectId);

        const { status } = await Notifications.getPermissionsAsync();
        console.log("📋 Current permission status:", status);

        let finalStatus = status;

        if (status !== "granted") {
          console.log("🟡 Requesting permission...");
          const request = await Notifications.requestPermissionsAsync();
          finalStatus = request.status;
          console.log("📋 New permission status:", finalStatus);
        }

        if (finalStatus !== "granted") {
          console.log("❌ Permission not granted. Stopping.");
          return;
        }

        console.log("✅ Permission granted");

        const tokenResponse = await Notifications.getExpoPushTokenAsync({
          projectId,
        });

        const token = tokenResponse.data;

        console.log("🎟 Expo push token:", token);

        const jwt = await SecureStore.getItemAsync("access_token");
        console.log("🔐 JWT found:", !!jwt);

        if (!jwt) {
          console.log("❌ No JWT found. Stopping.");
          return;
        }

        console.log("📡 Sending token to backend...");

        const response = await axios.post(
          "https://api.properform.app/auth/push-token",
          { token, projectId: "9cbe62d4-1247-44a2-b565-489d1d9f311f" },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          },
        );

        console.log("✅ Backend response:", response.status);

        await SecureStore.setItemAsync("push_token", token);
        console.log("💾 Token saved locally");
      } catch (err) {
        console.log("💥 Push registration error:", err);
      }
    };

    registerPush();
  }, []);

  // Icons müssen nach unten verschoben werden um die Safe Area zu kompensieren
  const iconOffset = insets.bottom > 0 ? insets.bottom / 2 : 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F9FAFB",
          borderRadius: isSmallPhone ? 34 : 40,
          marginHorizontal: 20,
          marginBottom: insets.bottom > 0 ? 12 : 10,
          height: tabBarHeight + (insets.bottom > 0 ? insets.bottom : 0),
          paddingBottom: 0,
          paddingTop: 0,
          position: "absolute",
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 8 },
          shadowRadius: 16,
          shadowOpacity: 0.18,
          elevation: 14,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: insets.bottom > 0 ? insets.bottom : 0,
        },
        tabBarIconStyle: {
          alignSelf: "center",
        },
        tabBarActiveTintColor: "#F97316",
        tabBarInactiveTintColor: "#8899bb",
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              color={color}
              size={28}
              style={{ marginTop: iconOffset }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ExerciseScreen"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color }) => (
            <Icon
              name="fitness-center"
              color={color}
              size={28}
              style={{ marginTop: iconOffset }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TrainingScreen"
        options={{
          title: "Training",
          tabBarIcon: ({ color }) => (
            <Icon
              name="assignment"
              color={color}
              size={28}
              style={{ marginTop: iconOffset }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon
              name="person"
              color={color}
              size={28}
              style={{ marginTop: iconOffset }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
