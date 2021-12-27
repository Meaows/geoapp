import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Switch } from 'react-native';
import MyButton from "./MyButton"
export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false
        };
        this.toggleSwitch = this.toggleSwitch.bind(this)
    }
    componentDidMount(){
        this.setState({isEnabled: this.props.isEnabled})
    }
    componentDidUpdate(){
        if(this.state.isEnabled != this.props.isEnabled){
            this.setState({isEnabled: this.props.isEnabled})
        }
        
    }
    toggleSwitch(){
        this.props.toggle(this.props.id)
        this.setState({isEnabled: !this.state.isEnabled})
    }
    render() {
        return (
            <View style={css.left}>
                <View style={css.left}>
                    <Image style={css.image} source={require('../assets/firefox.png')} />
                    <View style={css.inside}>
                        <Text> timestamp: {this.props.timestamp} </Text>
                        <Text> latitude: {this.props.latitude} </Text>
                        <Text> longitude: {this.props.longitude} </Text>
                    </View>

                </View>

                <View style={css.right}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={this.toggleSwitch}
                        value={this.state.isEnabled}
                    />
                </View>
            </View>
        );
    }
}
const css = StyleSheet.create({
    image: {
        width: 50,
        height: 50,

        marginLeft: 20,
        marginRight: 20
    },
    left: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: "center",
        flexDirection: 'row'
    },
    inside: {
        flexDirection: "column"
    }

})
