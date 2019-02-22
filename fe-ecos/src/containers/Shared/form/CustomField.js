import React from 'react';
import PropTypes from 'prop-types';

const CustomField = ({
    input, placeholder, type, meta: { touched, error }, messages, disabled, autocomplete, readOnly
  }) => (
    <div className="form__form-group-input-wrap">
      <input 
        {...input} 
        placeholder={placeholder} 
        type={type} 
        disabled={disabled} 
        autoComplete={autocomplete}
        readOnly={readOnly}
      />
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
autocomplete: PropTypes.string,
readOnly: PropTypes.bool
};
  
CustomField.defaultProps = {
placeholder: '',
meta: null,
type: 'text',
disabled: false,
autocomplete: 'off',
readOnly: false
};

export default CustomField;