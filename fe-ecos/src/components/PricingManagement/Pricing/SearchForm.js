import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';

class SearchForm extends Component {

  hanldeChangeType = value => {
    console.log(value);
  }

  render() {
    const { handleSubmit, reset } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={6} sm={12}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['code.code']}</span>
            <div className="form__form-group-field">
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['range_weight.public'] },
                { value: 2, label: messages['range_weight.customer'] }
                ]}
                clearable={false}
                onChange={this.hanldeChangeType}
              />
            </div>
          </div>
        </Col>
        <Col md={6} sm={12}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['code.code']}</span>
            <div className="form__form-group-field">
              <Field
                name="code"
                component="input"
                type="text"
                placeholder={messages['code.code']}
              />
            </div>
          </div>
        </Col>
        <Col md={12} className="text-right search-group-button">
          <Button size="sm" outline onClick={(e) => {
            reset();
            setTimeout(() => {
              handleSubmit();
            }, 200);
          }} >
            {messages['clear']}</Button>{' '}
          <Button size="sm" color="primary" id="search" >
            {messages['search']}
          </Button>
        </Col>
      </form>
    );
  }
}

export default reduxForm({
  form: 'pricing_search_form'
})(injectIntl(SearchForm));