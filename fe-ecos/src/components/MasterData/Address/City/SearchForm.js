import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';

class SearchForm extends Component {
  render() {
    const { handleSubmit, reset } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['city.name']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component="input"
                type="text"
                placeholder={messages['city.country']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['city.all'] },
                  { value: 1, label: messages['city.active'] },
                  { value: 0, label: messages['city.inactive'] }
                ]}
              />
            </div>
          </div>
        </Col>
        <Col md={12} className="text-right search-group-button">
            <Button 
              size="sm" 
              outline 
              onClick={(e)=> {
                reset();
                setTimeout(() => {
                  handleSubmit();  
                }, 200);
              }}
            >{messages['city.clear']}</Button>{' '}
            <Button 
              size="sm" 
              color="primary"
              id="search" 
            >{ messages['city.search'] }</Button>
        </Col>
      </form>
    );
  }
}

export default reduxForm({
  form: 'city_search_form',
})(injectIntl(SearchForm));