import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { connect } from 'react-redux';
import { getZoneInternationalList } from '../../../redux/actions';
import SearchForm from './SearchForm';

class Search extends Component {

  handleSubmit = values => {
    const params = {
      offset: {
        start: 1,
        limit: this.props.pageSize
      },
      query: values
    }
    this.props.getZoneInternationalList(params);
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <div className="mb-2">
        <fieldset className="scheduler-border">
          <legend className="scheduler-border">{messages['search']}</legend>
          <SearchForm onSubmit={this.handleSubmit} />
        </fieldset>
      </div>
    );
  }
}

Search.propTypes = {
  getZoneInternationalList: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired
}

export default injectIntl(connect(null, {
  getZoneInternationalList
})(Search));