import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const colors = require("../style/colors");

export default function Loading({ message }) {
  return (
    <View
      style={{ alignItems: "center", height: "100%", justifyContent: "center" }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ color: colors.secondary, marginTop: 5 }}>{message}</Text>
    </View>
  );
}
