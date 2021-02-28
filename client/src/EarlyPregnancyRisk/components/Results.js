import React, { Component, useState, useEffect } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import { getSeverity } from "../constants/Severity";
import colors from "../style/colors";

export default function Form(props) {
  return (
    <View style={styles.container}>
      {props.risk != null ? (
        <View>
          <View>
            {props.risk.payload.map((item, index) => {
              return (
                <View key={index}>
                  <View style={[styles.containerText]}>
                    <Text style={[colors.primary, styles.complication]}>
                      {item.complication}
                    </Text>
                    <Text style={[styles.severity]}>
                      {getSeverity(item.severity)}
                    </Text>
                  </View>
                  <Text style={[styles.score]}>
                    Your risk score is {item.risk_score}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <Text>No response</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerText: {
    flexDirection: "row",
    marginTop: 20,
  },
  complication: {
    fontSize: 40,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  severity: {
    fontSize: 30,
    textTransform: "capitalize",
    marginLeft: 20,
    marginTop: 10,
  },
  score: {
    fontSize: 20,
  },
});
