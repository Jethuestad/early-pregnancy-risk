import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Loading from "./Loading";
import { getReferences } from "../networking/Requests";
import { TranslationContext } from "../contexts/TranslationContext";

export default function ReferenceList({ factor_name, close, lang_code }) {
  const [isLoading, setIsLoading] = useState(true);
  const [references, setReferences] = useState([]);
  const context = useContext(TranslationContext);

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
  return (
    <ScrollView style={styles.contentBox}>
      <Text style={styles.description}>{context.reference_info}</Text>
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
