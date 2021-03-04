import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default function SkipInput({ progress, total }) {
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
    <View style={styles.progressBar}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: "#E15A46", width }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    width: "80%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
  },
});
