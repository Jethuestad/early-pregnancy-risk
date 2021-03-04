import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getSeverity } from "../modules/Severity";
import { postFactors } from "../networking/Requests";
import colors from "../style/colors";

export default function Form({ data }) {
  const [risk, setRisk] = useState();

  const testResponse = {
    success: true,
    payload: [
      {
        complication: "diabetes",
        severity: 4,
        risk_score: 53,
      },
      {
        complication: "Preeclampsia",
        severity: 2,
        risk_score: 21,
      },
    ],
  };
  function renderResponse(response) {
    return (
      <View style={styles.riskContainer}>
        {response.payload.map((item, index) => {
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
    );
  }

  useEffect(() => {
    if (data != null && risk == null) {
      (async function () {
        const response = await postFactors(data);
        setRisk(response);
      })();
    }
  });

  return (
    <View style={styles.container}>
      {risk != null ? (
        renderResponse(risk)
      ) : (
        <View style={styles.container}>
          <Text>This is a test response</Text>
          {renderResponse(testResponse)}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  riskContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
