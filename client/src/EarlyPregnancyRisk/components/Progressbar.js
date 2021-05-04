import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";

const colors = require("../style/colors");

export default function ProgressBar({ progress, total }) {
  let animation = useRef(new Animated.Value(0));
  const width = animation.current.interpolate({
    inputRange: [0, total],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: total,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.primary, width },
          ]}
        />
        <Text
          style={[
            styles.text,
            progress / total > 0.5
              ? { color: colors.white }
              : { color: colors.black },
          ]}
        >
          {Math.trunc((progress / total) * 100)}%
        </Text>
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
    fontWeight: "bold",
    fontSize: 20,
  },
});
