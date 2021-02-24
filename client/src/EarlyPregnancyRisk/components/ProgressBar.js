import React, {useEffect, useRef, useState} from "react";
import {Platform, StyleSheet, Text, View, Animated} from "react-native";
import Constants from "expo-constants";

// setInterval custom hook by Dan Abramov

export function useInterval(callback, delay) {

    module.exports = {
        test:test(),
    }

    function test(){
        console.log("HERE")
    }


    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function ProgressBar(){
    let animation = useRef(new Animated.Value(0));
    const [progress, setProgress] = useState(0);
    useInterval(() => {
        // update progress until 100
        if(progress < 100) {
            setProgress(progress + 4,16666667);
        }
    }, 1000);

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: progress,
            duration: 100
        }).start();
    },[progress])

    const width = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    return (
        <View style={styles1.container}>
            <View style={styles1.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "#8BED4F", width }]}/>
            </View>
            <Text>
                {`${progress}%`}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            web: {
                alignItems: "center",
                marginTop: 5,
                marginBottom: 5,
                paddingBottom: 10,
                borderBottomColor: "black",
                borderBottomWidth: 2,
            },
            default: {
                alignSelf: "center",
                marginTop: 40,
            },
        }),
    },
    text: {
        fontWeight: "bold",
        ...Platform.select({
            web: {
                fontSize: 50,
            },
            default: {
                fontSize: 30,
            },
        }),
    },
});
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'Column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    progressBar: {
        flexDirection: 'row',
        height: 20,
        width: '80vw',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    }
});