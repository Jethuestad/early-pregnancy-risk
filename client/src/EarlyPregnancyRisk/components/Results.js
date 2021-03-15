import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getSeverity } from "../modules/Severity";
import { postFactors } from "../networking/Requests";
import Loading from "./Loading";

const colors = require("../style/colors");

export default function Form({ data }) {
  const [risk, setRisk] = useState(null);

  const testResponse = {
    success: true,
    payload: [
      {
        complication: "(Test) diabetes",
        severity: 4,
        risk_score: 53,
      },
      {
        complication: "(Test) Preeclampsia",
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
              <View style={styles.containerText}>
                <Text style={styles.complication}>{item.complication}</Text>
                <Text style={styles.severity}>
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
        if (response == null) {
          setRisk(testResponse);
        } else {
          setRisk(response);
        }
      })();
    }
  }, []);

  if (risk == null) {
    return (
      <View style={styles.container}>
        <Loading message={"Calculating risk..."} />
      </View>
    );
  }
  return <View style={styles.container}>{renderResponse(risk)}</View>;
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
  },
  containerText: {
    flexDirection: "row",
    marginTop: 20,
  },
  complication: {
    fontSize: 40,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: colors.primary,
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
