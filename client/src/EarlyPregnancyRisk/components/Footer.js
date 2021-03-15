import React, { Component } from "react";
import { StyleSheet, Platform, Linking } from "react-native";
import { Divider, Text, } from "react-native-elements";

import text from "../style/text";

const colors = require("../style/colors");

export default class Footer extends Component {
  render() {
    // Only display the footer on the web.
    return Platform.OS === "web" ? (
      <Divider style={styles.container}>
        <Text style={text.p}>
          Early Pregnancy Risk {new Date().getFullYear()}
        </Text>
        <Text
          style={text.p}
          onPress={() => Linking.openURL("http://google.com")}
        >
          Privacy Information
        </Text>
      </Divider>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#F8EAE8",
      flex: 0.5,
      borderTopColor: "black",
      borderTopWidth: 2,
      marginTop: "auto",
      paddingVertical: 20,
      bottom: 0,
      textAlign: "center",
  },
});
