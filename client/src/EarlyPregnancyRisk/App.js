import React, { useState, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  getFactors,
  getLanguages,
  getTranslation,
} from "./networking/Requests";
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
  const [languages, setLanguages] = useState([]);
  const [text, setText] = useState({});
  const [factors, setFactors] = useState(null);
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState();
  const [totalSkipped, setTotalSkipped] = useState(0);
  const [initLoadComplete, setInitLoadComplete] = useState(false);

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
            changePage={(data, skipped) => {
              setData(data);
              setTotalSkipped(skipped);
              changePage(2);
            }}
            factor_data={factors}
            lang_code={language}
          />
        );
      case 2:
        return <Results data={data} skipped={totalSkipped} />;
      default:
        return null;
    }
  };

  // Preload components
  useEffect(() => {
    fadeTo(1, 1000, fadeGlobal);

    (async () => {
      FrontPage.preload();
      Form.preload();
      Results.preload();
    })();
  }, []);

  // Get translations from the server.
  useEffect(() => {
    (async () => {
      fadeTo(0);
      await new Promise((r) => setTimeout(r, 400));
      setPage(0);
      setIsLoadingLanguage(true);
      async.parallel(
        [
          async (callback) => {
            const response = await getLanguages();
            setLanguages(response);
            callback();
          },
          async (callback) => {
            const response = await getTranslation(language);
            setText(response);
            callback();
          },
          async (callback) => {
            const response = await getFactors(language);
            setFactors(response);
            callback();
          },
        ],
        function () {
          setIsLoadingLanguage(false);
          setInitLoadComplete(true);
          fadeTo(1);
        }
      );
    })();
  }, [language]);

  const changePage = async (p) => {
    fadeTo(0);
    await new Promise((r) => setTimeout(r, 200));
    setPage(p);
    await new Promise((r) => setTimeout(r, 200));
    fadeTo(1);
  };

  const fadeBody = useRef(new Animated.Value(0)).current;
  const fadeGlobal = useRef(new Animated.Value(0)).current;

  const fadeTo = async (v, d = 200, ref = fadeBody) => {
    Animated.timing(ref, {
      toValue: v,
      duration: d,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TranslationContext.Provider value={text}>
      {initLoadComplete ? (
        <Animated.View style={[styles.container, { opacity: fadeGlobal }]}>
          <Header
            changePage={() => changePage(0)}
            isLoadingLanguage={isLoadingLanguage}
            setLang={(lang) => {
              setLanguage(lang);
            }}
            language={language}
            languages={languages}
          />
          <View style={{ flex: 15 }}>
            {isLoadingLanguage ? (
              <Loading />
            ) : (
              <Animated.View
                style={{ flex: 1, justifyContent: "center", opacity: fadeBody }}
              >
                {renderPage()}
              </Animated.View>
            )}
          </View>

          <Footer />
        </Animated.View>
      ) : (
        <Loading message={"Getting things ready..."} />
      )}
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
