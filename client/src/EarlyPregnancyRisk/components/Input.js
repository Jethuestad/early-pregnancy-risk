import React from "react";
import {
  StyleSheet,
  Platform,
  TouchableHighlight,
} from "react-native";
import {
  Divider,
  Text,
  Input,
} from "react-native-elements"

const colors = require("../style/colors");

export function IntInput({ value, setValue, completed, maxDigits }) {
  return (
    <Divider style={styles.textInputContainer}>
      <Divider style={styles.textInputSpacer}>
        <Input
          style={styles.textInput}
          onChangeText={(value) => setValue(value.replace(/[^0-9]/g, ""))}
          numeric
          keyboardType="numeric"
          value={value}
          maxLength={maxDigits}
        ></Input>
      </Divider>
      <Divider style={styles.textInputSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor={colors.secondary}
          onPress={() => (value == "" ? completed(false) : completed(true))}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
      </Divider>
    </Divider>
  );
}

export function BooleanInput({ setValue, completed }) {
  return (
    <Divider style={styles.buttonContainer}>
      <Divider style={styles.buttonSpacer}>
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
      </Divider>
      <Divider style={styles.buttonSpacer}>
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
      </Divider>
    </Divider>
  );
}

export function SkipInput({ setSkipped, completed }) {
  return (
    <Divider style={styles.skipContainer}>
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
    </Divider>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: "#F8EAE8",
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent:"center",
  },
  textInput: {
    width: 200,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    color: colors.black,
    backgroundColor: colors.white,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  textInputSpacer: {
    marginLeft: 20,
  },
  buttonContainer: {
    backgroundColor: "#F8EAE8",
    flex: 1,
    flexDirection: "row",
  },
  buttonSpacer: { marginHorizontal: 20 },
  button: {
    elevation: 7,
    backgroundColor: colors.primary,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: 150,
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
    backgroundColor: "#F8EAE8",
    flex: 2,
  },
});
