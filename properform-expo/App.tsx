import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/routes";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  return <Routes />;
}
