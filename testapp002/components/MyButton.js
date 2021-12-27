import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity flex={1} onPress={this.props.funcion}>
        <Text style={styles.button}> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}
MyButton.propTypes = {
  funcion: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#ffffff',
      color: "#212121",
      textTransform: 'uppercase',
      fontFamily: "monospace",
      fontSize: 20,
      alignSelf: "center",
      justifyContent: "center"
      

  },
  touchas: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: 'center',
  }

});
