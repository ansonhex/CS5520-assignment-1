import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import CustomButton from "./CustomButton";
import RegisterButton from "./RegisterButton";
import colors from "../styles/colors";

const screenWidth = Dimensions.get("window").width;

export default function Card({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Error messages
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateName = (newName) => {
    const nameRegex = /^[^0-9\s]+$/;
    if (newName.length > 0 && !nameRegex.test(newName)) {
      setNameError("Name must not be numeric and must contain more than one character.");
    } else {
      setNameError("");
    }
    setName(newName);
  };

  const validateEmail = (newEmail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (newEmail.length > 0 && !emailRegex.test(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    setEmail(newEmail);
  };

  const validatePhone = (newPhone) => {
    const phoneRegex = /^\d{9}[2-9]$/;
    if (newPhone.length > 0 && !phoneRegex.test(newPhone)) {
      setPhoneError("Phone number must be 10 digits and end with a number between 2~9.");
    } else {
      setPhoneError("");
    }
    setPhone(newPhone);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIsChecked(false);
    setNameError("");
    setEmailError("");
    setPhoneError("");
  };

  const validateInputs = () => {
    if (name === "" || email === "" || phone === "") {
      alert("Please fill in all fields.");
      return false;
    }
    if (nameError || emailError || phoneError) {
      alert("Please correct the errors in the form.");
      return false;
    }
    if (!isChecked) {
      alert("Please verify that you are not a robot.");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (validateInputs()) {
      onRegister({ name, email, phone }); // Pass data to parent component (App.js)
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} onChangeText={validateName} value={name} />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} onChangeText={validateEmail} value={email} />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} onChangeText={validatePhone} value={phone} />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

      <View style={styles.checkboxSection}>
        <Checkbox
          value={isChecked}
          onValueChange={(newValue) => setIsChecked(newValue)}
          color={isChecked ? "#ccc" : "#000"}
        />
        <Text style={[styles.checkbox, { color: isChecked ? "#ccc" : "#000" }]}>
          I'm not a robot
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton onPress={resetInputs} title="Reset" />
        <RegisterButton onPress={handleRegister} isEnabled={isChecked} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.backgroundLight,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    width: screenWidth * 0.7,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    padding: 5,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  checkboxSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
  },
});
