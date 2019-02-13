import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import Customizer from './customizer/Customizer';

import { changeMobileSidebarVisibility, changeSidebarVisibility, changeThemeToDark, changeThemeToLight } from '../../redux/actions';

class Layout extends Component {
  static propTypes = {
    sidebar: PropTypes.shape({
      show: PropTypes.bool,
      collapse: PropTypes.bool
    }).isRequired,
  };

  changeSidebarVisibility = () => {
    this.props.changeSidebarVisibility();
  };

  changeMobileSidebarVisibility = () => {
    this.props.changeMobileSidebarVisibility();
  };

  changeToDark = () => {
    this.props.changeThemeToDark();
  };

  changeToLight = () => {
    this.props.changeThemeToLight();
  };

  render() {
    const { sidebar, theme,setting } = this.props;
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': this.props.sidebar.collapse,
    });

    return (
      <div className={layoutClass}>
        <Customizer
          sidebar={sidebar}
          theme={theme}
          changeToDark={this.changeToDark}
          changeToLight={this.changeToLight}
          setting = {setting.items}
        />
        <Topbar
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
        />
        <Sidebar
          sidebar={this.props.sidebar}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    );
  }
}

const mapStateToProps = ({settings,setting}) => {
  const { sidebar, theme } = settings;
  return {
    sidebar,
    theme,
    setting
  }
}

export default withRouter(connect(mapStateToProps, {
  changeSidebarVisibility,
  changeMobileSidebarVisibility,
  changeThemeToDark,
  changeThemeToLight
})(Layout));
