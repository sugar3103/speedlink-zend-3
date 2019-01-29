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
    if(theme.className === "theme-light") {
      document.body.classList.remove('theme-dark');
      document.body.classList.add(theme.className);
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add(theme.className);
    }
    
  }
  render() {
    const { theme } = this.props;
    this.addClassBody(theme)
    return (      
        <div className="wrapper">
          {this.props.children}
        </div>
    
    );
  }
}

const mapStateToProps = ({settings}) => {
  const { theme } = settings;
  return {
    theme
  }
}

export default connect(mapStateToProps, null)(MainWrapper);
