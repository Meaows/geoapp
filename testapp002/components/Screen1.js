import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import MyButton from "./MyButton"
import * as data from "../assets/ad.json"
const url = data.url
import * as Font from "expo-font";

export default class Screen1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false
        };
        this.presik = this.presik.bind(this)
    }
    async componentDidMount() {
        await Font.loadAsync({
            'lato': require('../assets/latoregular.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
    }
    presik() {
        this.props.navigation.navigate('s2');



    }
    render() {
        return (
            <View style={{flex:1}}>
                {this.state.fontloaded
                    ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent:"center", backgroundColor: "pink"}}>
                        <Text style={{
                            fontFamily: 'lato',
                            fontSize: 72
                        }}>Geo[M]app</Text>
                    </View>
                    :
                    null
                }
                <View style={{flex:1, alignItems: 'center', justifyContent:"center"}}>
                <MyButton text="GO" funcion={this.presik}></MyButton>
                </View>
            </View>
        );
    }
}
