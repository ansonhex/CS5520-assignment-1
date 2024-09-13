import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ResetButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Reset</Text>
    </TouchableOpacity>
  )
}

export default ResetButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f06388",
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    width: 100,
    textAlign: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  }
})