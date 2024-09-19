import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";

const screenWidth = Dimensions.get("window").width;

const Game = ({ phoneNumber, onRestart }) => {
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [guess, setGuess] = useState("");
  const [targetNumber, setTargetNumber] = useState(null);
  const [gameStatus, setGameStatus] = useState("start"); // start, playing, guessing, finished
  const [hint, setHint] = useState("");
  const [guessResult, setGuessResult] = useState("");
  const lastDigit = phoneNumber % 10;

  console.log(targetNumber);

  useEffect(() => {
    if (lastDigit !== 0) {
      const multiples = [];
      for (let i = 1; i <= 100 / lastDigit; i++) {
        multiples.push(i * lastDigit);
      }
      const target = multiples[Math.floor(Math.random() * multiples.length)];
      setTargetNumber(target);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (timeLeft > 0 && gameStatus === "playing" && attemptsLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStatus === "playing") {
      setGameStatus("finished");
    }
  }, [timeLeft, gameStatus, attemptsLeft]);

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (guessNumber % lastDigit !== 0) {
      Alert.alert("Invalid Guess", `Please enter a multiple of ${lastDigit}.`);
      setGuess("");
      return;
    }

    if (guessNumber === targetNumber) {
      setGameStatus("finished");
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      setGuessResult(guessNumber < targetNumber ? "higher" : "lower");
      setGameStatus("guessing");
      if (attemptsLeft - 1 === 0) {
        setGameStatus("finished");
      }
    }
    setGuess("");
  };

  const handleHint = () => {
    if (targetNumber < 50) {
      setHint("The number is between 0 and 50");
    } else {
      setHint("The number is between 50 and 100");
    }
  };

  const startGame = () => {
    setGameStatus("playing");
    setTimeLeft(60);
    setAttemptsLeft(4);
    setHint("");
    setGuessResult("");
  };

  const tryAgain = () => {
    setGameStatus("playing");
    setGuessResult("");
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

      {(gameStatus === "playing" || gameStatus === "guessing") && (
        <View style={styles.card}>
          <Text style={styles.textLabel}>
            Guess a number between 1 & 100 that is a multiple of {lastDigit}.
          </Text>
          {gameStatus === "playing" && (
            <>
              <TextInput
                style={styles.input}
                value={guess}
                onChangeText={(text) => setGuess(text)}
                // keyboardType="numeric"
              />
              <Text style={styles.otherText}>
                Attempts Left: {attemptsLeft}
              </Text>
              <Text style={styles.otherText}>
                Time Left: {timeLeft} seconds
              </Text>
              {hint && <Text style={styles.hintText}>{hint}</Text>}
              <CustomButton
                title="Use a Hint"
                onPress={handleHint}
                color="orange"
              />
              <CustomButton
                title="Submit guess"
                onPress={handleGuess}
                color="#6e8bfe"
              />
            </>
          )}
          {gameStatus === "guessing" && (
            <>
              <Text style={styles.textLabel}>You did not guess correct!</Text>
              <Text style={styles.textLabel}>
                Your should guess {guessResult}.
              </Text>
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Try again"
                  onPress={tryAgain}
                  color="#6e8bfe"
                />
                <CustomButton
                  title="End the game"
                  onPress={() => setGameStatus("finished")}
                />
              </View>
            </>
          )}
        </View>
      )}

      {gameStatus === "finished" && (
        <View style={styles.card}>
          <Text style={styles.textLabel}>
            {attemptsLeft > 0
              ? "Congratulations! You guessed correctly."
              : `Game Over! The correct number was ${targetNumber}`}
          </Text>
          <CustomButton title="Restart" onPress={onRestart} color="#6e8bfe" />
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
    alignItems: "center",
  },
  textLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  startButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    color: "black",
    fontSize: 16,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  otherText: {
    color: "grey",
    fontSize: 16,
    marginVertical: 5,
  },
  hintText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
