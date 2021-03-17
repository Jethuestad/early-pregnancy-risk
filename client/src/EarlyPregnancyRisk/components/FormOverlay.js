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
                <Overlay
                    ModalComponent={Modal}
                    onBackdropPress={() => setVisible(false)}
                    overlayStyle={{ width: "60%", minHeight: "50%" }}
                >
                  <ReferenceList
                      factor_name={factor.factor}
                      close={() => setVisible(false)}
                  />
                </Overlay>
            ) : (
                <Overlay
                    onBackdropPress={() => setVisible(false)}
                    overlayStyle={{ width: "80%", height: "90%" }}
                >
                  <ReferenceList
                      factor_name={factor.factor}
                      close={() => setVisible(false)}
                  />
                </Overlay>
            )
        ) : null}
      </View>
  );
}