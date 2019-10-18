import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getShipmentTypeList } from '../../../../redux/actions';
import SearchForm from './SearchForm';

class Search extends Component {
  handleSubmit = values => {
    const params = {
      offset: {
        start: 1,
        limit: this.props.pageSize
      },
      query: values
    };
    this.props.getShipmentTypeList(params);
  };

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
  getShipmentTypeList: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default injectIntl(connect(null, {
  getShipmentTypeList
})(Search));