import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableHighlight,
  useWindowDimensions,
} from "react-native";
import { TranslationContext } from "../contexts/TranslationContext";
import { isPhone } from "../modules/Device";

const colors = require("../style/colors");

export function IntInput({ value, setValue, completed, maxDigits, unit }) {
  const context = useContext(TranslationContext);
  const { width } = useWindowDimensions();

  return (
    <View style={styles(width).textInputContainer}>
      <View style={styles(width).textInputSpacer}>
        <TextInput
          style={styles(width).textInput}
          onChangeText={(value) => setValue(value.replace(/[^0-9]/g, ""))}
          numeric
          keyboardType="numeric"
          value={value}
          maxLength={maxDigits}
        ></TextInput>
        <Text style={styles(width).unit}>{unit}</Text>
      </View>
      <View style={styles(width).textInputSpacer}>
        <TouchableHighlight
          style={styles(width).button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => (value == "" ? completed(false) : completed(true))}
        >
          <Text style={styles(width).buttonText}>
            {context.button_continue || "Continue"}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export function BooleanInput({ setValue, completed }) {
  const context = useContext(TranslationContext);
  const { width } = useWindowDimensions();
  return (
    <View style={styles(width).buttonContainer}>
      <View style={styles(width).buttonSpacer}>
        <TouchableHighlight
          style={styles(width).button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => {
            setValue(true);
            completed();
          }}
        >
          <Text style={styles(width).buttonText}>
            {context.button_yes || "Yes"}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles(width).buttonSpacer}>
        <TouchableHighlight
          style={styles(width).button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => {
            setValue(false);
            completed();
          }}
        >
          <Text style={styles(width).buttonText}>
            {context.button_no || "No"}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export function SkipInput({ setSkipped, completed }) {
  const context = useContext(TranslationContext);
  const { width } = useWindowDimensions();
  return (
    <View style={styles(width).staticButtonContainer}>
      <TouchableHighlight
        style={[styles(width).button, styles(width).staticButton]}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          setSkipped(true);
          completed(true);
        }}
      >
        <Text style={styles(width).buttonText}>
          {context.button_skip || "Skip"}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export function BackInput({ setGoBack, completed }) {
  const context = useContext(TranslationContext);
  const { width } = useWindowDimensions();
  return (
    <View style={styles(width).staticButtonContainer}>
      <TouchableHighlight
        style={[styles(width).button, styles(width).staticButton]}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          setGoBack(true);
          completed(true);
        }}
      >
        <Text style={styles(width).buttonText}>
          {context.button_previous || "Previous"}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export function MultipleInput({ setValue, completed, values }) {
  // const context = useContext(TranslationContext);
  const { width } = useWindowDimensions();
  return (
    <View style={styles(width).multipleContainer}>
      {values.map((value, index) => (
        <TouchableHighlight
          key={index}
          style={[styles(width).button, styles(width).choiceButton]}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            setValue(value[1]);
            completed();
          }}
        >
          <Text style={styles(width).buttonText}>{value[0] || ""}</Text>
        </TouchableHighlight>
      ))}
    </View>
  );
}

const styles = (width) =>
  StyleSheet.create({
    textInputContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      width: 200,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.black,
      color: colors.black,
      backgroundColor: colors.white,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    textInputSpacer: {
      marginLeft: 20,
      flexDirection: "row",
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonSpacer: { marginHorizontal: 5 },
    button: {
      elevation: 7,
      backgroundColor: colors.primary,
      borderRadius: 7,
      paddingHorizontal: 10,
      paddingVertical: 12,
      width: 150,
    },
    choiceButton: {
      backgroundColor: colors.primary,
      margin: 5,
    },
    staticButton: {
      backgroundColor: colors.grey,
    },
    multipleContainer: {
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      width: isPhone(width) ? "80%" : "50%",
    },
    buttonText: {
      fontWeight: "bold",
      textAlign: "center",
      color: colors.white,
      ...Platform.select({
        web: {
          fontSize: "1rem",
        },
        default: {
          fontSize: 18,
        },
      }),
    },
    staticButtonContainer: {
      margin: 5,
    },
    unit: {
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "center",
      marginLeft: 5,
    },
  });
