import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet } from "react-native";
import ReferenceList from "./ReferenceList";
import Modal from "modal-react-native-web";
import {Button} from "react-native-web";
import colors from "../style/colors";

export default function FormOverlay({ factor, visible, setVisible }) {
  Modal.setAppElement("body");
  return (
    <View>
      {visible ? (
        Platform.OS === "web" ? (
          <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              presentationStyle={"pageSheet"}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ReferenceList
                  factor_name={factor.factor}
                  close={() => setVisible(false)}
                />
                <Button onPress={() => setVisible(false)} title={"Close ref"} color={colors.primary} />
              </View>
            </View>
          </Modal>
        ) : (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
              <View style={styles.centeredViewPhone}>
                <View style={styles.modalView}>
                  <ReferenceList
                      factor_name={factor.factor}
                      close={() => setVisible(false)}
                  />
                  <Button onPress={() => setVisible(false)} title={"Close ref"} color={"#BF3B29"} />
                </View>
              </View>
            </Modal>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    maxHeight: "50%",
  },
  centeredViewPhone: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 22,
    width: "80%",
    height: "90%"
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewPhone:{
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "90%"
  }
});