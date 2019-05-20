import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

class DatePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    this.props.onChange(date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      const date = new Date(nextProps.value);
      this.setState({ startDate: date })
    }
  }

  render() {
    return (
      <div className="date-picker">
        <DatePicker
          className="form__form-group-datepicker"
          selected={this.state.startDate}
          onChange={this.handleChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    );
  }
}

const renderDatePickerField = props => {
  const { input, meta } = props;
  const { messages } = props.intl; 
  return (
    <div className="form__form-group-input-wrap">
      <DatePickerField
        {...input}
      />
      {meta.touched && meta.error && <span className="form__form-group-error">{messages[meta.error]}</span>}
    </div>
  )
};

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default injectIntl(renderDatePickerField);
