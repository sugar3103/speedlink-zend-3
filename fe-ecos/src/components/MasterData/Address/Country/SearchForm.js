import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button } from 'reactstrap';

class SearchForm extends Component {
  render() {
    const { handleSubmit, reset } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['country.name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['country.name']}
              />
            </div>
          </div>
        </div>
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['country.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['country.all'] },
                  { value: 1, label: messages['country.active'] },
                  { value: 0, label: messages['country.inactive'] }
                ]}
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
          >{messages['country.clear']}</Button>{' '}
          <Button 
            size="sm" 
            color="primary"
            id="search" 
          >{ messages['country.search'] }</Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'country_search_form',
})(injectIntl(SearchForm));