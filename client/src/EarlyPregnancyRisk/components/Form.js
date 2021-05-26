import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { checkRequirement } from "../modules/FactorUtilities";
import {
  IntInput,
  BooleanInput,
  SkipInput,
  MultipleInput,
  BackInput,
  CategoryInput,
} from "./Input";
import Progressbar from "./Progressbar";
import { isPhone } from "../modules/Device";
import Loading from "./Loading";
import FormOverlay from "./FormOverlay";

const colors = require("../style/colors");

export default function Form({ changePage, factor_data, lang_code }) {
  const { width } = useWindowDimensions();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nr, setNr] = useState(0);
  const [factors, setFactors] = useState(factor_data);
  const [totalFactors, setTotalFactors] = useState(0);
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [totalSkipped, setTotalSkipped] = useState([]);

  // [type, value]
  const [inputController, setInputController] = useState([null, null]);

  function countFactors(f, n) {
    f.forEach((v) => {
      n += 1;
      if (v.subfactors != null && v.answertype == "category") {
        n = countFactors(v.subfactors, n);
      }
    });
    return n;
  }

  useEffect(() => {
    setTotalFactors(countFactors(factors, 0));
  }, []);

  // TODO: Only add if they don't already exist
  function addSubFactors() {
    if (factors[nr].subfactors != null) {
      let shouldAdd = false;
      if (factors[nr].answertype === "integer") {
        shouldAdd = checkRequirement(
          factors[nr].requirement,
          inputController[1],
          "integer"
        );
      } else if (factors[nr].answertype === "multiple") {
        shouldAdd = checkRequirement(
          factors[nr].requirement,
          inputController[1],
          "integer"
        );
      } else if (factors[nr].answertype === "boolean") {
        shouldAdd = checkRequirement(
          factors[nr].requirement,
          inputController[1],
          "boolean"
        );
      } else if (factors[nr].answertype === "category") {
        shouldAdd = true;
      }

      if (shouldAdd) {
        //remove null values first
        let subfactors = factors[nr].subfactors.filter(
          (el) => el != null && !factors.includes(el)
        );
        if (factors[nr].answertype !== "category") {
          setTotalFactors((v) => v + subfactors.length);
        }
        let left = factors.slice(0, nr + 1);
        let right = factors.slice(nr + 1);
        left.concat(subfactors);
        left.concat(right);
        let temp = left.concat(subfactors, right);
        setFactors(temp);
      }
    }
  }

  function renderInput(type) {
    switch (type) {
      case "integer":
        return (
          <IntInput
            maxDigits={factors[nr].maxdigits}
            unit={factors[nr].unit}
            setInput={(v) => {
              setInputController(["integer", v]);
              setIsSubmitting(true);
            }}
          />
        );

      case "boolean":
        return (
          <BooleanInput
            setInput={(v) => {
              setInputController(["boolean", v]);
              setIsSubmitting(true);
            }}
          />
        );
      case "multiple":
        return (
          <MultipleInput
            values={factors[nr].values || []}
            setInput={(v) => {
              setInputController(["multiple", v]);
              setIsSubmitting(true);
            }}
          />
        );
      case "category":
        return (
          <CategoryInput
            setInput={(v) => {
              setInputController(["category", v]);
              setIsSubmitting(true);
            }}
          />
        );
      default:
        break;
    }
  }

  useEffect(() => {
    if (!isSubmitting) return;

    if (inputController[0] == "category") {
      addSubFactors();
    } else if (inputController[0] == "back") {
      setNr((n) => (n - 1 > 0 ? n - 1 : 0));
      setInputController([null, null]);
      setIsSubmitting(false);
      return;
    } else if (inputController[0] == "skip") {
      let tData = data;
      delete tData[factors[nr].factor];
      setData(tData);
    } else {
      let tData = data;
      tData[factors[nr].factor] = inputController[1];
      setTotalSkipped((s) => {
        const index = s.indexOf(factors[nr].factor);
        if (index > -1) {
          s.splice(index, 1);
        }
        return s;
      });
      setData(tData);
      addSubFactors();
    }
    setInputController([null, null]);
    setIsSubmitting(false);
    setNr(nr + 1);
  }, [isSubmitting]);

  useEffect(() => {
    if (factors != null && nr >= factors.length) {
      changePage(data, totalSkipped);
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
      <View style={styles(width).progressBarContainer}>
        <Progressbar progress={nr} total={totalFactors} />
      </View>
      <View style={styles(width).questionContainer}>
        <Text style={styles(width).question}>{factors[nr].question}</Text>
      </View>
      <View style={styles(width).buttonContainer}>
        {renderInput(factors[nr].answertype)}
      </View>
      <View style={styles(width).staticButtonContainer}>
        {nr > 0 ? (
          <BackInput
            setInput={() => {
              setInputController(["back", null]);
              setIsSubmitting(true);
            }}
          />
        ) : null}
        {factors[nr].skippable ? (
          <SkipInput
            setInput={() => {
              setInputController(["skip", null]);
              setTotalSkipped((s) => {
                s.push(factors[nr].factor);
                let l = [...new Set(s)];
                return l;
              });
              setIsSubmitting(true);
            }}
          />
        ) : null}
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
    container: {},
    inputContainer: {},
    spacer: {},
    progressBarContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    questionContainer: {
      minHeight: isPhone(width) ? 200 : 300,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    staticButtonContainer: {
      minHeight: 100,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
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
          fontSize: isPhone(width) ? "1.3rem" : "2rem",
        },
        default: {
          fontSize: 25,
        },
      }),
    },
    loading: {
      alignSelf: "stretch",
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    referencesContainer: {
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    referenceButton: {
      marginVertical: 20,
      alignSelf: "center",
      fontSize: isPhone(width) ? 13 : 20,
    },
  });
