import { StyleSheet, Text, View, Modal, Button } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const Confirm = ({ visible, onClose, onContinue, userInfo }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalContent}>
        <View style={styles.modalBackground}>
          <Text style={styles.title}>Confirm Your Information</Text>
          <View style={styles.card}>
            <Text>Name: {userInfo.name}</Text>
            <Text>Email: {userInfo.email}</Text>
            <Text>Phone: {userInfo.phone}</Text>
            <Text>If it's not correct, please go back and edit them</Text>
          </View>

          {/* Buttons to go back or continue */}
          <View style={styles.buttonContainer}>
            <CustomButton title="Go Back" onPress={onClose} />
            <CustomButton title="Continue" onPress={onContinue} color="#6e8bfe"/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackground: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
