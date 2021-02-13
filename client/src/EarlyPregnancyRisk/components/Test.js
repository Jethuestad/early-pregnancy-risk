import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class TestComponent extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>This is a component!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#bf1d1d",
    fontSize: 30,
  },
});
