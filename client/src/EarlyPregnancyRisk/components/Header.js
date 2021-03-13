import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
} from "react-native";
import { isPhone, isSmallPhone, isTablet } from "../modules/Device";

const colors = require("../style/colors");

export default function Header({ changePage }) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles(width).container}>
      <Text style={styles(width).text} onPress={() => changePage()}>
        Early Pregnancy Risk
      </Text>
    </View>
  );
}

const styles = (width) =>
  StyleSheet.create({
    container: {
      flex: isPhone(width) ? 1 : 2,
      ...Platform.select({
        web: {
          alignItems: "center",
          marginTop: 20,
          paddingBottom: 20,
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
          fontSize: isSmallPhone(width)
            ? 30
            : isPhone(width)
            ? 40
            : isTablet(width)
            ? 50
            : 60,
        },
        default: {
          fontSize: 30,
        },
      }),
    },
  });
