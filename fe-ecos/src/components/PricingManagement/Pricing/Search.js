import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import  { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { getPricingList } from '../../../redux/actions';

class Search extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    const params = {
      offset: {
        start: 1,
        limit: SELECTED_PAGE_SIZE
      },
      query: values
    }
    this.props.getPricingList(params, messages);
    
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
  getPricingList: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  getPricingList
})(Search));