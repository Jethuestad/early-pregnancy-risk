import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Divider, Text, } from "react-native-elements";

const colors = require("../style/colors");

export default function Header({ changePage }) {
  return (
    <Divider style={styles.container}>
      <Text style={styles.text} onPress={() => changePage()}>
        Early Pregnancy Risk
      </Text>
    </Divider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EAE8",
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
