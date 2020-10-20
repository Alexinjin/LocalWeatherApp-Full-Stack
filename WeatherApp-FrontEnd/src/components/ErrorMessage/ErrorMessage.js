import React, { Component } from 'react'
/**
 * Message Component that displays the error information
 * @param  {this.props.message} String :error message
 */
class ErrorMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    };
  }
  render() {
    return (
      <div className="container alert alert-warning">{this.state.message}</div>
    );
  }
}

export default ErrorMessage;