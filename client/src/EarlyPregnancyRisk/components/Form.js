import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform } from "react-native";
import {
  Divider,
  Button,
  Overlay,
  Text,
} from 'react-native-elements';
import { checkRequirement } from "../modules/FactorUtilities";
import { IntInput, BooleanInput, SkipInput } from "./Input";
import Progressbar from "../components/Progressbar";
import ReferenceList from "./ReferenceList";

const colors = require("../style/colors");

export default function Form({ changePage }) {
  const Factors = require("../constants/Factors");


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nr, setNr] = useState(0);
  const [factors, setFactors] = useState(Factors.factors);
  const [factorInteger, setFactorInteger] = useState("");
  const [factorBoolean, setFactorBoolean] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function addSubFactors() {
    if (factors[nr].subfactors != null && factors[nr].requirement != null) {
      let shouldAdd = false;
      if (factors[nr].answertype === "int") {
        shouldAdd = checkRequirement(
          factors[nr].requirement,
          factorInteger,
          "int"
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
      case "int":
        return (
          <IntInput
            value={factorInteger}
            setValue={(v) => {
              setFactorInteger(v);
            }}
            completed={(b) => setIsSubmitting(b)}
            maxDigits={factors[nr].maxdigits}
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
      if (factors[nr].answertype === "int") {
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
    if (nr >= factors.length) {
      changePage(data);
    }
  }, [nr]);

  return (
    <Divider style={styles.container}>
      {nr < factors.length ? (
        <Divider style={styles.container}>
          <Divider style={styles.progressBarContainer}>
            <Progressbar progress={nr} total={factors.length} />
          </Divider>
          <Divider style={styles.questionContainer}>
            <Text style={styles.question}>{factors[nr].question}</Text>

            <Button title="See documentation" onPress={toggleOverlay} type="clear" titleStyle={{color: colors.primary}} />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <ReferenceList refNumb={factors[nr].ref}/>
            </Overlay>

          </Divider>
          <Divider style={styles.buttonContainer}>
            {renderInput(factors[nr].answertype)}
            {factors[nr].skippable ? (
              <SkipInput
                setSkipped={() => {
                  setSkipped(true);
                }}
                completed={() => setIsSubmitting(true)}
              />
            ) : null}
          </Divider>
          <Divider style={styles.spacer}></Divider>
        </Divider>
      ) : (
        <Text>Loading...</Text>
      )}
    </Divider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8EAE8",
    flex: 1,
    alignSelf: "stretch",
  },
  spacer: {
    backgroundColor: "#F8EAE8",
    flex: 5,
  },
  progressBarContainer: {
    backgroundColor: "#F8EAE8",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  questionContainer: {
    backgroundColor: "#F8EAE8",
    flex: 2,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#F8EAE8",
    flex: 3,
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
        fontSize: "2rem",
      },
      default: {
        fontSize: 25,
      },
    }),
  },
  button: {
    color: colors.primary,
    fontWeight: "bold",
    marginHorizontal: "15%",
    ...Platform.select({
      web: {
        fontSize: "2rem",
      },
      default: {
        fontSize: 25,
      },
    }),
  },
});
