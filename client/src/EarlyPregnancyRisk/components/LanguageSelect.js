import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { isPhone } from "../modules/Device";
const colors = require("../style/colors");

export default function LanguageSelect({
  setLang,
  language,
  languages,
  isLoadingLanguage,
}) {
  const COUNTRY_CODES = require("../constants/CountryCodes");
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.languages}>
        <View>
          <TouchableOpacity
            disabled={isLoadingLanguage}
            style={[
              language == COUNTRY_CODES.english
                ? styles.highlight
                : styles.none,
              styles.flag,
            ]}
            onPress={() => setLang(COUNTRY_CODES.english)}
          >
            <Text
              style={{
                textAlign: "center",
                color:
                  language == COUNTRY_CODES.english
                    ? colors.primary
                    : colors.black,
              }}
            >
              {COUNTRY_CODES.english.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        {languages.map((value, index) => (
          <View key={index}>
            <TouchableOpacity
              disabled={isLoadingLanguage}
              style={[
                language == value.country_code ? styles.highlight : styles.none,
                styles.flag,
              ]}
              onPress={() => setLang(value.country_code)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color:
                    language == value.country_code
                      ? colors.primary
                      : colors.black,
                }}
              >
                {value.country_code.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {language != COUNTRY_CODES.english ? (
        <View style={{ width: "80%" }}>
          <Text
            style={{
              color: "red",
              fontSize: 15,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            DISCLAIMER: This language may have problematic translations, and
            should only be used for testing. The translations were made using
            google translate, without any supervision from a competent
            translator or native speaker.
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
  },
  languages: {
    flexDirection: "row",
    right: 0,
    margin: 10,
  },
  flag: {
    marginHorizontal: 5,
    padding: 10,
    minWidth: 64,
    height: 32,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  highlight: {
    borderColor: colors.primary,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderRadius: 32,
    padding: 2,
    borderWidth: 1,
  },
  none: {
    borderColor: colors.grey,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderRadius: 32,
    padding: 2,
    borderWidth: 1,
  },
});
