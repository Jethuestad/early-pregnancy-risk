import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { checkRequirement } from "../modules/FactorUtilities";
import { IntInput, BooleanInput, SkipInput } from "./Input";
import Progressbar from "../components/ProgressBar";
import { isPhone } from "../modules/Device";
import Loading from "./Loading";
import FormOverlay from "./FormOverlay";

const colors = require("../style/colors");

export default function Form({ changePage, factor_data, lang_code }) {
  const { width } = useWindowDimensions();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nr, setNr] = useState(0);
  const [factors, setFactors] = useState(factor_data);
  const [factorInteger, setFactorInteger] = useState("");
  const [factorBoolean, setFactorBoolean] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);

  function addSubFactors() {
    if (factors[nr].subfactors != null && factors[nr].requirement != null) {
      let shouldAdd = false;
      if (factors[nr].answertype === "integer") {
        shouldAdd = checkRequirement(
          factors[nr].requirement,
          factorInteger,
          "integer"
        );
      } else {
        shouldAdd = checkRequirement(
          factors[nr].requirement,
          factorBoolean,
          "boolean"
        );
      }
      if (shouldAdd) {
        let left = factors.slice(0, nr + 1);
        let right = factors.slice(nr + 1);
        left.concat(factors[nr].subfactors);
        left.concat(right);
        let temp = left.concat(factors[nr].subfactors, right);
        setFactors(temp);
      }
    }
  }

  function renderInput(type) {
    switch (type) {
      case "integer":
        return (
          <IntInput
            value={factorInteger}
            setValue={(v) => {
              setFactorInteger(v);
            }}
            completed={(b) => setIsSubmitting(b)}
            maxDigits={factors[nr].maxdigits}
            unit={factors[nr].unit}
          />
        );
      case "boolean":
        return (
          <BooleanInput
            setValue={(v) => setFactorBoolean(v)}
            completed={() => setIsSubmitting(true)}
          />
        );

      default:
        break;
    }
  }

  useEffect(() => {
    if (!isSubmitting) return;
    let tData = data;
    if (!skipped) {
      if (factors[nr].answertype === "integer") {
        tData[factors[nr].factor] = Number(factorInteger);
      } else {
        tData[factors[nr].factor] = factorBoolean;
      }
      setData(tData);
      addSubFactors();
    }
    setSkipped(false);
    setFactorInteger("");
    setIsSubmitting(false);
    setNr(nr + 1);
  }, [isSubmitting]);

  useEffect(() => {
    if (factors != null && nr >= factors.length) {
      changePage(data);
    }
  }, [nr]);

  if (factors == null) {
    return (
      <View style={styles(width).loading}>
        <Loading />
      </View>
    );
  } else if (nr >= factors.length) return null;

  return (
    <View style={styles(width).container}>
      <View style={styles(width).container}>
        <View style={styles(width).progressBarContainer}>
          <Progressbar progress={nr} total={factors.length} />
        </View>
        <View style={styles(width).questionContainer}>
          <Text style={styles(width).question}>{factors[nr].question}</Text>
        </View>
        <View style={styles(width).buttonContainer}>
          {renderInput(factors[nr].answertype)}
          {factors[nr].skippable ? (
            <SkipInput
              setSkipped={() => {
                setSkipped(true);
              }}
              completed={() => setIsSubmitting(true)}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.referencesContainer}>
        <FormOverlay
          visible={visible}
          setVisible={setVisible}
          factor={factors[nr]}
          lang_code={lang_code}
        />
        <Pressable onPress={() => setVisible(true)}>
          <Text style={styles(width).referenceButton}>
            Click to see why we need this information
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = (width) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: "stretch",
    },
    spacer: {
      flex: isPhone(width) ? 0 : 5,
    },
    progressBarContainer: {
      flex: isPhone(width) ? 1 : 2,
      alignItems: "center",
      justifyContent: "center",
    },
    questionContainer: {
      flex: isPhone(width) ? 3 : 2,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      flex: isPhone(width) ? 2 : 3,
      alignItems: "center",
      justifyContent: "center",
    },
    progressBar: {
      height: 20,
      width: "80%",
      backgroundColor: "white",
      borderColor: colors.black,
      borderWidth: 1,
      borderRadius: 10,
    },
    question: {
      color: colors.primary,
      fontWeight: "bold",
      textAlign: "center",
      marginHorizontal: "15%",
      ...Platform.select({
        web: {
          fontSize: isPhone(width) ? "1.5rem" : "2rem",
        },
        default: {
          fontSize: 25,
        },
      }),
    },
    loading: {
      flex: 1,
      alignSelf: "stretch",
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    referencesContainer: {
      flex: 0.5,
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    referenceButton: {
      fontSize: 20,
      marginVertical: 20,
      alignSelf: "center",
    },
  });
