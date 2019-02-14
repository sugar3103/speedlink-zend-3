import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProps } from '../Shared/prop-types/ReducerProps';
import { getSetting } from '../../redux/actions';

class MainWrapper extends PureComponent {
  static propTypes = {
    theme: ThemeProps.isRequired,
    children: PropTypes.element.isRequired,
  };
  
  addClassBody(theme) {
    const { setting } = this.props;
    
    let color = (setting.items) ? setting.items.default_color : 'light';
    if(theme) {
      if(theme === "theme-light") {
        document.body.classList.remove('theme-dark');
        document.body.classList.add(theme);
      } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add(theme);        
      }
    } else {
      document.body.classList.add('theme-'+ color);
      localStorage.setItem('currentTheme', 'theme-'+ color);
    }
  }

  componentDidMount() {
    this.props.getSetting();
  }

  componentWillReceiveProps(nextProps) {
    const {setting,locale} = nextProps;
    
    if(setting.items) {
      document.title = (locale === 'en') ? setting.items.name_en : setting.items.name;
      document.title += (setting.items.owner) ? ' - '+ setting.items.owner : '';
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

const mapStateToProps = ({settings,setting}) => {
  const { theme,locale } = settings;
  return {
    theme,
    locale,
    setting
  }
}

export default connect(mapStateToProps, {
  getSetting
})(MainWrapper);
