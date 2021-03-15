import React, { useState, useEffect } from "react";
import { View } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import FrontPage from "./components/FrontPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Results from "./components/Results";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getFactors } from "./networking/Requests";
import Loading from "./components/Loading";

export default function App() {
  const COUNTRY_CODES = require("./constants/CountryCodes");

  const [language, setLanguage] = useState(COUNTRY_CODES.english);
  const [factors, setFactors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const response = await getFactors(language);
      setFactors(response);
      setIsLoading(false);
    })();
  }, [language]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          changePage={() => setPage(0)}
          setLang={(lang) => {
            setPage(0);
            setLanguage(lang);
          }}
          language={language}
        />

        <View style={{ flex: 15, justifyContent: "center" }}>
          {isLoading ? <Loading message={"Loading..."} /> : renderPage()}
        </View>
        <Footer />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F5",
  },
});
