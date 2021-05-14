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
            <Image
              source={require("../assets/uk.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
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
              <Image
                source={value.flag_url}
                defaultSource={require("../assets/unknown.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>

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
          </View>
        ))}
      </View>
      {language != COUNTRY_CODES.english ? (
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: "red",
              width: "50%",
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
