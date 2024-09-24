import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from "../styles/colors";

const CustomButton = ({ onPress, title, color }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color || colors.secondary }]} onPress={onPress}>
      <Text style={styles.buttonText}>{ title }</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 100,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.textLight,
    fontWeight: "bold",
    textAlign: "center",
  }
})