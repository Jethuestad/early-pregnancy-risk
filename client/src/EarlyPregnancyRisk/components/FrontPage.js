import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";

export default function FrontPage({ changePage }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
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
        <View style={styles.row}>
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
              <Text style={[styles.textBox, { fontWeight: "bold" }]}>
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
    alignSelf: "stretch",
  },
  content: {
    flex: 3,
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 50,
    ...Platform.select({
      ios: {
        maxWidth: 600,
        minWidth: 500,
      },
      android: {
        maxWidth: 600,
        minWidth: 500,
      },
      default: {
        maxWidth: "60rem",
        minWidth: "50rem",
      },
    }),
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    ...Platform.select({
      ios: {
        maxHeight: 545,
        minWidth: 500,
        maxWidth: 1000,
      },
      android: {
        maxHeight: 545,
        minWidth: 500,
        maxWidth: 1000,
      },
      default: {
        maxHeight: "54.5vh",
        minWidth: "50rem",
        maxWidth: "100vw",
      },
    }),
  },

  textBox: {
    padding: 10,
    ...Platform.select({
      ios: {
        maxWidth: 300,
        minWidth: 250,
      },
      android: {
        maxWidth: 300,
        minWidth: 250,
      },
      default: {
        maxWidth: "30rem",
        minWidth: "25rem",
        fontSize: "1.2rem",
      },
    }),
  },
  button: {
    width: 200,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#BF1616",
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
    color: "white",
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
