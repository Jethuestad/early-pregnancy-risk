import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableHighlight,
} from "react-native";
import { Text } from "react-native-elements";

const colors = require("../style/colors");

export function IntInput({ value, setValue, completed, maxDigits }) {
  return (
    <View style={styles.textInputContainer}>
      <View style={styles.textInputSpacer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => setValue(value.replace(/[^0-9]/g, ""))}
          numeric
          keyboardType="numeric"
          value={value}
          maxLength={maxDigits}
        ></TextInput>
      </View>
      <View style={styles.textInputButtonSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => (value == "" ? completed(false) : completed(true))}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export function BooleanInput({ setValue, completed }) {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => {
            setValue(true);
            completed();
          }}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.buttonSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => {
            setValue(false);
            completed();
          }}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export function SkipInput({ setSkipped, completed }) {
  return (
    <View style={styles.skipContainer}>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          setSkipped(true);
          completed(true);
        }}
      >
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignContent: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    color: colors.black,
    backgroundColor: colors.white,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  textInputSpacer: {
    flex: 1,
    width: 200,
    alignSelf: "center",
    justifyContent: "center",
  },
  textInputButtonSpacer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSpacer: { marginHorizontal: 20 },
  button: {
    elevation: 7,
    backgroundColor: colors.primary,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: 150,
    marginVertical: 5,
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
  skipContainer: {
    flex: 2,
  },
});
