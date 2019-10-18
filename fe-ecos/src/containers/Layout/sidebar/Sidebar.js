import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';

const Sidebar = ({changeMobileSidebarVisibility, sidebar}) => {
  const sidebarClass = classNames({
    sidebar: true,
    'sidebar--show': sidebar.show,
    'sidebar--collapse': sidebar.collapse,
  });
  
  return (
    <div className={sidebarClass}>
      <button className="sidebar__back" onClick={changeMobileSidebarVisibility} />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent onClick={(e) => {}}/>
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent onClick={changeMobileSidebarVisibility} />
        </div>
      </Scrollbar>
    </div>
  );
};

Sidebar.propTypes = {
  sidebar: PropTypes.shape({
    show: PropTypes.bool,
    collapse: PropTypes.bool
  }).isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
};

export default Sidebar;
