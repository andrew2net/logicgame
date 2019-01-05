import React, { Component } from 'react';

class Operator extends Component {
  render(){
    return(
      <div className="Operator">{this.props.sign}</div>
    );
  }
}

export default Operator;