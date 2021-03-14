import React from "react";
import Flag from "react-native-flags";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { isPhone } from "../modules/Device";

const colors = require("../style/colors");

export default function LanguageSelect({ setLang, language }) {
  const COUNTRY_CODES = require("../constants/CountryCodes");
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.languages}>
        <TouchableOpacity
          style={
            language == COUNTRY_CODES.english ? styles.highlight : styles.none
          }
          onPress={() => setLang(COUNTRY_CODES.english)}
        >
          <Flag code="GB" size={isPhone(width) ? 24 : 32} style={styles.flag} />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            language == COUNTRY_CODES.norwegian ? styles.highlight : styles.none
          }
          onPress={() => setLang(COUNTRY_CODES.norwegian)}
        >
          <Flag code="NO" size={isPhone(width) ? 24 : 32} style={styles.flag} />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            language == COUNTRY_CODES.french ? styles.highlight : styles.none
          }
          onPress={() => setLang(COUNTRY_CODES.french)}
        >
          <Flag code="FR" size={isPhone(width) ? 24 : 32} style={styles.flag} />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            language == COUNTRY_CODES.spanish ? styles.highlight : styles.none
          }
          onPress={() => setLang(COUNTRY_CODES.spanish)}
        >
          <Flag code="ES" size={isPhone(width) ? 24 : 32} style={styles.flag} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  languages: {
    flexDirection: "row",
    right: 0,
    margin: 10,
  },
  flag: {
    marginHorizontal: 10,
  },
  highlight: {
    borderColor: colors.primary,
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  none: {
    paddingBottom: 1,
  },
});
