import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import colors from "../style/colors";


export default function TestForm() {


    return (
        <View style={styles.container}>
           Hello
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "auto",
    },
    question: {
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 20,
    },
    textinput: {
        width: 200,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "purple",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    appInputButtons: {
        elevation: 7,
        backgroundColor: "#E15A46",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        maxWidth: 150,
        minWidth: 150,
        alignSelf: "center",
    },
    textTitleBtn: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 4,
    },
    skipBtn: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 4,
    },
});