import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../style/colors";
import { postFactors } from "../networking/Requests";

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nr, setNr] = useState(0);
  const [factorInteger, setFactorInteger] = useState(0);
  const [factorBoolean, setFactorBoolean] = useState(false);
  const [data, setData] = useState({});
  const Factors = require("../constants/Factors");

  useEffect(() => {
    if (!isSubmitting) return;
    let tData = data;
    if (Factors.factors[nr].answertype === "int") {
      tData[Factors.factors[nr].factor] = factorInteger;
    } else {
      tData[Factors.factors[nr].factor] = factorBoolean;
    }
    setData(tData);
    setIsSubmitting(false);
    setNr(nr + 1);
  }, [isSubmitting]);

  useEffect(() => {
    if (nr >= Factors.factors.length) {
      postFactors(data);
    }
  }, [nr]);

  return (
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
            <View style={{ flexDirection:"row"}}>
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
              {/* Need to handle skip as "default values" some way*/}
              {/*
              <TouchableHighlight
              style={styles.appInputButtons}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => {
                  setFactorBoolean(false);
                  setIsSubmitting(true);
                }}
              >
                <Text style={styles.skipBtn}>Skip</Text>
              </TouchableHighlight>
              */}
            </View>
          ) : null}
        </View>
      ) : null}
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
    minWidth:150,
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
