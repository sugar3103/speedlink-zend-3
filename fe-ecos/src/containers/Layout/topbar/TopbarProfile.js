import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { logoutUser} from '../../../redux/actions';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
      user: {}
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  hanldeLogOut = () => {
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.authUser;
    let currentUser = user ? user : {};

    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle}>
          {/* {Ava ? (<img className="topbar__avatar-img" src={Ava} alt="avatar" />) : ( */}
            <i className="icon-avatar topbar__avatar-img" />
          {/* ) } */}
          <p className="topbar__avatar-name">
            {(currentUser.fullname !== " ") ? currentUser.fullname : currentUser.username}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            {/* <TopbarMenuLink title="My Profile" icon="user" path="/account/profile" />
            <TopbarMenuLink title="Calendar" icon="calendar-full" path="/default_pages/calendar" />
            <TopbarMenuLink title="Tasks" icon="list" path="/default_pages/calendar" />
            <TopbarMenuLink title="Inbox" icon="inbox" path="/mail" />
            <div className="topbar__menu-divider" /> */}
            <TopbarMenuLink title="Account Settings" icon="cog" path="/system/user/profile" />
            <TopbarMenuLink title="Lock Screen" icon="lock" path="/lock_screen" />
            {/* eslint-disable-next-line */}
            <a className="topbar__link" href="_blank" onClick={this.hanldeLogOut}>
              <span className={`topbar__link-icon lnr lnr-exit`} />
              <p className="topbar__link-title">Log Out</p>
            </a>
          </div>
        </Collapse>
      </div>
    );
  }
}

TopbarProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
}
const mapStateToProps = ({ authUser }) => {
  return {
    authUser
  } 
}
export default injectIntl(connect(mapStateToProps, {
  logoutUser
})(TopbarProfile));
