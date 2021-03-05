import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

const colors = require("../style/colors");

export default function Header({ changePage }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => changePage()}>
        Early Pregnancy Risk
      </Text>
    </View>
  );
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
    color: colors.primary,
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
