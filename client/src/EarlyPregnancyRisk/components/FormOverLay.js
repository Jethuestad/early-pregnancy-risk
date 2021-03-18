import React from "react";
import {
    StyleSheet,
    View,
    TouchableHighlight,
} from "react-native";
import ReferenceList from "./RefrenceList";


export default function FormOverLay({visible, setVisible, factor}){

    return(
    <View>
        {visible ?(
            <TouchableHighlight onPress={() => setVisible(false)}>
                <View style={{
                    position:"fixed",
                    justifyContent: 'center',
                    alignItems:"center",
                    width:"100%",
                    height:"100%",
                    top:"0",
                    zIndex:10,
                }}>
                    <View style={{
                        opacity:0.2,
                        position: "absolute",
                        backgroundColor:"black",
                        width:"100%",
                        height:"100%",
                    }}/>
                    <ReferenceList factor_name={factor.factor} close={() => setVisible(false)}/>
                </View>
            </TouchableHighlight>
            ):(null)}
    </View>
    )
}
