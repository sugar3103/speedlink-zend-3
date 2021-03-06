import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CloseIcon from 'mdi-react/CloseIcon';
import PropTypes from 'prop-types';
import { SidebarProps, ThemeProps } from '../../Shared/prop-types/ReducerProps';
import ToggleTheme from './ToggleTheme';
import ToggleCollapsedMenu from './ToggleCollapsedMenu';
import { injectIntl } from 'react-intl';

const settings = `${process.env.PUBLIC_URL}/img/settings.svg`;

class Customizer extends PureComponent {
  static propTypes = {
    sidebar: SidebarProps.isRequired,
    theme: ThemeProps.isRequired,
    changeToDark: PropTypes.func.isRequired,
    changeToDarkBlue: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
    system: PropTypes.any
  };

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const customizerClass = classNames({
      customizer__wrap: true,
      'customizer__wrap--open': this.state.open,
    });

    const {
      theme,
      changeToDark,
      changeToDarkBlue,
      changeToLight,
      system,
      changeSidebarVisibility,
      sidebar
    } = this.props;
    
    const { messages } = this.props.intl;
    if(system) {
      if(system.allow_customizer === '1') {
        return (
          <div className="customizer">
            <button className="customizer__btn" onClick={this.handleOpen}>
              <img className="customizer__btn-icon" src={settings} alt="icon" />
            </button>
            {this.state.open && <button className="topbar__back" onClick={this.handleOpen} />}
            <div className={customizerClass}>
              <div className="customizer__title-wrap">
                <h5>{messages['theme.title-setting']}</h5>
                <button className="customizer__close-btn" onClick={this.handleOpen}>
                  <CloseIcon />
                </button>
              </div>
              <p className="customizer__caption">{messages['theme.desc-setting']}</p>
              <ToggleCollapsedMenu changeSidebarVisibility={changeSidebarVisibility} sidebar={sidebar} />
              <ToggleTheme changeToDark={changeToDark} changeToLight={changeToLight} changeToDarkBlue={changeToDarkBlue} theme={theme} />
            </div>
          </div>
        );
      }
        else {
        return '';
      } 
      
    } else {
      return '';
    }
    
    
  }
}

export default injectIntl(Customizer);
