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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {references.map((val) => (
          <ListItem bottomView key={val.id}>
            <ListItem.Content>
              <Text>{val.ref}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
