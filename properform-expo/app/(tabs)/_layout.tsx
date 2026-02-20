import { Tabs } from "expo-router";
import { MaterialIcons as Icon } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F9FAFB",
          borderRadius: 40,
          marginHorizontal: 20,
          marginBottom: 6,
          height: 70,
          paddingBottom: 0,
          paddingTop: 18,
          position: "absolute",
          shadowColor: "#000",
          shadowRadius: 12,
          shadowOpacity: 0.1,
          elevation: 8,
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
            <Icon name="home" color={color} size={28} />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
