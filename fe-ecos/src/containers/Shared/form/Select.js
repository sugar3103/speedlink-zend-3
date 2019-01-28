import React, { PureComponent } from 'react';
import Select from 'react-select-v1';
import PropTypes from 'prop-types';

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
    }))
  };

  static defaultProps = {
    placeholder: '',
    options: [],
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
      value, name, placeholder, options, onInputChange
    } = this.props;

    return (
      <Select
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={true}
        className="form__form-group-select"
        placeholder={placeholder}
        onInputChange={onInputChange}
      />
    );
  }
}

const renderSelectField = props => (
  <div className="form__form-group-input-wrap">
    <SelectField
      {...props.input}
      onInputChange={props.onInputChange}
      options={props.options}
      placeholder={props.placeholder}
    />
    {props.meta.touched && props.meta.error && <span className="form__form-group-error">{props.messages[props.meta.error]}</span>}
  </div>
);

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
  onInputChange: PropTypes.func
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
};

export default renderSelectField;
