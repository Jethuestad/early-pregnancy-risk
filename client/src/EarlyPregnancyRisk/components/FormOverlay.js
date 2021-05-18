import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
} from "react-native";
import ReferenceList from "./RefrenceList";
import { isPhone, isTablet } from "../modules/Device";
const colors = require("../style/colors");

export default function FormOverlay({
  visible,
  setVisible,
  factor,
  lang_code,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      useNativeDriver={false}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ReferenceList
            factor_name={factor.factor}
            close={() => setVisible(false)}
            lang_code={lang_code}
          />
          <Pressable
            style={[styles.button]}
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.textStyle}>X</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0,
    width: "100%",
    height: "100%",
  },
  modalView: {
    justifyContent: "center",
    margin: 35,
    backgroundColor: "white",
    borderRadius: 20,
    ...Platform.select({
      web: {
        width: "80%",
        height: "80%",
      },
      default: {
        width: "100%",
        height: "100%",
      },
    }),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 30,
  },
  textStyle: {
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
