import React, { PureComponent } from 'react';
import Select from 'react-select-v1';
import PropTypes from 'prop-types';

class MultiSelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      label: PropTypes.string,
    })),
    disabled: PropTypes.bool
  };

  static defaultProps = {
    placeholder: '',
    options: [],
    disabled: false
  };

  handleChange = (selectedOptions) => {
    this.props.onChange(selectedOptions.map(selected => { return selected.value }));
  };

  render() {
    const {
      value, name, placeholder, options,disabled
    } = this.props;    
    return (
      <Select
        multi
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        className="form__form-group-select"
        closeOnSelect={false}
        removeSelected={true}
        placeholder={placeholder}
        disabled = {disabled}
      />
    );
  }
}

const renderMultiSelectField = props => (
  <div className="form__form-group-input-wrap">  
    <MultiSelectField
      {...props.input}
      options={props.options}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />    
    {props.meta.touched && props.meta.error && <span className="form__form-group-error">{props.messages[props.meta.error]}</span>}
  </div>
);

renderMultiSelectField.propTypes = {
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
      PropTypes.number,
      PropTypes.string
    ]),
    label: PropTypes.string,
  })),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

renderMultiSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
  disabled: false
};

export default renderMultiSelectField;

