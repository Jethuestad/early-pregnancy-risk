import React, { Component, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback, Animated,
} from "react-native";
import colors from "../style/colors";
import { postFactors } from "../networking/Requests";

export default function Form( props ) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nr, setNr] = useState(0);
  const [factorInteger, setFactorInteger] = useState(0);
  const [factorBoolean, setFactorBoolean] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [data, setData] = useState({});
  const Factors = require("../constants/Factors");
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(4,16666667);

  function prog(){
    if(progress < 100) {
      setProgress(progress + 4);
    }
  }


  useEffect(() => {
    if (!isSubmitting) return;
    let tData = data;
    if (skipped) {
      tData[Factors.factors[nr].factor] = "skipped";
    } else if (Factors.factors[nr].answertype === "int") {
      tData[Factors.factors[nr].factor] = factorInteger;
    } else {
      tData[Factors.factors[nr].factor] = factorBoolean;
    }
    prog()
    setData(tData);
    setIsSubmitting(false);
    setNr(nr + 1);
  }, [isSubmitting]);

  useEffect(() => {

    if (nr >= Factors.factors.length) {
      postFactors(data);
    }
  }, [nr]);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
      <View style={styles.main_container}>
        {nr < Factors.factors.length && !isSubmitting ?

        <View style={progBarStyles.container}>
          <View style={progBarStyles.progressBar}>
            <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: "#8BED4F", width },
                ]}
            />
          </View>
          <Text>{`${progress}%`}</Text>
        </View>
            : null}

        <View style={styles.container}>
          {nr < Factors.factors.length && !isSubmitting ? (
            <View>
              <Text style={[styles.question, colors.primary]}>
                {Factors.factors[nr].factor}
              </Text>
              {/* NUMERICAL*/}
              {Factors.factors[nr].answertype === "int" ? (
                <View>
                  <TextInput
                    style={styles.textinput}
                    onChangeText={(value) => setFactorInteger(value)}
                    numeric
                    keyboardType="numeric"
                    defaultValue=""
                    maxLength={2}
                  ></TextInput>
                  <TouchableHighlight
                    style={styles.appInputButtons}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => setIsSubmitting(true)}
                  >
                    <Text style={styles.textTitleBtn}>Continue</Text>
                  </TouchableHighlight>
                </View>
              ) : null}
              {/* YES or NO*/}
              {Factors.factors[nr].answertype === "boolean" ? (
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.space} />
                  <TouchableHighlight
                    style={styles.appInputButtons}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => {
                      setFactorBoolean(true);
                      setIsSubmitting(true);
                    }}
                  >
                    <Text style={styles.textTitleBtn}>No</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.appInputButtons}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => {
                      setFactorBoolean(false);
                      setIsSubmitting(true);
                    }}
                  >
                    <Text style={styles.textTitleBtn}>Yes</Text>
                  </TouchableHighlight>
                </View>
              ) : null}
              {/* Need to handle skip as "default values" some way*/}
              <TouchableHighlight
                style={styles.appInputButtons}
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
      </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "auto",
  },
  question: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
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
  },
  appInputButtons: {
    elevation: 7,
    backgroundColor: "#E15A46",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxWidth: 150,
    minWidth: 150,
    alignSelf: "center",
  },
  textTitleBtn: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 4,
  },
  skipBtn: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 4,
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
    borderWidth: 2,
    borderRadius: 5,
  },
});
