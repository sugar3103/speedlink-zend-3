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
      <form className="form" onSubmit={handleSubmit} id="fromSearchCarrier">
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['carrier.code']}</span>
            <div className="form__form-group-field">
              <Field name="name" component="input" type="text" placeholder={messages['carrier.name']} />
            </div>
          </div>
        </div>
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['carrier.status']}</span>
            <div className="form__form-group-field">
              <Field name="carrier" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['carrier.all'] },
                { value: 1, label: messages['carrier.active'] },
                { value: 0, label: messages['carrier.inactive'] }
                ]}
              />
            </div>
          </div>
        </div>
        <div className="search-group-button">
          <Button size="sm" outline onClick={(e)=> {
            reset();
            setTimeout(() => {
              handleSubmit();
            }, 200);
          }} >
            {messages['carrier.clear']}</Button>{' '}
          <Button size="sm" color="primary" id="search" >
            {messages['carrier.search']}
          </Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'carrier_search_form',
  initialValues: {
    name: '',
    carrier: -1
  }
})(injectIntl(SearchForm));