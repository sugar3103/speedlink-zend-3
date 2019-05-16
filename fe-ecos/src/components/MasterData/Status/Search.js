import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { connect } from 'react-redux';
import { getStatusList } from '../../../redux/actions';
import SearchForm from './SearchForm';
import  { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';

class Search extends Component {

  handleSubmit = values => {
    const params = {
      offset: {
        start: 1,
        limit: SELECTED_PAGE_SIZE
      },
      query: values
    }
    this.props.getStatusList(params);
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
  getStatusList: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  getStatusList
})(Search));