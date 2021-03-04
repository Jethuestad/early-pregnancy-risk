
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  FlatList,
} from "react-native";

import Footer from "./Footer";
import Header from "./Header";
import Form from "./Form";

export default function FrontPage() {

  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>

      <Header />

      {!showForm ? (
        <View style={styles.centre}>
          <View style={styles.infoBox}>
            <Text style={styles.textBox}>
              Pregnant or planning for a baby? This tool will make you assess
              your health status for a healthy pregnancy and a complication free
              birth. By filling in your personal health measurements, this tool
              will estimate risk for developing common pregnancy complications
              below.
            </Text>

            <Text style={styles.textBox}>
              It is important to note that the tool will provide you with the
              risk of an ‘average‘ woman with your health measures and NOT your
              personal risk score. It is also important to note that the model
              does not take into many other psychosocial factors affecting
              maternal outcome.
            </Text>
          </View>
          <View style={styles.infoBox}>
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
                <Text style={styles.textBox}>{item.key}</Text>
              )}
            />
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity
              onPress={() => setShowForm(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Form/>
      )}

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
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
  infoBox: {
    flexDirection: "row",
    ...Platform.select({
      ios: {
        paddingTop: 10,
        maxWidth: 600,
        minWidth: 500,
      },
      android: {
        paddingTop: 10,
        maxWidth: 600,
        minWidth: 500,
      },
      default: {
        paddingTop: "4rem",
        maxWidth: "60rem",
        minWidth: "50rem",
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
  container: {
    flex: 1,
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
  centre: {
    alignSelf: "center",
  },
  background: {
    position: "absolute",
    ...Platform.select({
      ios: {
        opacity: 0.1,
        width: 1000,
        height: 1000,
      },
      android: {
        opacity: 0.1,
        width: 1000,
        height: 1000,
      },
      default: {
        opacity: "10%",
        width: "100vw",
        height: "100vh",
      },
    }),
  },
});

const progBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  progressBar: {
    flexDirection: "row",
    height: 20,
    width: "80%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
});
