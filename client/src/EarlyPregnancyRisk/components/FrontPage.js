import React, { useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { isSmallPhone, isPhone, isTablet } from "../modules/Device";
import { TranslationContext } from "../contexts/TranslationContext";
const colors = require("../style/colors");

export default function FrontPage({ changePage, disabled }) {
  const { width } = useWindowDimensions();
  const context = useContext(TranslationContext);

  return (
    <View style={styles(width).container}>
      <View style={styles(width).content}>
        <View style={styles(width).contentBox}>
          <Text style={styles(width).textBox}>
            {context.front_page_paragraph_1 || ""}
          </Text>
          <Text style={styles(width).textBox}>
            {context.front_page_paragraph_2 || ""}
          </Text>
        </View>
        <View style={styles(width).contentBox}>
          <View style={styles(width).listBox}>
            {context.front_page_list != undefined
              ? context.front_page_list.split(";").map((item, index) => (
                  <Text style={styles(width).listText} key={index}>
                    &bull; {item}
                  </Text>
                ))
              : null}
          </View>
        </View>
      </View>
      <View style={styles(width).buttonContainer}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => changePage()}
          style={styles(width, disabled).button}
        >
          <Text style={styles(width).buttonText}>
            {context.button_start || "Start"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (width, disabled = false) =>
  StyleSheet.create({
    container: {
      flex: "auto",
      flexDirection: "column",
      alignSelf: "stretch",
    },
    content: {
      flex: 3,
      alignSelf: "stretch",
      flexDirection: "column",
    },
    contentBox: {
      flex: 1,
      flexDirection: isTablet(width) ? "column" : "row",
      marginHorizontal: isPhone(width) ? 0 : isTablet(width) ? "10%" : "20%",
      alignItems: "center",
      padding: 25,
      alignSelf: "stretch",
    },
    buttonContainer: {
      flex: 1,
      marginVertical: 50,
    },
    textBox: {
      padding: 2,
      paddingHorizontal: isTablet(width) ? "2%" : "3%",
      paddingVertical: isTablet(width) ? 20 : 0,
      fontSize: 20,
    },
    listBox: {
      paddingHorizontal: isTablet(width) ? "2%" : "3%",
      alignSelf: "flex-start",
    },
    listText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    button: {
      elevation: 7,
      backgroundColor: colors.primary,
      borderRadius: 7,
      paddingHorizontal: 10,
      paddingVertical: 12,
      width: 350,
      alignSelf: "center",
      opacity: disabled ? 0.5 : 1,
    },
    buttonText: {
      color: colors.white,
      textAlign: "center",
      ...Platform.select({
        web: {
          fontSize: "2rem",
        },
        default: {
          fontSize: 18,
          fontWeight: "bold",
        },
      }),
    },
  });
