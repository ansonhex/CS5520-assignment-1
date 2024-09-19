import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, title, color }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color || "#f06388" }]} onPress={onPress}>
      <Text style={styles.buttonText}>{ title }</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
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
    textAlign: "center",
  }
})