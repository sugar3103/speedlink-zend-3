import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const CustomField = ({
    input, placeholder, type, meta: { touched, error }, intl: { messages }, disabled, autocomplete,autoCorrect,spellCheck, readOnly
  }) => (
    <div className="form__form-group-input-wrap">
      <input 
        {...input} 
        placeholder={placeholder} 
        type={type} 
        disabled={disabled} 
        autoComplete={autocomplete}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
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
disabled: PropTypes.bool,
autocomplete: PropTypes.string,
autoCorrect: PropTypes.string,
spellCheck: PropTypes.string,
readOnly: PropTypes.bool
};
  
CustomField.defaultProps = {
placeholder: '',
meta: null,
type: 'text',
disabled: false,
autocomplete: 'off',
autoCorrect : "on",
spellCheck : "on",
readOnly: false
};

export default injectIntl(CustomField);