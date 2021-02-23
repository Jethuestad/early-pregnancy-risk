import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Footer from "./Footer";
import Header from "./Header";
import { getTestJson } from "../networking/Requests";

export default function FrontPage() {
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
            {/* Test code to show a request */}
            <TouchableOpacity onPress={() => setLoading(true)} style={styles.button}>
                <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>
            <View style={styles.centre}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <Text>{testRequest != null ? testRequest.title : "no content"}</Text>
                )}
            </View>
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
