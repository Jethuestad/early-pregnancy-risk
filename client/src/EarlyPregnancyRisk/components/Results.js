import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { TranslationContext } from "../contexts/TranslationContext";
import { postFactors } from "../networking/Requests";
import { isPhone } from "../modules/Device";
import ComplicationProgressbar from "./ComplicationProgressBar";
import Loading from "./Loading";

const colors = require("../style/colors");

export default function Results({ data }) {
  const { width } = useWindowDimensions();
  const [risk, setRisk] = useState(null);
  const context = useContext(TranslationContext);

  const testResponse = {
    success: true,
    payload: [
      {
        complication: "Gestational Diabetes Mellitus",
        severity: 0,
        severity_str: "Very Low",
        risk_str: ">50 % of pregancies",
        risk_score: 53,
      },
      {
        complication: "Preeclampsia",
        severity: 1,
        severity_str: "Low",
        risk_str: ">50 % of pregancies",
        risk_score: 53,
      },
      {
        complication: "Caesearean Delivery",
        severity: 2,
        severity_str: "Increased",
        risk_str: ">50 % of pregancies",
        risk_score: 53,
      },
      {
        complication: " Post-partum Depression",
        severity: 3,
        severity_str: "High",
        risk_str: ">50 % of pregancies",
        risk_score: 53,
      },
      {
        complication: "Stillbirth",
        severity: 4,
        severity_str: "Very High",
        risk_str: ">50 % of pregancies",
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
        <Loading message={context.loading_risk || ""} />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles(width).container}>{renderResponse(risk)}</View>
    </ScrollView>
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
      flexDirection: "column",
      justifyContent: "center",
    },
    containerText: {
      flexDirection: "row",
      marginTop: isPhone(width) ? 15 : 20,
    },
    complication: {
      fontSize: 40,
      textTransform: "capitalize",
      textAlign: "center",
      fontWeight: "bold",
      color: colors.primary,
    },
    complicationContainer: {
      marginHorizontal: 15,
      marginVertical: 10,
    },
    severity: {
      fontSize: 15,
    },
  });
