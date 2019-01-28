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
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.code']}</span>
            <div className="form__form-group-field">
              <Field
                name="code"
                component="input"
                type="text"
                placeholder={messages['hub.code']}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['hub.name']}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['hub.all'] },
                  { value: 1, label: messages['hub.active'] },
                  { value: 0, label: messages['hub.inactive'] }
                ]}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component="input"
                type="text"
                placeholder={messages['hub.city']}
              />
            </div>
          </div>
        </Col>
      {/*  <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['hub.all'] },
                  { value: 1, label: messages['hub.active'] },
                  { value: 0, label: messages['hub.inactive'] }
                ]}
              />
            </div>
          </div>
        </Col>*/}
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
          >{messages['hub.clear']}</Button>{' '}
          <Button 
            size="sm" 
            color="primary"
            id="search" 
          >{ messages['hub.search'] }</Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'hub_search_form',
  initialValues: {
    name: '',
    code: '',
    city: '',
    status: -1
  }
})(injectIntl(SearchForm));