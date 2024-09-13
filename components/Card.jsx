import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import ResetButton from "./ResetButton";
import RegisterButton from "./RegisterButton";

const screenWidth = Dimensions.get("window").width; // Get the width of the screen

export default function Card() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const resetInputs = () => {
    // Reset the input fields
    setName("");
    setEmail("");
    setPhone("");
    setIsChecked(false);
  };

  // validates input for registration
  const validateInputs = () => {
    if (name === "" || email === "" || phone === "") {
      alert("Please fill in all fields.");
      return false;
    }

    if (!isChecked) {
      alert("Please verify that you are not a robot.");
      return false;
    }
    return true;
  };

  // handle register
  const handleRegister = () => {
    if (validateInputs()) {
      alert("Registration successful!");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newName) => {
          setName(newName);
        }}
        value={name}
      />

      <Text style={styles.label}>Email Address: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        value={email}
      />

      <Text style={styles.label}>Phone Number: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(newPhone) => {
          setPhone(newPhone);
        }}
        value={phone}
      />

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

      {/* Reset and Register buttons */}
      <View style={styles.buttonContainer}>
        <ResetButton onPress={resetInputs} />
        <RegisterButton onPress={handleRegister} isEnabled={isChecked} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
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
    borderBottomColor: "#ccc",
  },
  checkboxSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    marginLeft: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
