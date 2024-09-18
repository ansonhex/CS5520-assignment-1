import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Start from "./screens/Start";
import Confirm from "./screens/Confirm";

export default function App() {
  // State to control the screen and user info
  const [userInfo, setUserInfo] = useState(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleRegister = (userData) => {
    setUserInfo(userData);
    setIsConfirmVisible(true); // Show Confirm modal
  };

  const handleContinue = () => {
    setIsConfirmVisible(false);
    // Transition to the next screen (e.g., game) after confirming
    
  };

  const handleGoBack = () => {
    setIsConfirmVisible(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.background}
      />
      <Start onStart={handleRegister} />
      <Confirm
        visible={isConfirmVisible}
        userInfo={userInfo}
        onClose={handleGoBack}
        onContinue={handleContinue}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
