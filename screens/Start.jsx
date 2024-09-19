import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "../components/Card";
import colors from "../styles/colors";

export default function Start({ onStart }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Card onRegister={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "relative",
    marginVertical: 40,
  },
  welcomeText: {
    color: colors.textLight,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
