import React, { Component } from 'react';

class PanicButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={ this.props.updatePanicking() }>{this.props.isPanicking}</button>
    );
  }
}

export default PanicButton;
