import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, } from "react-native";
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

    const renderItem =({item}) => (
        <Text style={{
            padding:2,
            borderBottomWidth:1,
            borderBottomColor:"black"
        }}>
            {item.ref}
        </Text>
    )

    return (
        <View style={{
            backgroundColor:"white",
            color:"black",
            padding:8,
            borderRadius:5,
        }}>
            <FlatList data={references} renderItem={renderItem}/>
        </View>
    );
}