import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { device_init } from "./modules/Device";
import FrontPage from "./components/FrontPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Results from "./components/Results";

export default function App() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState();

  const renderPage = () => {
    switch (page) {
      case 0:
        return <FrontPage changePage={() => setPage(1)} />;
      case 1:
        return (
          <Form
            changePage={(r) => {
              setPage(2);
              setData(r);
            }}
          />
        );
      case 2:
        return <Results data={data} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header changePage={() => setPage(0)} />
      <View style={{ flex: 15 }}>{renderPage()}</View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F5",
  },
});
