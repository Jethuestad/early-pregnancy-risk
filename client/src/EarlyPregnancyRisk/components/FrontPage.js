import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { isSmallPhone, isPhone, isTablet } from "../modules/Device";
const colors = require("../style/colors");

export default function FrontPage({ changePage }) {
  const { width, height } = useWindowDimensions();

  return (
    <ScrollView style={styles(width).container}>
      <View style={styles(width).content}>
        <View style={styles(width).contentBox}>
          <Text style={styles(width).textBox}>
            Pregnant or planning for a baby? This tool will make you assess your
            health status for a healthy pregnancy and a complication free birth.
            By filling in your personal health measurements, this tool will
            estimate risk for developing common pregnancy complications below.
          </Text>
          <Text style={styles(width).textBox}>
            It is important to note that the tool will provide you with the risk
            of an ‘average‘ woman with your health measures and NOT your
            personal risk score. It is also important to note that the model
            does not take into many other psychosocial factors affecting
            maternal outcome.
          </Text>
        </View>
        <View style={styles(width).contentBox}>
          <View style={styles(width).listBox}>
            <Text style={styles(width).listText}>&bull; Miscarriage</Text>
            <Text style={styles(width).listText}>
              &bull; Gestational Diabetes Mellitus
            </Text>
            <Text style={styles(width).listText}>&bull; Preeclampsia</Text>
            <Text style={styles(width).listText}>&bull; Pre-term birth</Text>
            <Text style={styles(width).listText}>&bull; Still birth</Text>
            <Text style={styles(width).listText}>&bull; Caesarean section</Text>
            <Text style={styles(width).listText}>
              &bull; Postpartum depression
            </Text>
          </View>
        </View>
      </View>
      <View style={styles(width).buttonContainer}>
        <TouchableOpacity
          onPress={() => changePage()}
          style={styles(width).button}
        >
          <Text style={styles(width).buttonText}>Start Risk Assessment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = (width) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    },
    buttonText: {
      color: colors.white,
      textAlign: "center",
      ...Platform.select({
        ios: {
          fontSize: 18,
        },
        android: {
          fontSize: 18,
        },
        default: {
          fontSize: "2rem",
        },
      }),
    },
  });
