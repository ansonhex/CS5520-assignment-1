import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";
import React from "react";

const screenWidth = Dimensions.get("window").width; // Get the width of the screen

export default function Card() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newName) => {setName(newName)}}
        value={name}
      />

      <Text style={styles.label}>Email Address: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(newEmail) => {setEmail(newEmail)}}
        value={email}
      />

      <Text style={styles.label}>Phone Number: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(newPhone) => {setPhone(newPhone)}}
        value={phone}
      />
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
});
