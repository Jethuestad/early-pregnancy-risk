import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { isPhone } from "../modules/Device";
const colors = require("../style/colors");

export default function LanguageSelect({
  setLang,
  language,
  isLoadingLanguage,
}) {
  const COUNTRY_CODES = require("../constants/CountryCodes");
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.languages}>
        <TouchableOpacity
          disabled={isLoadingLanguage}
          style={[
            language == COUNTRY_CODES.english ? styles.highlight : styles.none,
            styles.flag,
          ]}
          onPress={() => setLang(COUNTRY_CODES.english)}
        >
          <Image
            source={require("../assets/uk.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoadingLanguage}
          style={[
            language == COUNTRY_CODES.norwegian
              ? styles.highlight
              : styles.none,
            styles.flag,
          ]}
          onPress={() => setLang(COUNTRY_CODES.norwegian)}
        >
          <Image
            source={require("../assets/no.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoadingLanguage}
          style={[
            language == COUNTRY_CODES.french ? styles.highlight : styles.none,
            styles.flag,
          ]}
          onPress={() => setLang(COUNTRY_CODES.french)}
        >
          <Image
            source={require("../assets/fr.png")}
            style={{ width: 32, height: 32 }}
          />
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
  highlight: {
    borderColor: colors.primary,
    borderStyle: "solid",
    borderRadius: 32,
    padding: 2,
    borderWidth: 1,
  },
  none: {
    padding: 3,
  },
});
