import React from "react";
import {
    View,
    TouchableHighlight,
    useWindowDimensions,
    Modal,
} from "react-native";
import ReferenceList from "./RefrenceList";
import { isPhone } from "../modules/Device";


export default function FormOverLay({visible, setVisible, factor}){
    const { width } = useWindowDimensions();

    return(
    <View>
        {visible ?(
                !isPhone(width) ? (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={visible}>
                            <TouchableHighlight onPress={() => setVisible(false)}>
                                <View style={{
                                    position:"fixed",
                                    justifyContent: 'center',
                                    alignItems:"center",
                                    width:"100%",
                                    height:"100%",
                                    top:"0",
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
                        </Modal>
                ):(
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={visible}>
                        <TouchableHighlight onPress={() => setVisible(false)}>
                            <View style={{
                                position:"fixed",
                                justifyContent: 'center',
                                alignItems:"center",
                                width:"100%",
                                height:"100%",
                                top:"0",
                            }}>
                                <View style={{
                                    opacity:0.2,
                                    position: "absolute",
                                    backgroundColor:"black",
                                    width:"100%",
                                    height:"100%",
                                }}/>
                                <View
                                    style={{
                                        height:"80%",
                                        width:"70%",
                                }}>
                                    <ReferenceList factor_name={factor.factor} close={() => setVisible(false)}/>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </Modal>
                )
            ):(null)}
    </View>
    )
}
