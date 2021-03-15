import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Text } from "react-native-elements";
import Loading from "./Loading";
import { getReferences } from "../networking/Requests";

export default function ReferenceList({ factor_name, close }) {
  const [isLoading, setIsLoading] = useState(true);
  const [references, setReferences] = useState();

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const response = await getReferences(factor_name);
      if (response == null) {
        close();
      } else {
        setReferences(response);
      }
    })();
    setIsLoading(false);
  }, []);

  if (references == null || isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Loading message="Loading references..." />
      </View>
    );
  }

  return (
    <View>
      {references.map((val) => (
        <ListItem bottomView key={val.id}>
          <ListItem.Content>
            <Text>{val.ref}</Text>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
