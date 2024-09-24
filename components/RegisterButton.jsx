import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../styles/colors";

const RegisterButton = ({ onPress, isEnabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isEnabled ? colors.primary : colors.disabled },
      ]}
      onPress={onPress}
      disabled={!isEnabled}
    >
      <Text 
        style={[
          styles.buttonText, 
          { color: isEnabled ? colors.textLight : colors.disabledText }
        ]}
      >
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