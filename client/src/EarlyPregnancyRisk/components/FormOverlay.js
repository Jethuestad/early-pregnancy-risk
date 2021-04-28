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
            style={[styles.button, styles.buttonClose]}
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.textStyle}>Close reference list</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0,
  },
  modalView: {
    justifyContent: "center",
    margin: 35,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: isTablet ? "2%" : "3%",
    paddingVertical: isTablet ? 20 : 0,
    ...Platform.select({
      web: {
        maxWidth: Platform.OS == "web" ? "60%" : "20%",
        maxHeight: Platform.OS == "web" ? "60%" : "20%",
      },
      default: {
        paddingVertical: 100,
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
    borderRadius: 6,
    padding: 15,
    elevation: 2,
    marginBottom: 30,
    marginTop: Platform.OS == "web" ? 30 : 2,
  },
  buttonOpen: {
    backgroundColor: colors.white,
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
