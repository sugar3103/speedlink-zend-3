import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import navigation from '../../../constants/SideBar';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };

  renderNavigation = (items) => {
    const { messages } = this.props.intl;
    return items.map((item, index) => {
      if (item.childrens) {
        return (
          <SidebarCategory title={messages[item.title]} icon={item.icon} key={index}>
            {this.renderNavigation(item.childrens)}
          </SidebarCategory>
        )
      } else {
        return (
          <SidebarLink key={index} title={messages[item.title]} route={item.route} icon={item.icon} onClick={this.hideSidebar} />
        )
      }
    });
  }

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          {this.renderNavigation(navigation.items)}
        </ul>
      </div>
    );
  }
}

export default injectIntl(SidebarContent);
