import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import SearchForm from './SearchForm';

class Search extends Component {
  handleSubmit = values => {
    console.log(values);
    
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

export default injectIntl(Search);