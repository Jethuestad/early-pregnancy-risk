import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import ReferenceList from "./ReferenceList";
import Modal from "modal-react-native-web";

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
          >
            <ReferenceList
              factor_name={factor.factor}
              close={() => setVisible(false)}
            />
          </Modal>
        ) : (
          <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
          >
            <ReferenceList
              factor_name={factor.factor}
              close={() => setVisible(false)}
            />
          </Modal>
        )
      ) : null}
    </View>
  );
}
