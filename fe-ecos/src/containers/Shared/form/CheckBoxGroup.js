import React, { Component } from 'react';
import { Field } from "redux-form";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckIcon from 'mdi-react/CheckIcon';
import CloseIcon from 'mdi-react/CloseIcon';

export default class CheckboxGroup extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired
  };

  field = ({ input, meta, options, disabled, className, color, messages }) => {

    const { name, onChange } = input;
    const { touched, error } = meta;
    const inputValue = input.value;
    const CheckboxClass = classNames({
      'checkbox-btn': true,
      disabled,
    });

    const checkboxes = options.map(({ label, value }, index) => {

      const handleChange = (event) => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        }
        else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <label
          key={`checkbox-${index}`}
          className={`${CheckboxClass} ${className ? ` checkbox-btn--${className}` : ''}`}
        >
          <input
            className="checkbox-btn__checkbox"
            disabled={disabled}
            type="checkbox"
            name={`${name}[${index}]`}
            value={value}
            checked={checked}
            onChange={handleChange}
          />
          <span
            className="checkbox-btn__checkbox-custom"
            style={color ? { background: color, borderColor: color } : {}}
          >
            <CheckIcon />
          </span>
          {className === 'button' ?
            <span className="checkbox-btn__label-svg">
              <CheckIcon className="checkbox-btn__label-check" />
              <CloseIcon className="checkbox-btn__label-uncheck" />
            </span> : ''}
          <span className="checkbox-btn__label">
            {label}
          </span>
        </label>
      );
    });

    return (
        <div className="form__form-group-input-wrap">
          {checkboxes}
          {touched && error && <span className="form__form-group-error">{messages[error]}</span>}
        </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}