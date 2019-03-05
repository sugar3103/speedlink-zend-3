import React, { PureComponent } from 'react';
import Select from 'react-select-v1';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onInputChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      label: PropTypes.string,
    })),
    disabled: PropTypes.bool,
    clearable: PropTypes.bool
  };

  static defaultProps = {
    placeholder: '',
    options: [],
    disabled: false,
  };

  handleChange = (selectedOption) => {
    if (selectedOption && typeof selectedOption.value !== 'undefined') {
      this.props.onChange(selectedOption.value);
    } else {
      this.props.onChange(selectedOption);
    }
  };

  render() {
    const {
      value, name, placeholder, options, onInputChange,disabled,clearable
    } = this.props;    
    
    return (
      <Select
        disabled = {disabled}
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={clearable}
        className="form__form-group-select"
        placeholder={placeholder}
        onInputChange={onInputChange}
      />
    );
  }
}

const renderSelectField = props => {
  const { input, onInputChange, options, placeholder, disabled, clearable, meta } = props;
  const { messages } = props.intl; 
  return (
    <div className="form__form-group-input-wrap">
      <SelectField
        {...input}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        clearable={clearable}
      />
      {meta.touched && meta.error && <span className="form__form-group-error">{messages[meta.error]}</span>}
    </div>
  );
}

renderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    label: PropTypes.string,
  })),
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
  disabled: false,
  clearable: true
};

export default injectIntl(renderSelectField);
