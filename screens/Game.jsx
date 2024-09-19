import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";

const screenWidth = Dimensions.get("window").width;

const Game = ({ phoneNumber, onRestart }) => {
  const [attemptsLeft, setAttemptsLeft] = React.useState(4);
  const [timeLeft, setTimeLeft] = React.useState(60); // 60 seconds
  const [guess, setGuess] = React.useState("");
  const [targetNumber, setTargetNumber] = React.useState(null);
  const [gameStatus, setGameStatus] = React.useState("start"); // start, playing, finished
  const lastDigit = phoneNumber % 10;

  useEffect(() => {
    // defensive coding
    if (lastDigit !== 0) {
      const multiples = []; // multiples of lastDigit within 100
      for (let i = 1; i <= 10; i++) {
        multiples.push(i * lastDigit);
      }
      // random pick from multiples
      const target = multiples[Math.floor(Math.random() * multiples.length)];
      setTargetNumber(target);
    }
  }, [phoneNumber]);

  // timer
  useEffect(() => {
    if (timeLeft > 0 && gameStatus === "playing" && attemptsLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameStatus, attemptsLeft]);

  const handleGuess = () => {
    if (parseInt(guess) === targetNumber) {
      setGameStatus("finished");
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft - 1 === 0) {
        setGameStatus("finished");
      }
    }
    setGuess("");
  };

  // Starter
  const startGame = () => {
    setGameStatus("playing");
    setTimeLeft(60);
    setAttemptsLeft(4);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomButton title="Restart" onPress={onRestart} />
      </View>

      {gameStatus === "start" && (
        <View style={styles.card}>
          <Text style={styles.textLabel}>
            Guess a number between 1 & 100 that is a multiple of {lastDigit}.
          </Text>
          <View style={styles.startButtonContainer}>
            <CustomButton title="Start" onPress={startGame} color="#6e8bfe" />
          </View>
        </View>
      )}

      {gameStatus === "playing" && (
        <View style={styles.gameContainer}>
          <Text style={styles.timerText}>Time Left: {timeLeft} seconds</Text>
          <Text style={styles.attemptsText}>Attempts Left: {attemptsLeft}</Text>
          <TextInput
            style={styles.input}
            value={guess}
            onChangeText={(text) => setGuess(text)}
            keyboardType="numeric"
            placeholder="Enter your guess"
          />
          <CustomButton title="Submit guess" onPress={handleGuess} />
        </View>
      )}

      {gameStatus === "finished" && (
        <View style={styles.card}>
          <Text style={styles.textLabel}>
            {attemptsLeft > 0
              ? "Congratulations! You guessed correctly."
              : `Game Over! The correct number was ${targetNumber}`}
          </Text>
          <CustomButton title="Restart" onPress={onRestart} />
        </View>
      )}
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    width: screenWidth * 0.9,
  },
  textLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    // for restart button
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  startButtonContainer: {
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: 200,
    textAlign: "center",
  },
  timerText: {
    fontSize: 20,
    marginVertical: 10,
  },
  attemptsText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
