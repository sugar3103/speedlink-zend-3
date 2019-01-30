import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SidebarCategory extends Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    isNew: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    pathname: PropTypes.string
  };

  static defaultProps = {
    icon: '',
    isNew: false,
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
      selectedParentMenu: ""      
    };   
    
  }

  toggle = () => {    
    this.setState({ collapse: !this.state.collapse });
  };

  activeMenu = () => {
    const {
      children,pathname
    } = this.props;
    children.map(menu => {
        if(menu.props.route === pathname) {          
          this.setState({
            collapse: true
          })
        }

        if(menu.props.children && menu.props.children.length > 0) {
          menu.props.children.map(chil => {            
            if(chil.props.route === pathname) {          
              this.setState({
                collapse: true
              })
            }   
          })
        }
    })    
  }
  
  componentDidMount = () => {
    this.activeMenu();
  }

  render() {    
    const {id,title, icon, isNew, children} = this.props;
    
    const categoryClass = classNames({
      'sidebar__category-wrap': true,
      'sidebar__category-wrap--open': this.state.collapse,
    });

    return (
      <div className={categoryClass} id={id}>
        <button className="sidebar__link sidebar__category" onClick={this.toggle}>
          {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ''}
          <p className="sidebar__link-title">{title}
            {isNew && <span className="sidebar__category-new" />}
          </p>
          <span className="sidebar__category-icon lnr lnr-chevron-right" />
        </button>
        <Collapse isOpen={this.state.collapse} className="sidebar__submenu-wrap">
          <ul className="sidebar__submenu">
              {children}
          </ul>
        </Collapse>
      </div>
    );
  }
}
