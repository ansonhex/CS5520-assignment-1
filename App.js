import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Start from "./screens/Start";
import Confirm from "./screens/Confirm";
import Game from "./screens/Game";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [screen, setScreen] = useState("start");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleRegister = (userData) => {
    setUserInfo(userData);
    setIsConfirmVisible(true); // Show Confirm modal
  };

  const handleContinue = () => {
    setIsConfirmVisible(false);
    setScreen("game"); // Transition to Game screen
  };

  const handleGoBack = () => {
    // console.log(userInfo);
    setIsConfirmVisible(false); // Hide Confirm modal
  };

  const handleRestart = () => {
    setScreen("start"); // Reset to Start screen
    setUserInfo(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.background}
      />
      {screen === "start" && (
        <Start onStart={handleRegister} />
      )}

      {/* Overlay on top of Start, but not rerender */}
      <Confirm
        visible={isConfirmVisible}
        userInfo={userInfo}
        onClose={handleGoBack}
        onContinue={handleContinue}
      />
      {screen === "game" && (
        <Game phoneNumber={userInfo?.phone} onRestart={handleRestart} />
      )}
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