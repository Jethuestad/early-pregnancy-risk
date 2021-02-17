import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PageName from "./components/PageName";

export default function App() {
  return (
    <View style={styles.container}>
      <PageName />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
