import React, { Component } from 'react';

class PanicButton extends Component {

  render() {
    return (
      <button onClick={ () => this.props.updatePanicking() }>{this.props.isPanicking}</button>
    );
  }
}

export default PanicButton;
