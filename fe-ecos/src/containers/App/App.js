import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import Router from './Router';
import ScrollToTop from './ScrollToTop';
import socketIOClient from 'socket.io-client';
import createNotification from '../../util/notifications';
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      loaded: true,
    };
  }
  
  send = () => {
    // const socket = socketIOClient('localhost:3000');    
  }
  componentDidMount() {
    // window.addEventListener('load', () => {
    //   this.setState({ loading: false });
    //   setTimeout(() => this.setState({ loaded: true }), 500);
    // });
    const socket = socketIOClient('localhost:3000');    
    socket.on("notification-1",(nofify) => {
      createNotification({
        type: 'success', 
        message: nofify, 
        title: 'success'
      });      
    })
  }

  render() {
    const { loaded, loading } = this.state;
    return (
      <ScrollToTop>
        {!loaded &&
        <div className={`load${loading ? '' : ' loaded'}`}>
          <div className="load__icon-wrap">
            <svg className="load__icon">
              <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
          </div>
        </div>
        }
        <Router />
      </ScrollToTop>
    );
  }
}

export default (App);
