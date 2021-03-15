import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Text } from "react-native-elements";

export default function ReferenceList({ refNumb }) {
  const Refrences = require("../constants/Refrences");
  const [references, setReferences] = useState(Refrences.refrences);

  return (
    <View>
      {refNumb.map((num) => (
        <ListItem bottomView key={num}>
          <ListItem.Content>
            <Text>{references[num].ref}</Text>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
