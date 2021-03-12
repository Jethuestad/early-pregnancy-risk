import React from "react";
import Flag from "react-native-flags";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const colors = require("../style/colors");

export default function LanguageSelect({ setLang, language }) {
  const COUNTRY_CODES = require("../constants/CountryCodes");
  return (
    <View style={styles.container}>
      <View style={styles.languages}>
        <TouchableOpacity
          style={{
            backgroundColor:
              language == COUNTRY_CODES.english ? colors.primary : null,
            borderRadius: 5,
          }}
          onPress={() => setLang(COUNTRY_CODES.english)}
        >
          <Flag code="GB" size={32} style={styles.flag} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              language == COUNTRY_CODES.norwegian ? colors.primary : null,
            borderRadius: 5,
          }}
          onPress={() => setLang(COUNTRY_CODES.norwegian)}
        >
          <Flag code="NO" size={32} style={styles.flag} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              language == COUNTRY_CODES.french ? colors.primary : null,
            borderRadius: 5,
          }}
          onPress={() => setLang(COUNTRY_CODES.french)}
        >
          <Flag code="FR" size={32} style={styles.flag} />
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
    marginHorizontal: 5,
  },
});
