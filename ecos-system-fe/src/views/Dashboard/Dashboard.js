import React, { Component } from 'react';

class Dashboard extends Component {
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
      <a href="#" onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</a>
       </div>
    );
  }
}

export default Dashboard;
