import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarLanguage from './TopbarLanguage';
// import TopbarMail from './TopbarMail';
import TopbarNotification from './TopbarNotification';
import TopbarSearch from './TopbarSearch';
import { Breadcrumbs } from 'react-breadcrumbs';

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
              <TopbarSidebarButton
                changeMobileSidebarVisibility={changeMobileSidebarVisibility}
                changeSidebarVisibility={changeSidebarVisibility}
              />
              <Link className="topbar__logo" to="/dashboards" />
            
          </div>
          <Breadcrumbs className="topbar__title" />
          <div className="topbar__right">

            <TopbarSearch />
            <TopbarNotification />
            {/* <TopbarMail new /> */}
            <TopbarProfile />
            <TopbarLanguage />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
