import React, { Component } from 'react'

/**
 * Header Component that displays the app title
 */
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1 className="text-left ml-4 text-light">WEATHER APP</h1>
    );
  }
}

export default HeaderComponent;