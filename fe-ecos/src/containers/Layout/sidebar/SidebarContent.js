import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import navigation from '../../../constants/SideBar';

class SidebarContent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedParentMenu: "",
      viewingParentMenu:"", 
    };

    this.setSelectedLiActive = this.setSelectedLiActive.bind(this);
  }
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };

  setSelectedLiActive() {
    const sidebarCategory = document.querySelector(".sidebar__block .sidebar__link-active");
    if(sidebarCategory.parentElement.classList !== 'sidebar__block'){
      // console.log(sidebarCategory.parentElement);
    } 
  }

  componentDidMount() {
    this.setSelectedLiActive();
  }


  renderNavigation = (items) => {
    const { messages } = this.props.intl;
    return items.map((item, index) => {
      if (item.childrens) {
        return (
          <SidebarCategory title={messages[item.title]} icon={item.icon} key={index} id={item.id}>
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
