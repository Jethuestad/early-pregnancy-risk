import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import { isPhone } from "../modules/Device";
const colors = require("../style/colors");

export default function FrontPage({ changePage }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentBox}>
          <Text style={styles.textBox}>
            Pregnant or planning for a baby? This tool will make you assess your
            health status for a healthy pregnancy and a complication free birth.
            By filling in your personal health measurements, this tool will
            estimate risk for developing common pregnancy complications below.
          </Text>
          <Text style={styles.textBox}>
            It is important to note that the tool will provide you with the risk
            of an ‘average‘ woman with your health measures and NOT your
            personal risk score. It is also important to note that the model
            does not take into many other psychosocial factors affecting
            maternal outcome.
          </Text>
        </View>
        <View style={styles.contentBox}>
          <FlatList
            data={[
              { key: "Miscarriage" },
              { key: "Gestational Diabetes Mellitus" },
              { key: "Preeclampsia" },
              { key: "Pre-term birth" },
              { key: "Still birth" },
              { key: "Caesarean section" },
              { key: "Postpartum depression" },
            ]}
            renderItem={({ item }) => (
              <Text style={[styles.listBox, { fontWeight: "bold" }]}>
                {item.key}
              </Text>
            )}
          />
        </View>
        <View style={styles.row}></View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => changePage()} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    alignItems: "center",
  },
  content: {
    flex: 3,
    alignSelf: "stretch",
    flexDirection: "column",
  },
  contentBox: {
    flex: 1,
    flexDirection: isPhone() ? "column" : "row",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  buttonContainer: {
    flex: 1,
  },

  textBox: {
    padding: 2,
    paddingHorizontal: isPhone() ? "2%" : "5%",
    paddingVertical: isPhone() ? 20 : 0,
    fontSize: 20,
  },
  listBox: {
    padding: 2,
    paddingHorizontal: isPhone() ? "2%" : "5%",
    fontSize: 20,
  },
  button: {
    width: 200,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        borderRadius: 5,
      },
      android: {
        borderRadius: 5,
      },
      default: {
        borderRadius: "5px",
      },
    }),
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
