import React, { Component } from 'react'

/**
 * Header Component that displays the app title
 */
class SubHeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h3 className="display-3 text-light">WEATHER APP</h3>
    );
  }
}

export default SubHeaderComponent;