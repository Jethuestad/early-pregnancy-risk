import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
} from "react-native";
import LanguageSelect from "./LanguageSelect";
import { isPhone, isSmallPhone, isTablet } from "../modules/Device";
import { TranslationContext } from "../contexts/TranslationContext";

const colors = require("../style/colors");

export default function Header({
  changePage,
  setLang,
  language,
  languages,
  isLoadingLanguage,
}) {
  const { width } = useWindowDimensions();
  const context = useContext(TranslationContext);

  return (
    <View style={styles(width).container}>
      <Text style={styles(width).text} onPress={() => changePage()}>
        Early Pregnancy Risk
      </Text>

      <LanguageSelect
        setLang={setLang}
        language={language}
        languages={languages}
        isLoadingLanguage={isLoadingLanguage}
      />
    </View>
  );
}

const styles = (width) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: 20,
      paddingBottom: 20,
    },
    text: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: isSmallPhone(width)
        ? 30
        : isPhone(width)
        ? 40
        : isTablet(width)
        ? 50
        : 60,
    },
  });
