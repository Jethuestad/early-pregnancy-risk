import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Footer from "./Footer";
import Header from "./Header"
import TestForm from "./TestForm";
import ProgBar, {test}  from "./ProgressBar";


export default function FrontPage() {

    const [isLoading, setLoading] = useState(false);
    const [displayNone, setDisplay] = useState(true);

    useEffect(() => {
        (async function () {
            if (isLoading) {
                try {
                } finally {
                    test;
                    setDisplay(false)
                    setLoading(false);
                }
            }
        })();
    }, [isLoading]);

       return (
        <div>
            <View style={styles.container}>
                <View style={styles.background}></View>
                <Header/>
                <ProgBar></ProgBar>
                {displayNone ?
                <View style={styles.centre}>
                    <View style={styles.infoBox}>

                        <Text style={styles.textBox}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien lorem, sagittis et quam ut, pellentesque blandit felis. Nullam interdum sagittis est nec bibendum. Cras feugiat neque est, sit amet consequat lacus porttitor sed. Praesent gravida in ex ut rutrum. Praesent et ex bibendum, pulvinar diam sit amet, bibendum velit. Etiam rutrum sed nisi et semper. Proin id lectus massa. Aenean eu ornare lacus. Nulla facilisi. Pellentesque et vestibulum velit. Nullam vitae neque vel lorem suscipit accumsan in vel nisi. Nam tristique venenatis arcu, quis tristique quam eleifend a.

                            Suspendisse vitae varius tortor. Aliquam aliquam dui tincidunt eros tincidunt, nec posuere erat ullamcorper. Suspendisse tincidunt, lectus non suscipit tincidunt, sem quam sollicitudin sapien, sodales ornare orci tortor id ex. Fusce mattis, neque ut pellentesque rhoncus, velit ante rutrum magna, at ultrices arcu lorem et massa. Donec mattis rhoncus sapien sit amet sagittis. Duis commodo turpis vel turpis laoreet auctor. Etiam placerat consectetur laoreet.
                        </Text>

                        <Text style={styles.textBox}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien lorem, sagittis et quam ut, pellentesque blandit felis. Nullam interdum sagittis est nec bibendum. Cras feugiat neque est, sit amet consequat lacus porttitor sed. Praesent gravida in ex ut rutrum. Praesent et ex bibendum, pulvinar diam sit amet, bibendum velit. Etiam rutrum sed nisi et semper. Proin id lectus massa. Aenean eu ornare lacus. Nulla facilisi. Pellentesque et vestibulum velit. Nullam vitae neque vel lorem suscipit accumsan in vel nisi. Nam tristique venenatis arcu, quis tristique quam eleifend a.

                            Suspendisse vitae varius tortor. Aliquam aliquam dui tincidunt eros tincidunt, nec posuere erat ullamcorper. Suspendisse tincidunt, lectus non suscipit tincidunt, sem quam sollicitudin sapien, sodales ornare orci tortor id ex. Fusce mattis, neque ut pellentesque rhoncus, velit ante rutrum magna, at ultrices arcu lorem et massa. Donec mattis rhoncus sapien sit amet sagittis. Duis commodo turpis vel turpis laoreet auctor. Etiam placerat consectetur laoreet.
                        </Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <TouchableOpacity onPress={() => setLoading(true)} style={styles.button}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    :<TestForm/>}

                <Footer/>
            </View>
        </div>
    );
}

const styles = StyleSheet.create({
    buttonBox:{
        minHeight: "43vh",
        maxHeight: "54vh",
        minWidth: "50rem",
        maxWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",

    },
    infoBox:{
        paddingTop: "4rem",
        flexDirection:"row",
        maxWidth: "60rem",
        minWidth: "50rem",
    },
    textBox:{
        maxWidth: "30rem",
        minWidth: "25rem",
    },
    container: {
        flex: 1,
    },
    button: {
        width: 200,
        height: 60,
        alignSelf: "center",
        justifyContent: "center",
        margin: 10,
        backgroundColor: "#BF1616",
        borderRadius:"5px",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize:"2rem",
    },
    centre: {
        alignSelf: "center",
    },
    background:{
        backgroundColor:"#BF3B29",
        opacity:"10%",
        width: "100vw",
        height: "100vh",
        position:"absolute"
    }
});
