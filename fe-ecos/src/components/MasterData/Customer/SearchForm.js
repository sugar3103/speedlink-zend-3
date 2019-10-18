import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { Button, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

class SearchForm extends Component {

  resetFilter = async () => {
    const { handleSubmit, reset } = this.props
    await reset();
    handleSubmit();
  }

  render() {
    const { handleSubmit } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['name']}</span>
              <div className="form__form-group-field">
                <Field
                  name="name"
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['customer.customer_no']}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_no"
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['customer.ref_id']}</span>
              <div className="form__form-group-field">
                <Field
                  name="ref_id"
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['customer.tax_no']}</span>
              <div className="form__form-group-field">
                <Field
                  name="tax_no"
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={renderSelectField}
                  type="text"
                  options={[
                    { value: -1, label: messages['all'] },
                    { value: 1, label: messages['active'] },
                    { value: 0, label: messages['inactive'] }
                  ]}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <Button size="sm" outline onClick={this.resetFilter}>
              {messages['clear']}</Button>
            <Button size="sm" color="primary" id="search" >
              {messages['search']}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'customer_search_form'
})(injectIntl(SearchForm));