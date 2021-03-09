import React, {useState} from "react";
import {Text, View,} from "react-native";
import { ListItem } from 'react-native-elements'

export default function ReferenceList({refNumb}) {
    const Refrences = require("../constants/Refrences");
    const [references, setReferences]  = useState(Refrences.refrences)

    return(
        <View>
            {refNumb.map((num) =>(
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <Text>
                            {references[num].ref}
                        </Text>
                    </ListItem.Content>
                </ListItem>
            ))
            }
        </View>
    );
};