import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import FrontPage from "./components/FrontPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Results from "./components/Results";
import { getFactors, getTranslation } from "./networking/Requests";
import Loading from "./components/Loading";
import { TranslationContext } from "./contexts/TranslationContext";

var async = require("async");

export default function App() {
  const COUNTRY_CODES = require("./constants/CountryCodes");

  const [language, setLanguage] = useState(COUNTRY_CODES.english);
  const [text, setText] = useState({});
  const [factors, setFactors] = useState(null);
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState();

  const renderPage = () => {
    switch (page) {
      case 0:
        return (
          <FrontPage changePage={() => setPage(1)} disabled={factors == null} />
        );
      case 1:
        return (
          <Form
            changePage={(r) => {
              setPage(2);
              setData(r);
            }}
            factor_data={factors}
          />
        );
      case 2:
        return <Results data={data} />;
      default:
        return null;
    }
  };

  // Get translations from the server.
  useEffect(() => {
    setIsLoadingLanguage(true);
    async.parallel(
      [
        async (callback) => {
          setText(await getTranslation(language));
          callback();
        },
        async (callback) => {
          setFactors(await getFactors(language));
          callback();
        },
      ],
      function () {
        setIsLoadingLanguage(false);
      }
    );
  }, [language]);

  return (
    <TranslationContext.Provider value={text}>
      <View style={styles.container}>
        <Header
          changePage={() => setPage(0)}
          isLoadingLanguage={isLoadingLanguage}
          setLang={(lang) => {
            setPage(0);
            setLanguage(lang);
          }}
          language={language}
        />

        <View style={{ flex: 15, justifyContent: "center" }}>
          {isLoadingLanguage == true ? <Loading /> : renderPage()}
        </View>
        <Footer />
      </View>
    </TranslationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F5",
  },
});
