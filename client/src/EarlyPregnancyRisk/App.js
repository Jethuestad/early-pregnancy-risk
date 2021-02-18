import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PageName from "./components/PageName";
import { getTestJson } from "./networking/Requests";

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
      <PageName />

      {/* Test code to show a request */}
      <TouchableOpacity onPress={() => setLoading(true)} style={styles.button}>
        <Text style={styles.buttonText}>Make Request</Text>
      </TouchableOpacity>
      <View style={styles.centre}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Text>{testRequest != null ? testRequest.title : "no content"}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    width: "15%",
    height: "30px",
    alignSelf: "center",
    margin: 10,
    backgroundColor: "#000",
  },
  buttonText: { color: "white", textAlign: "center", paddingTop: "4px" },
  centre: {
    alignSelf: "center",
  },
});
