import React from "react";
import Flag from "react-native-flags";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import LanguageSelect from "./LanguageSelect";

const colors = require("../style/colors");

export default function Header({ changePage, setLang, language }) {
  const COUNTRY_CODES = require("../constants/CountryCodes");
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => changePage()}>
        Early Pregnancy Risk
      </Text>
      <LanguageSelect setLang={setLang} language={language} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    ...Platform.select({
      web: {
        alignItems: "center",
        marginTop: 20,
        paddingBottom: 20,
        borderBottomColor: "black",
        borderBottomWidth: 2,
      },
      default: {
        alignSelf: "center",
        marginTop: 40,
      },
    }),
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    ...Platform.select({
      web: {
        fontSize: 50,
      },
      default: {
        fontSize: 30,
      },
    }),
  },
});
