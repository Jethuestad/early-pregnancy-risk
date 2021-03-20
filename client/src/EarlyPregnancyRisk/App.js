import React, { useState, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { getFactors, getTranslation } from "./networking/Requests";
import { TranslationContext } from "./contexts/TranslationContext";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";

import loadable from "@loadable/component";
const Form = loadable(() => import("./components/Form"));
const Results = loadable(() => import("./components/Results"));
const FrontPage = loadable(() => import("./components/FrontPage"));

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
          <FrontPage
            changePage={async () => changePage(1)}
            disabled={factors == null}
          />
        );
      case 1:
        return (
          <Form
            changePage={(r) => {
              changePage(2);
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

  // Preload components
  useEffect(() => {
    (async () => {
      FrontPage.preload();
      Form.preload();
      Results.preload();
    })();
  }, []);
  
  // Get translations from the server.
  useEffect(() => {
    fadeOut();
    await new Promise((r) => setTimeout(r, 400));
    setPage(0);
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

  const changePage = async (p) => {
    fadeOut();
    await new Promise((r) => setTimeout(r, 200));
    setPage(p);
    await new Promise((r) => setTimeout(r, 200));
    fadeIn();
  };

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = async () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start();
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  return (
    <TranslationContext.Provider value={text}>
      <View style={styles.container}>
        <Header
          changePage={() => changePage(0)}
          isLoadingLanguage={isLoadingLanguage}
          setLang={(lang) => {
            setLanguage(lang);
          }}
          language={language}
        />
        <View style={{ flex: 15 }}>
          {isLoadingLanguage ? (
            <Loading />
          ) : (
            <Animated.View
              style={{ flex: 1, justifyContent: "center", opacity: fadeAnim }}
            >
              {renderPage()}
            </Animated.View>
          )}
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
    height: "100%",
  },
});
