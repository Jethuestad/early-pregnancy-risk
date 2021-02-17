import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import text from "../style/text";
import colors from "../style/colors";

export default class PageName extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[text.h1, colors.secondary]}>Early Pregnancy Risk</Text>
        <Text style={[text.h3, colors.black]}>WebTool</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
});
