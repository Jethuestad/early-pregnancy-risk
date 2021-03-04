import React, { Component, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  Animated,
} from "react-native";
import Results from "./Results";
import colors from "../style/colors";
import { postFactors } from "../networking/Requests";
import { checkRequirement } from "../modules/FactorUtilities";

export default function Form() {
  const Factors = require("../constants/Factors");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nr, setNr] = useState(0);
  const [factors, setFactors] = useState(Factors.factors);
  const [factorInteger, setFactorInteger] = useState("");
  const [factorBoolean, setFactorBoolean] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [data, setData] = useState({});
  const [risk, setRisk] = useState(null);


  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(1);

  function prog(){
    if(progress < factors.length) {
      setProgress(progress + 1);
    }
  }

  const TestResponse = {
    success: true,
    payload: [
      {
        complication: "diabetes",
        severity: 4,
        risk_score: 53,
      },
      {
        complication: "diabetes",
        severity: 4,
        risk_score: 53,
      },
    ],
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
    prog()
    setSkipped(false);
    setFactorInteger("");
    setIsSubmitting(false);
    setNr(nr + 1);
  }, [isSubmitting]);

  useEffect(() => {
    if (nr >= factors.length) {
      (async function () {
        const response = await postFactors(data);
        setRisk(response);
      })();
    }
  }, [nr]);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: factors.length,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, factors.length],
    outputRange: ["0%","100%"],
    extrapolate: "clamp",
  });

  return (
      <View style={styles.main_container}>
        {nr < factors.length ?

            <View style={progBarStyles.container}>
              <View style={progBarStyles.progressBar}>
                <Animated.View
                    style={[
                      StyleSheet.absoluteFill,
                      { backgroundColor: "#E15A46", width },
                    ]}
                />
              </View>
              <Text styles={{fontSize:15}}>{`${progress}/24`}</Text>
            </View>
            : null}

        <View style={styles.container}>
          {risk != null ? (
              <Results risk={risk} />
          ) : (
              <View>
                {nr < factors.length ? (
                    <View>
                      <Text style={[styles.question, colors.primary]}>
                        {factors[nr].question}
                      </Text>
                      <View style={styles.spacing} />
                      {/* NUMERICAL*/}
                      {factors[nr].answertype === "int" ? (
                          <View>
                            <TextInput
                                style={styles.textinput}
                                onChangeText={(value) =>
                                    setFactorInteger(value.replace(/[^0-9]/g, ""))
                                }
                                numeric
                                keyboardType="numeric"
                                value={factorInteger}
                                maxLength={factors[nr].maxdigits}
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
                      {factors[nr].answertype === "boolean" ? (
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
                      {factors[nr].skippable ? (
                          <View>
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
                ) : (
                    <View>
                      {Platform.OS !== "web" ? (
                          <View>
                            <Results risk={TestResponse} />
                            <Text>
                              This is a test response, it does not come from the server.
                            </Text>
                          </View>
                      ) : (
                          <Text>Loading...</Text>
                      )}
                    </View>
                )}
              </View>
          )}
        </View>
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
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontSize: 22,
      },
      android: {
        fontSize: 22,
      },
      default: {
        margin: 150,
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
    backgroundColor: "#BF1616",
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
    color: "white",
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
    color: "white",
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

const progBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    maxHeight: 40
  },
  progressBar: {
    flexDirection: "row",
    height: 20,
    width: "80%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
});