import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PageTitle extends PureComponent {

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.locale && nextProps.system.items) {
      document.title = `${nextProps.title} - ${nextProps.locale === "en" ? nextProps.system.items.name_en : nextProps.system.items.name}`;
    }
  }

  render() {
    return (
      <Fragment></Fragment>
    )
  }
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
}

const mapStateToProps = ({ settings, system }) => {
  const { locale } = settings;
  return {
    locale,
    system,
  }
}

export default connect(mapStateToProps, null)(PageTitle);