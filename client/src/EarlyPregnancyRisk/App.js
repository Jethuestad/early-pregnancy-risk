import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FrontPage from "./components/FrontPage";

export default function App() {
    return (
        <View style={styles.container}>
            <FrontPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});