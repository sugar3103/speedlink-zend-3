import React from 'react';
import PropTypes from 'prop-types';

const CustomField = ({
    input, placeholder, type, meta: { touched, error }, messages, disabled,autocomplete
  }) => (
    <div className="form__form-group-input-wrap">
      <input {...input} placeholder={placeholder} type={type} disabled={disabled} autoComplete={autocomplete}/>
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
messages: PropTypes.object,
disabled: PropTypes.bool,
autocomplete: PropTypes.string
};
  
CustomField.defaultProps = {
placeholder: '',
meta: null,
type: 'text',
disabled: false,
autocomplete: 'off'
};

export default CustomField;