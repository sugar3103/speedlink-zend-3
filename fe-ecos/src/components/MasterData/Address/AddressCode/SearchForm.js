import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  render() {
    const { handleSubmit, reset } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={4}>
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
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['code.district']}</span>
            <div className="form__form-group-field">
              <Field
                name="district"
                component="input"
                type="text"
                placeholder={messages['code.district']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['code.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component="input"
                type="text"
                placeholder={messages['code.country']}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['code.ward']}</span>
            <div className="form__form-group-field">
              <Field
                name="ward"
                component="input"
                type="text"
                placeholder={messages['code.ward']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['code.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component="input"
                type="text"
                placeholder={messages['code.city']}
              />
            </div>
          </div>
          <div className="text-right search-group-button">
            <Button
              size="sm"
              outline
              onClick={(e) => {
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
            >{messages['search']}</Button>
          </div>
        </Col>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'code_search_form',
})(injectIntl(SearchForm));