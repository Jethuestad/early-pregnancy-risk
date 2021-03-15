import React, {useState} from "react";
import { ListItem, Text, Divider  } from 'react-native-elements'

export default function ReferenceList({refNumb}) {
    const Refrences = require("../constants/Refrences");
    const [references, setReferences]  = useState(Refrences.refrences)

    return(
        <Divider>
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
        </Divider>
    );
};