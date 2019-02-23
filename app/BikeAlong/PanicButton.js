import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PanicButton extends Component {
  constructor(props) {
    super(props);
  }

  sendPanic() {
    this.props.updatePanicking(!this.props.isPanicking);
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.props.isPanicking}</Text>
      </View>
    );
  }
}

export default PanicButton;
