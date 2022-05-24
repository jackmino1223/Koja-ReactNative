import React from 'react'
import {
 View,
 Text,
 StyleSheet, 
 TouchableOpacity 
} from 'react-native'

const { Component } = React;

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default Button