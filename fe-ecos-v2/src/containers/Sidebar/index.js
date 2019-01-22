import React, { Component } from "react";
import ReactDOM from "react-dom";
import IntlMessages from "../../util/IntlMessages";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames
} from "../../redux/actions";

import navigation from '../../constants/SideBar';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.getMenuClassesForResize = this.getMenuClassesForResize.bind(this);
    this.setSelectedLiActive = this.setSelectedLiActive.bind(this);

    this.state = {
      selectedParentMenu: "",
      viewingParentMenu: "",
    };
  }

  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  handleDocumentClick(e) {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains(
          "menu-button-mobile"
        ))
    ) {
      isMenuClick = true;
    }
    if (
      (container.contains(e.target) || container === e.target) ||
      isMenuClick
    ) {
      return;
    }
    this.toggle(e);
    this.setState({
      viewingParentMenu: ""
    })
  }

  getMenuClassesForResize(classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(" ").filter(x => x !== "");
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter(x => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter(x => x !== "menu-sub-hidden");
      }
    }
    return nextClasses;
  }

  getContainer() {
    return ReactDOM.findDOMNode(this);
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x !== "")
      : "";

    if (currentClasses.includes("menu-sub-hidden") && menuClickCount === 3) {
      this.props.setContainerClassnames(2, containerClassnames);
    } else if (
      currentClasses.includes("menu-hidden") ||
      currentClasses.includes("menu-mobile")
    ) {
      this.props.setContainerClassnames(0, containerClassnames);
    }
  }

  handleProps() {
    this.addEvents();
  }

  addEvents() {
    ["click", "touchstart"].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  }
  removeEvents() {
    ["click", "touchstart"].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  }
  setSelectedLiActive() {
    const oldli = document.querySelector(".sub-menu li.active");  
    const oldMainli = document.querySelector(".main-menu li.active");  
    
    if (oldli !== null) {
      oldli.classList.remove("active");
    }

    if (oldMainli !== null) {
      oldMainli.classList.remove("active");
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector(".sub-menu  a.active");
    
    if (selectedlink !== null) {
      selectedlink.parentElement.classList.add("active");
      const selectedlinkParent = selectedlink.parentElement.parentElement.getAttribute(
        "data-parent"
      );
      this.setState({
        selectedParentMenu: selectedlinkParent
      });
      
    } else {
      var selectedParentNoSubItem = document.querySelector(".main-menu  li a.active");
      
      if (selectedParentNoSubItem !== null) {
        selectedParentNoSubItem.parentElement.classList.add("active");
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            "data-flag"
          )
        });
      } else if (this.state.selectedParentMenu === "") {
        selectedParentNoSubItem.parentElement.classList.add("active");
        this.setState({
          selectedParentMenu: "dashboards"
        });
      }

    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive();
      this.toggle();
      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  changeDefaultMenuType(e, containerClassnames) {
    e.preventDefault();
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  openSubMenu(e, selectedParent,main) { 
    e.preventDefault();
    if(main) {
      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(" ").filter(x => x !== "")
        : "";

      if (!currentClasses.includes("menu-mobile")) {
        if (
          currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames);
        } else if (
          currentClasses.includes("menu-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames);
        } else if (
          currentClasses.includes("menu-default") &&
          !currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames);
        }
      } else {
        this.props.addContainerClassname(
          "sub-show-temporary",
          containerClassnames
        );
      }
    } else{
      const arrow = document.querySelector("#"+ selectedParent + " span.arrow i");
      const menu = document.querySelector("#"+ selectedParent + " ul");
      if(arrow.className === "simple-icon-arrow-down"){
        arrow.className = "simple-icon-arrow-left";
        menu.className = 'd-none';
      } else {
        arrow.className = "simple-icon-arrow-down";
        menu.className = 'nav d-block';
      }
      return false;
    }

    this.setState({
      viewingParentMenu: selectedParent
    });
    
  }

  
  changeViewingParentMenu(menu) {
    this.toggle();

    this.setState({
      viewingParentMenu: menu
    })
  }

  renderMainMenu(items) {
    var that = this;
    return(
      <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar option={{ suppressScrollX: true, wheelPropagation: false }}>
              <Nav vertical className="list-unstyled">
                {
                  items.map(function(item,key){
                    if(item.childrens) {
                      return(
                        <NavItem 
                          key={key}
                          className={classnames({
                          active: ((that.state.selectedParentMenu === item.id && that.state.viewingParentMenu === "") || that.state.viewingParentMenu === item.id)                          
                          })}
                          data-primary = "main"                       
                        >
                          <NavLink to={item.url} onClick={e => that.openSubMenu(e, item.id, true)}>
                            <i className={item.icon} />{" "}
                            <IntlMessages id={item.name} />
                          </NavLink>
                        </NavItem>
                      )
                    } else {
                      return(
                        <NavItem 
                          key={key}
                          className={classnames({
                          active: ((that.state.selectedParentMenu === item.id && that.state.viewingParentMenu === "") || that.state.viewingParentMenu === item.id)                         
                          })}
                          data-flag = {item.id}
                        >
                          <NavLink to={item.url}>
                            <i className={item.icon} />{" "}
                            <IntlMessages id={item.name} />
                          </NavLink>
                        </NavItem>
                      )
                    }
                  })
                }
              </Nav>
            </PerfectScrollbar>
          </div>
      </div>
    )
  }

  renderSubMenu(items) {
    var that = this;
    return(
      <div className="sub-menu">
        <div className="scroll">
          <PerfectScrollbar
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
          {
            items.map(function(item,key){
              
              if(item.childrens) {
                return(
                <Nav
                  key={key}
                  className={classnames({
                    "d-block": ((that.state.selectedParentMenu === item.id && that.state.viewingParentMenu === "") || that.state.viewingParentMenu === item.id)
                  })}
                  data-parent={item.id}
                  data-primary = "sub"                       
                >
                {
                  item.childrens.map(function(child,key){
                    if(child.childrens) {
                      return(
                        <NavItem key={key} id={child.id}>
                          <NavLink to={child.url} onClick={e => that.openSubMenu(e, child.id,false)}>
                            <i className={child.icon} />{" "}
                            <IntlMessages id={child.name} />
                            <span className="arrow"><i className="simple-icon-arrow-left" />{" "}</span>
                          </NavLink>
                          <Nav>
                            {
                              child.childrens.map(function(sub_child,key) {
                                return (
                                  <NavItem key={key}>
                                    <NavLink to={sub_child.url}>
                                      <IntlMessages id={sub_child.name} />
                                    </NavLink>
                                  </NavItem>
                                )
                              })
                            }
                          </Nav>
                        </NavItem>
                      )
                    } else {
                      return(
                        <NavItem key={key}>
                          <NavLink to={child.url}>
                            <i className={child.icon} />{" "}
                            <IntlMessages id={child.name} />
                          </NavLink>
                        </NavItem>
                      )
                    }
                    
                  })
                }
                </Nav>
                )
              } else {
                return false;
              }
            })
          }
          </PerfectScrollbar>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="sidebar">
        { this.renderMainMenu(navigation.items) }
        { this.renderSubMenu(navigation.items) }
       </div>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  } = menu;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { setContainerClassnames, addContainerClassname, changeDefaultClassnames }
  )(Sidebar)
);
