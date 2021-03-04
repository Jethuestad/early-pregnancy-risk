import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import colors from "../style/colors";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, colors.primary]}>Early Pregnancy Risk</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      web: {
        alignItems: "center",
        marginTop: 20,
        paddingBottom: 20,
        borderBottomColor: "black",
        borderBottomWidth: 2,
      },
      default: {
        alignSelf: "center",
        marginTop: 40,
      },
    }),
  },
  text: {
    fontWeight: "bold",
    ...Platform.select({
      web: {
        fontSize: 50,
      },
      default: {
        fontSize: 30,
      },
    }),
  },
});
