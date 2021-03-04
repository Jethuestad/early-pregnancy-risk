import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableHighlight,
} from "react-native";

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
      <View style={styles.textInputSpacer}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
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
          underlayColor="#DDDDDD"
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
          underlayColor="#DDDDDD"
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
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: 200,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  textInputSpacer: {
    marginLeft: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonSpacer: { marginHorizontal: 20 },
  button: {
    elevation: 7,
    backgroundColor: "#BF1616",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: 150,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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
