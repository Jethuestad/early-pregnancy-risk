import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";

const colors = require("../style/colors");

export default function ComplicationProgressbar({ progress, total, title }) {
  const severityColors = [
    "#8ab7de",
    "#80cf61",
    "#ffed2b",
    "#ffb12b",
    "#d12c26",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: severityColors[Math.min(progress, total)],
              width: `${100 - 20 * (total - progress)}%`,
            },
          ]}
        />
        <Text style={[styles.text]}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  progressBar: {
    height: 30,
    width: "80%",
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  },
  text: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 3,
    fontSize: 15,
  },
});
