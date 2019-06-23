import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import ContentEditable from 'react-contenteditable';
import { getPricingInternationalFieldVas } from '../../../redux/actions';

class FormulaField extends Component {

  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      tabSeleted: 0,
      suggesttionList: [],
      suggestion: false,
      textInput: '',
      html: ""
    };
  }

  componentWillMount() {
    this.props.getPricingInternationalFieldVas();
  }

  componentWillReceiveProps(nextProps) {
    const { fieldVas, input } = nextProps;
    if (fieldVas) {
      let suggesttionList = [];
      fieldVas.forEach(item => {
        suggesttionList.push({
          id: `$${item.id}`,
          name: item.name
        });
      })
      this.setState({ suggesttionList });

      if (suggesttionList && input && input.value) {
        let html = input.value;
        suggesttionList.forEach(item => {
          html = html.split(item.id).join(`&nbsp;<span contenteditable="false">${item.name}</span>&nbsp;`);
        });
        this.setState({ html });
      }
    }
  }
  
  handleSelectOption = value => {
    let { html } = this.state;
    const formula = html.slice(0, html.indexOf('@'));
    if (formula) {
      value = `${formula}<span contenteditable="false">${value.name}</span>&nbsp;`;
    } else {
      value = `&nbsp;<span contenteditable="false">${value.name}</span>&nbsp;`;
    }
    this.changeFormulaValue(value);
    this.setState({ suggestion: false, textInput: '', html: value });
    this.contentEditable.current.focus();
  }

  changeFormulaValue = (value) => {
    const { suggesttionList } = this.state;
    suggesttionList.forEach(item => {
      value = value.split(`<span contenteditable="false">${item.name}</span>`).join(item.id);
    });
    value = value.split(`&nbsp;`).join('');
    this.props.input.onChange(value);
    
  }

  onKeyPressed = (e) => {
    let { tabSeleted, textInput, suggesttionList } = this.state;
    const data = suggesttionList.filter(item => item.name.toLowerCase().indexOf(textInput) > -1);
    if (e.keyCode === 40) {
      e.preventDefault();
      tabSeleted = data.length === tabSeleted ? 1 : tabSeleted + 1;
    }
    if (e.keyCode === 38) {
      e.preventDefault(); 
      tabSeleted = (tabSeleted === 0 || tabSeleted - 1 === 0) ? data.length : tabSeleted - 1;
    }
    this.setState({ tabSeleted })

    if (e.keyCode === 13) {
      e.preventDefault();
      const item = data.find((item, index) => tabSeleted === index + 1);
      if (item) {
        this.handleSelectOption(item);
      }
    }
  }

  handleChangeFormula = e => {
    let { value } = e.target;
    this.changeFormulaValue(value);
    this.setState({ html: value });
    const arr = value.split(' ');
    const el = arr[arr.length - 1];
    if (el.indexOf('@') !== -1) {
      const textInput = el.replace('@', '').toLowerCase();
      this.setState({ suggestion: true, textInput, tabSeleted: 0 })
    } else {
      this.setState({ suggestion: false, textInput: '', tabSeleted: 0 })
    }
  }

  render() {
    const { tabSeleted, suggestion, textInput, html, suggesttionList } = this.state;
    const { input, placeholder, disabled, meta: { touched, error }, intl: { messages } } = this.props;
    const data = suggesttionList.filter(item => item.name.toLowerCase().indexOf(textInput) > -1);
    
    return (
      <div className="form__form-group-input-wrap input-suggestion">
        <ContentEditable
          innerRef={this.contentEditable}
          html={html} 
          disabled={disabled} 
          onChange={this.handleChangeFormula} 
          className="formula"
          onKeyDown={this.onKeyPressed}
          placeholder={placeholder}
        />
        <input 
          {...input} 
          hidden
          placeholder={placeholder} 
        />
        {touched && error && <span className="form__form-group-error">{messages[error]}</span>}
        {suggestion && 
          <div className="suggestion-list">
            <ul>
              {data.map((item, index) => (
                <li 
                  key={index} 
                  onClick={() => this.handleSelectOption(item)} 
                  className={tabSeleted === index + 1 ? 'active' : ''}
                >{item.name}</li>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}

FormulaField.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
  }),
  getPricingInternationalFieldVas: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
  
FormulaField.defaultProps = {
  placeholder: '',
  meta: null,
  disabled: false,
};

const mapStateToProps = ({ pricingInternational }) => {
  const { pricing: { fieldVas } } = pricingInternational;
  return {
    fieldVas
  }
}

export default connect(mapStateToProps, {
  getPricingInternationalFieldVas
})(injectIntl(FormulaField));