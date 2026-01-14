import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/profile_picture.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>PROPERFORM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#1E3A8A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
