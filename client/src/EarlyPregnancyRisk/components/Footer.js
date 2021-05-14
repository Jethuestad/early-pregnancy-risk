import React, { Component, useContext } from "react";
import { StyleSheet, Text, View, Platform, Linking } from "react-native";
import text from "../style/text";
import { TranslationContext } from "../contexts/TranslationContext";

const colors = require("../style/colors");

export default function Footer() {
  const context = useContext(TranslationContext);
  // Only display the footer on the web.
  return Platform.OS === "web" ? (
    <View style={styles.container}>
      <Text style={text.p}>
        Early Pregnancy Risk {new Date().getFullYear()}
      </Text>
      <Text style={text.p} onPress={() => Linking.openURL("http://google.com")}>
        {context.footer_privacy ||
          "Click here to read about our privacy policy"}
      </Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    borderTopColor: "black",
    borderTopWidth: 2,
    marginTop: "auto",
    paddingVertical: 20,
    bottom: 0,
    textAlign: "center",
  },
});
