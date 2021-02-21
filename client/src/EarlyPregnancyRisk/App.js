import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Form from "./components/Form";

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [testRequest, setTestRequest] = useState(null);

  useEffect(() => {
    (async function () {
      if (isLoading) {
        try {
          const json = await getTestJson();
          setTestRequest(json);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <Header />
      <Form />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    width: 100,
    height: 30,
    alignSelf: "center",
    margin: 10,
    paddingTop: 5,
    backgroundColor: "#BF1616",
  },
  buttonText: { color: "white", textAlign: "center" },
  centre: {
    alignSelf: "center",
  },
});
