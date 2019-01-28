import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProps } from '../Shared/prop-types/ReducerProps';

class MainWrapper extends PureComponent {
  static propTypes = {
    theme: ThemeProps.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { theme } = this.props;
    return (
      <div className={theme.className}>
        <div className="wrapper">
          {this.props.children}
        </div>
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
