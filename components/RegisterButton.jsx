import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const RegisterButton = ({ onPress, isEnabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isEnabled ? "#6e8bfe" : "#e5e5e5" },
      ]}
      onPress={onPress}
      disabled={!isEnabled}
    >
      <Text style={[styles.buttonText, { color: isEnabled ? "#fff" : "#a6a6a6" }]}>
        Register
      </Text>
    </TouchableOpacity>
  );
};

export default RegisterButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 100,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
