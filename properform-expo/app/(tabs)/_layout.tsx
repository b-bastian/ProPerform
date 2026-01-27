import { Tabs } from "expo-router";
import { MaterialIcons as Icon } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1c3a8a",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontWeight: "500",
        },
        tabBarActiveTintColor: "#ffffffff",
        tabBarInactiveTintColor: "#8899bb",
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={28} />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "ProfileScreen",
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
