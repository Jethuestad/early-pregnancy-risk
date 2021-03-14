import React from "react";
import Image from "react-native-remote-svg";

export default function Loading() {
  return (
    <Image
      source={require("../assets/loading.svg")}
      style={{
        width: 50,
        height: 50,
        alignSelf: "center",
      }}
    />
  );
}
