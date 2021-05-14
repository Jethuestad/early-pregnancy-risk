import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { TranslationContext } from "../contexts/TranslationContext";
import { postFactors } from "../networking/Requests";
import { isPhone, isTablet } from "../modules/Device";
import ComplicationProgressbar from "./ComplicationProgressBar";
import Loading from "./Loading";

const colors = require("../style/colors");

export default function Results({ data, skipped }) {
  const { width } = useWindowDimensions();
  const [risk, setRisk] = useState(null);
  const context = useContext(TranslationContext);

  const testResponse = {
    success: true,
    payload: [
      {
        complication: "TEST Gestational Diabetes Mellitus",
        severity: 0,
        severity_str: "Very Low",
        risk_str:
          "Less than 5% of pregnancies with your test results has this complication",
        risk_score: 53,
      },
      {
        complication: "TEST Preeclampsia",
        severity: 1,
        severity_str: "Low",
        risk_str:
          "Less than 15% of pregnancies with your test results has this complication",
        risk_score: 53,
      },
      {
        complication: "TEST Caesearean Delivery",
        severity: 2,
        severity_str: "Increased",
        risk_str:
          "Less than 30% of pregnancies with your test results has this complication",
        risk_score: 53,
      },
      {
        complication: "TEST Post-partum Depression",
        severity: 3,
        severity_str: "High",
        risk_str:
          "Less than 50% of pregnancies with your test results has this complication",
        risk_score: 53,
      },
      {
        complication: "TEST Stillbirth",
        severity: 4,
        severity_str: "Very High",
        risk_str:
          "More than 50% of pregnancies with your test results has this complication",
        risk_score: 53,
      },
    ],
  };
  function renderResponse(response) {
    return (
      <View style={styles(width).riskContainer}>
        {response.payload.map((item, index) => {
          return (
            <View key={index}>
              <View style={styles(width).complicationContainer}>
                <Text style={styles(width).complication}>
                  {item.complication}
                </Text>
                <ComplicationProgressbar
                  progress={item.severity}
                  total={4}
                  title={item.severity_str}
                />
                <View style={styles(width).subtextContainer}>
                  <Text style={styles(width).subtext}>{item.risk_str}</Text>
                </View>
              </View>
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
      <View style={styles(width).container}>
        <Loading message={context.loading_risk || "Calculating risk"} />
      </View>
    );
  }
  return (
    <View>
      {skipped > 0 ? (
        <View style={styles(width).skippedWarningContainer}>
          <Text style={styles(width).skippedWarningText}>
            {skipped == 1
              ? context.skipped_warning_singular ||
                "You skipped one question, this can affect your test results"
              : (
                  context.skipped_warning_plural ||
                  "You skipped %d questions, this can affect your test results"
                ).replace("%d", skipped)}
          </Text>
        </View>
      ) : null}
      <View style={styles(width).container}>{renderResponse(risk)}</View>
    </View>
  );
}

const styles = (width) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
    },
    riskContainer: {
      flex: 1,
      minWidth: isPhone(width) ? "95%" : isTablet(width) ? "80%" : "50%",
      flexDirection: "column",
      justifyContent: "center",
    },
    containerText: {
      flexDirection: "row",
      marginTop: 20,
    },
    complication: {
      fontSize: isTablet(width) ? 25 : 40,
      textTransform: "capitalize",
      textAlign: "center",
      fontWeight: "bold",
      color: colors.primary,
    },
    subtextContainer: {
      width: "80%",
      padding: 15,
      borderStyle: "solid",
      borderTopColor: "black",
      borderTopWidth: 1,
      alignSelf: "center",
    },
    subtext: {
      fontSize: 20,
    },
    complicationContainer: {
      marginHorizontal: 15,
      marginVertical: 10,
    },
    severity: {
      fontSize: 15,
    },
    skippedWarningContainer: {
      flex: 1,
      marginVertical: 20,
    },
    skippedWarningText: {
      textAlign: "center",
      fontSize: 20,
      margin: 5,
      color: colors.primary,
    },
  });
