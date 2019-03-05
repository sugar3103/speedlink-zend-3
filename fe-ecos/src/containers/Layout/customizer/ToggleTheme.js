import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProps } from '../../Shared/prop-types/ReducerProps';
import { injectIntl } from 'react-intl';

class ToggleTheme extends PureComponent {
  static propTypes = {
    theme: ThemeProps.isRequired,
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    changeToDarkBlue: PropTypes.func.isRequired
  };

  onChangeHandle(e) {
    const { changeToLight, changeToDark,changeToDarkBlue } = this.props;
    switch (e.target.value) {
      case 'light':
        changeToLight();
        break;
      case 'dark':
        changeToDark()
        break;      
      case 'dark-blue': 
        changeToDarkBlue();
        break;
      default:
        break;
    }
  }
  render() {
    const { theme } = this.props;
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <div className="toggle-theme" onChange={this.onChangeHandle.bind(this)}>
          <hr />
          <p className="customizer__caption">Colors</p>

          <div className="form__form-group">
            <div className="form__form-group-field">
              <label className="radio-btn">
                <input
                  className="radio-btn__radio"
                  name="color"
                  type="radio"
                  value="light"
                  defaultChecked={theme.className === 'theme-light'}                  
                />
                <span className="radio-btn__radio-custom" />
                <span className="radio-btn__label">{messages['light']}</span>
              </label>
            </div>
          </div>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <label className="radio-btn">
                <input
                  className="radio-btn__radio"
                  name="color"
                  type="radio"
                  value="dark"
                  defaultChecked={theme.className === 'theme-dark'}                  
                />
                <span className="radio-btn__radio-custom" />
                <span className="radio-btn__label">{messages['dark']}</span>
              </label>
            </div>
          </div>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <label className="radio-btn">
                <input
                  className="radio-btn__radio"
                  name="color"
                  type="radio"
                  value="dark-blue"
                  defaultChecked={theme.className === 'theme-dark-blue'}                  
                />
                <span className="radio-btn__radio-custom" />
                <span className="radio-btn__label">{messages['dark-blue']}</span>
              </label>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default injectIntl(ToggleTheme);
