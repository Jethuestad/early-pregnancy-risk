import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import FrontPage from "./components/FrontPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Results from "./components/Results";
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
      <SafeAreaProvider>
        <Divider style={styles.container}>
          <Header changePage={() => setPage(0)} />
          <Divider style={{ flex: 15, backgroundColor:"#F8EAE8" }}>{renderPage()}</Divider>
          <Footer />
        </Divider>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EAE8",
  },
});
