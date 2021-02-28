import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import Results from "./Results";
import colors from "../style/colors";
import { postFactors } from "../networking/Requests";

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nr, setNr] = useState(0);
  const [factorInteger, setFactorInteger] = useState("");
  const [factorBoolean, setFactorBoolean] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [data, setData] = useState({});
  const Factors = require("../constants/Factors");
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    if (!isSubmitting) return;
    let tData = data;
    if (!skipped) {
      if (Factors.factors[nr].answertype === "int") {
        tData[Factors.factors[nr].factor] = Number(factorInteger);
      } else {
        tData[Factors.factors[nr].factor] = factorBoolean;
      }
      setData(tData);
    }
    setSkipped(false);
    setFactorInteger("");
    setIsSubmitting(false);
    setNr(nr + 1);
  }, [isSubmitting]);

  useEffect(() => {
    if (nr >= Factors.factors.length) {
      (async function () {
        const response = await postFactors(data);
        setRisk(response);
      })();
    }
  }, [nr]);

  return (
    <View style={styles.container}>
      {risk != null ? (
        <Results risk={risk} />
      ) : (
        <View>
          {nr < Factors.factors.length && !isSubmitting ? (
            <View>
              <Text style={[styles.question, colors.primary]}>
                {Factors.factors[nr].question}
              </Text>
              <View style={styles.spacing} />
              {/* NUMERICAL*/}
              {Factors.factors[nr].answertype === "int" ? (
                <View>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={(value) =>
                      setFactorInteger(value.replace(/[^0-9]/g, ""))
                    }
                    numeric
                    keyboardType="numeric"
                    defaultValue=""
                    value={factorInteger}
                    maxLength={Factors.factors[nr].maxdigits}
                  ></TextInput>
                  <View style={styles.spacingBtn} />
                  <TouchableHighlight
                    style={styles.inputBtn}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() =>
                      factorInteger == ""
                        ? setIsSubmitting(false)
                        : setIsSubmitting(true)
                    }
                  >
                    <Text style={styles.textTitleBtn}>Continue</Text>
                  </TouchableHighlight>
                </View>
              ) : null}
              {/* YES or NO*/}
              {Factors.factors[nr].answertype === "boolean" ? (
                <View style={styles.spacingBtn}>
                  <View>
                    <TouchableHighlight
                      style={styles.inputBtn}
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        setFactorBoolean(false);
                        setIsSubmitting(true);
                      }}
                    >
                      <Text style={styles.textTitleBtn}>No</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.spacingBtn} />
                  <View>
                    <TouchableHighlight
                      style={styles.inputBtn}
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        setFactorBoolean(true);
                        setIsSubmitting(true);
                      }}
                    >
                      <Text style={styles.textTitleBtn}>Yes</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              ) : null}
              {/* Need to handle skip as "default values" some way*/}
              <View style={styles.spacingBtn} />
              <TouchableHighlight
                style={styles.inputBtn}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => {
                  setSkipped(true);
                  setIsSubmitting(true);
                }}
              >
                <Text style={styles.skipBtn}>Skip</Text>
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "auto",
  },
  question: {
    fontWeight: "bold",
    paddingBottom: 20,
    borderColor: "#FFFFFF",
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontSize: 22,
      },
      android: {
        fontSize: 22,
      },
      default: {
        borderWidth: 150,
        fontSize: "2rem",
      },
    }),
  },
  textinput: {
    width: 200,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    alignSelf: "center",
  },
  inputBtn: {
    elevation: 7,
    backgroundColor: "#E15A46",
    borderRadius: 7,
    alignSelf: "center",
    ...Platform.select({
      ios: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        maxWidth: 150,
        minWidth: 150,
      },
      android: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        maxWidth: 150,
        minWidth: 150,
      },
      default: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        maxWidth: 150,
        minWidth: 150,
      },
    }),
  },
  textTitleBtn: {
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 4,
    ...Platform.select({
      ios: {
        fontSize: 18,
      },
      android: {
        fontSize: 18,
      },
      default: {
        fontSize: "1rem",
      },
    }),
  },
  skipBtn: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginVertical: 4,
    ...Platform.select({
      ios: {
        fontSize: 18,
      },
      android: {
        fontSize: 18,
      },
      default: {
        fontSize: "1rem",
      },
    }),
  },
  spacingBtn: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "center",
  },
  spacing: {
    flexDirection: "row",
    ...Platform.select({
      ios: {
        paddingVertical: 20,
      },
      android: {
        paddingVertical: 20,
      },
      default: {
        paddingVertical: 2,
      },
    }),
  },
});
