import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProps } from '../Shared/prop-types/ReducerProps';

class MainWrapper extends PureComponent {
  static propTypes = {
    theme: ThemeProps.isRequired,
    children: PropTypes.element.isRequired,
  };

  addClassBody(theme) {
    const { system } = this.props;

    let color = (system.items) ? system.items.default_color : 'light';
    if (theme) {
      if (theme === "theme-light") {
        document.body.classList.remove('theme-dark');
        document.body.classList.add(theme);
      } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add(theme);
      }
    } else {
      document.body.classList.add('theme-' + color);
      localStorage.setItem('currentTheme', 'theme-' + color);
    }
  }
  componentWillReceiveProps(nextProps) {    
    const { system, locale } = nextProps;
    if (system.items && Object.keys(system.items).length > 0) {
      document.title = (locale === 'en') ? system.items.name_en : system.items.name;
      document.title += (system.items.owner) ? ' - ' + system.items.owner : '';
    }
  }

  render() {
    const { theme } = this.props;
    this.addClassBody(theme.className)    
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({ settings, system, authUser }) => {
  const { theme, locale } = settings;
  return {
    theme,
    locale,
    system,
    authUser
  }
}

export default connect(mapStateToProps, null)(MainWrapper);
