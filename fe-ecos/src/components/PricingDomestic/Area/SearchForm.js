import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  render() {
    const { handleSubmit, reset } = this.props;
    const { messages,locale } = this.props.intl;    
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__third">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_dom.name']}</span>
            <div className="form__form-group-field">
              <Field
                name={locale === 'en-US' ? 'name_en' : 'name'}
                component="input"
                type="text"
                placeholder={messages['name']}
              />
            </div>
          </div>
        </div>
        <div className="search-group-button">
          <Button 
            size="sm" 
            outline 
            onClick={(e)=> {
              reset();
              setTimeout(() => {
                handleSubmit();  
              }, 200);
            }}
          >{messages['clear']}</Button>{' '}
          <Button 
            size="sm" 
            color="primary"
            id="search" 
          >{ messages['search'] }</Button>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'area_domestic_search_form'
})(injectIntl(SearchForm));