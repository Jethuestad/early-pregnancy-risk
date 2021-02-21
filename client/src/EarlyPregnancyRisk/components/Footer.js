import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, Linking } from "react-native";
import text from "../style/text";
import colors from "../style/colors";

export default class Footer extends Component {
  render() {
    // Only display the footer on the web.
    return Platform.OS === "web" ? (
      <View style={styles.container}>
        <Text style={[text.p, colors.black]}>
          Early Pregnancy Risk {new Date().getFullYear()}
        </Text>{" "}
        <Text
          style={[text.p, colors.black]}
          onPress={() => Linking.openURL("http://google.com")}
        >
          Privacy Information
        </Text>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "black",
    borderTopWidth: 2,
    marginTop: "auto",
    paddingVertical: 20,
    bottom: 0,
    textAlign: "center",
  },
});
