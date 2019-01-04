import React, { Component } from 'react';

class TopBarUser extends Component {
  render() {
    return (
      <ul className="list-unstyled topbar-right-menu float-right mb-0">

        {/* START NOTIFICATION */}
        <li className="dropdown notification-list">
          {/* eslint-disable-next-line */}
          <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <i className="fi-bell noti-icon" />
            <span className="badge badge-danger badge-pill noti-icon-badge">4</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg">
            {/* item*/}
            <div className="dropdown-item noti-title">
              {/* eslint-disable-next-line */}
              <h5 className="m-0"><span className="float-right"><a href="#" className="text-dark"><small>Clear All</small></a> </span>Notification</h5>
            </div>
            <div className="slimscroll" style={{ maxHeight: '230px' }}>
              {/* item*/}
              {/* eslint-disable-next-line */}
              <a href="javascript:void(0);" className="dropdown-item notify-item">
                <div className="notify-icon bg-success"><i className="mdi mdi-comment-account-outline" /></div>
                <p className="notify-details">Caleb Flakelar commented on Admin<small className="text-muted">1 min ago</small></p>
              </a>
            </div>
            {/* All*/}
            {/* eslint-disable-next-line */}
            <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item notify-all">
              View all <i className="fi-arrow-right" />
            </a>
          </div>
        </li>
        {/* END NOTIFICATION */}
        
        {/* START MESSAGE */}
        <li className="dropdown notification-list">
          {/* eslint-disable-next-line */}  
          <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <i className="fi-speech-bubble noti-icon" />
            <span className="badge badge-custom badge-pill noti-icon-badge">6</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg">
            {/* item*/}
            <div className="dropdown-item noti-title">
              {/* eslint-disable-next-line */}
              <h5 className="m-0"><span className="float-right"><a href="#" className="text-dark"><small>Clear All</small></a> </span>Chat</h5>
            </div>
            <div className="slimscroll" style={{ maxHeight: '230px' }}>
              {/* item*/}
              {/* eslint-disable-next-line */}
              <a href="javascript:void(0);" className="dropdown-item notify-item">
                <div className="notify-icon"><img src="assets/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                <p className="notify-details">Cristina Pride</p>
                <p className="text-muted font-13 mb-0 user-msg">Hi, How are you? What about our next meeting</p>
              </a>
            </div>
            {/* All*/}
            {/* eslint-disable-next-line */}
            <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item notify-all">
              View all <i className="fi-arrow-right" />
            </a>
          </div>
        </li>
        {/* END MESSAFE */}
        
        {/* START USER INFO */}
        <li className="dropdown notification-list">
          {/* eslint-disable-next-line */}  
          <a className="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <img src="assets/images/users/avatar-1.jpg" alt="user" className="rounded-circle" /> <span className="ml-1">Maxine K <i className="mdi mdi-chevron-down" /> </span>
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown">
            {/* item*/}
            <div className="dropdown-item noti-title">
              <h6 className="text-overflow m-0">Welcome !</h6>
            </div>
            {/* item*/}
            {/* eslint-disable-next-line */}  
            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i className="fi-head" /> <span>My Account</span>
            </a>
            {/* item*/}
            {/* eslint-disable-next-line */}  
            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i className="fi-cog" /> <span>Settings</span>
            </a>
            {/* item*/}
            {/* eslint-disable-next-line */}  
            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i className="fi-help" /> <span>Support</span>
            </a>
            {/* item*/}
            {/* eslint-disable-next-line */}  
            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i className="fi-lock" /> <span>Lock Screen</span>
            </a>
            {/* item*/}
            {/* eslint-disable-next-line */}  
            <a href="javascript:void(0);" className="dropdown-item notify-item">
              <i className="fi-power" /> <span>Logout</span>
            </a>
          </div>
        </li>
        {/* END USER INFO */}
      
      </ul>
    );
  }
}

export default TopBarUser;