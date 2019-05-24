import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import ContentEditable from 'react-contenteditable';

class FormulaField extends Component {

  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      tabSeleted: 0,
      suggestion: false,
      suggestionList: [
        { id: 1, name: 'Shipment Type' },
        { id: 2, name: 'Length' },
        { id: 3, name: 'Height' },
        { id: 4, name: 'Width' },
        { id: 4, name: 'PCS' },
      ],
      textInput: '',
      html: ""
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.input.value })
  }
  
  handleSelectOption = value => {
    let { html } = this.state;
    const formula = html.slice(0, html.indexOf('@'));
    value = `${formula} <span contenteditable="false">${value.name}</span>`;
    this.setState({ suggestion: false, textInput: '', html: value });
  }

  onKeyPressed = (e) => {
    let { tabSeleted, suggestionList, textInput } = this.state;
    const data = suggestionList.filter(item => item.name.indexOf(textInput) > -1);
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
    value = value.replace('&nbsp;', ' ');
    this.setState({ html: value });
    const arr = value.split(' ');
    const el = arr[arr.length - 1];
    if (el.indexOf('@') !== -1) {
      const textInput = el.replace('@', '');
      this.setState({ suggestion: true, textInput, tabSeleted: 0 })
    } else {
      this.setState({ suggestion: false, textInput: '', tabSeleted: 0 })
    }

  }

  render() {
    const { tabSeleted, suggestion, suggestionList, textInput, html } = this.state;
    const { input, placeholder, meta: { touched, error }, intl: { messages } } = this.props;
    const data = suggestionList.filter(item => item.name.indexOf(textInput) > -1);
    
    return (
      <div className="form__form-group-input-wrap input-suggestion">
        <ContentEditable
          innerRef={this.contentEditable}
          html={html} 
          disabled={false} 
          onChange={this.handleChangeFormula} 
          className="formula"
          onKeyDown={this.onKeyPressed}
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
};
  
FormulaField.defaultProps = {
  placeholder: '',
  meta: null,
};

export default injectIntl(FormulaField);