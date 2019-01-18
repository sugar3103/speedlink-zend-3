import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const CustomField = injectIntl(({
    input, placeholder, type, meta: { touched, error }, intl
  }) => (
    <div className="form__form-group-input-wrap">
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span className="form__form-group-error">{intl.messages[error]}</span>}
    </div>
  ));
  
CustomField.propTypes = {
input: PropTypes.shape().isRequired,
placeholder: PropTypes.string,
type: PropTypes.string,
meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
}),
intl: PropTypes.shape()
};
  
CustomField.defaultProps = {
placeholder: '',
meta: null,
type: 'text',
};

export default CustomField;