import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CustomButton from "../components/CustomButton";

export default function Confirm({ visible, userInfo, onContinue, onClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.card}>
          <Text style={styles.title}>Confirm your details</Text>
          <Text>Name: {userInfo?.name}</Text>
          <Text>Email: {userInfo?.email}</Text>
          <Text>Phone: {userInfo?.phone}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={onClose} title="Go Back" />
            <CustomButton onPress={onContinue} title="Continue" color="#6e8bfe" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
