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
            <span className="form__form-group-label">{messages['ward.name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['ward.name']}
              />
            </div>
          </div>
        </div>
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['ward.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['ward.all'] },
                  { value: 1, label: messages['ward.active'] },
                  { value: 0, label: messages['ward.inactive'] }
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
          >{messages['ward.clear']}</Button>{' '}
          <Button 
            size="sm" 
            color="primary"
            id="search" 
          >{ messages['ward.search'] }</Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'ward_search_form',
})(injectIntl(SearchForm));