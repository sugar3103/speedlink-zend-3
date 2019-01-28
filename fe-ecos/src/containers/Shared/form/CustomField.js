import React from 'react';
import PropTypes from 'prop-types';

const CustomField = ({
    input, placeholder, type, meta: { touched, error }, messages
  }) => (
    <div className="form__form-group-input-wrap">
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span className="form__form-group-error">{messages[error]}</span>}
    </div>
  );
  
CustomField.propTypes = {
input: PropTypes.shape().isRequired,
placeholder: PropTypes.string,
type: PropTypes.string,
meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
}),
messages: PropTypes.object
};
  
CustomField.defaultProps = {
placeholder: '',
meta: null,
type: 'text',
};

export default CustomField;