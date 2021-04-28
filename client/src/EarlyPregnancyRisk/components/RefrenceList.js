import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Loading from "./Loading";
import { getReferences } from "../networking/Requests";

export default function ReferenceList({ factor_name, close, lang_code }) {
  const [isLoading, setIsLoading] = useState(true);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const response = await getReferences(factor_name, lang_code);
      if (response == null) {
        close();
      } else {
        setReferences(response);
        setIsLoading(false);
      }
    })();
  }, []);

  if (references == undefined || references == null || isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading message="Loading references..." />
      </View>
    );
  }
  console.log(references);
  return (
    <ScrollView style={styles.contentBox}>
      <Text style={styles.description}>
        This question is used to determine the average risk factor for the
        complications below. Below all complications is a list of references,
        which can give further information about the topic.
      </Text>
      {references.length == 0
        ? null
        : references.map((e, i) => (
            <View key={i}>
              <Text style={styles.title}>{e.name}</Text>
              {e.references.length == 0 ? (
                <Text> No references </Text>
              ) : (
                e.references.map((reference, j) => (
                  <Text style={styles.reference} key={j}>
                    {j + 1}: {reference}
                  </Text>
                ))
              )}
            </View>
          ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textBox: {
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  contentBox: {
    backgroundColor: "white",
    color: "black",
    padding: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    marginTop: 20,
  },
  reference: {
    fontSize: 15,
    marginVertical: 5,
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    color: "grey",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
