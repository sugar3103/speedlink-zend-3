import React, { Component } from 'react';

class Content extends Component {

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default Content;