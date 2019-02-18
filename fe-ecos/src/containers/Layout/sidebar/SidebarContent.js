import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import navigation from '../../../constants/SideBar';

class SidebarContent extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemActive: [],
    }
  }

  componentDidMount() {
    const arr = this.props.location.pathname.split('/');
    let itemActive = [];
    let i = 1;
    let route = '';
    while (i < arr.length) {
      route += `/${arr[i]}`;
      if (i > 1) {
        itemActive.push(route);
      }
      i++;
    }

    this.setState({
      itemActive: itemActive
    });
  }

  hideSidebar = (route) => {
    this.props.onClick();
    this.toggleMenu(route);
  };

  toggleMenu = (route) => {
    var itemActive = this.state.itemActive;

    switch (itemActive.length) {
      case 1:
        if (itemActive.indexOf(route) !== -1) {
          itemActive.splice(itemActive.indexOf(route), 3);
        } else {
          if (route.indexOf(itemActive[0]) !== -1) {
            itemActive.push(route);
          } else {
            itemActive = [route];
          }
        }
        break;
      case 2:
        if (itemActive.indexOf(route) !== -1) {
          itemActive.splice(itemActive.indexOf(route), 3);
        } else {
          if (route.indexOf(itemActive[0]) !== -1) {
            if (route.indexOf(itemActive[1]) !== -1) {
              itemActive.push(route);
            } else {
              itemActive[1] = route;
            }
          } else {
            itemActive = [route];
          }
        }
        break;
      case 3:
        if (route.indexOf(itemActive[0]) !== -1) {
          if (route.indexOf(itemActive[1]) !== -1) {
            if (route.indexOf(itemActive[2]) !== -1) {
              itemActive.push(route);
            } else {
              if (itemActive.indexOf(route) !== -1) {
                itemActive.splice(itemActive.indexOf(route), 3);
              } else {
                itemActive[2] = route;
              }
            }
          } else {
            itemActive.pop();
            itemActive[1] = route;
          }
        } else {
          itemActive = [route];
        }
        break;
      default:
        itemActive = [route]
        break;
    }

    this.setState({
      itemActive: itemActive
    });
  }

  renderNavigation = (items) => {
    const { messages } = this.props.intl;

    return items.map((item, index) => {
      if (item.childrens) {
        return (
          <SidebarCategory
            title={messages[item.title]}
            icon={item.icon}
            key={index}
            id={item.id}
            toggleMenu={() => this.toggleMenu(item.route)}
            collapse={this.state.itemActive.indexOf(item.route) !== -1 ? true : false}
          >
            {this.renderNavigation(item.childrens)}
          </SidebarCategory>
        )
      } else {
        return (
          <SidebarLink
            key={index}
            title={messages[item.title]}
            route={item.route}
            icon={item.icon}
            onClick={() => this.hideSidebar(item.route)}
          />
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

export default withRouter(injectIntl(SidebarContent));
