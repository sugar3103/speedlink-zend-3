import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import renderCheckBoxField from '../../containers/Shared/form/CheckBox';
import { injectIntl } from 'react-intl';
import validate from './validateLoginForm';
import CustomField from '../../containers/Shared/form/CustomField';

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  showPassword = e => {
    e.preventDefault();
    console.log(e);
    
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">{messages['login.username']}</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="username"
              component={CustomField}
              type="text"
              placeholder={messages['login.username']}
              messages={messages}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">{messages['login.password']}</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component={CustomField}
              type={this.state.showPassword ? 'text' : 'password'}
              placeholder={messages['login.password']}
              messages={messages}
            />
            <button
              className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            ><EyeIcon />
            </button>
          </div>
          <div className="account__forgot-password" hidden>
            <a href="/">{messages['login.forgot-password']}</a>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label={messages['login.remember-me']}
            />
          </div>
        </div>
        <div className="account__btns">
          <Button color="success" outline className="account__btn" type="submit">{messages['login.login']}</Button>
          {/* <Link className="btn btn-outline-primary account__btn" to="/register">{messages['login.register']}</Link> */}
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form',
  validate
})(injectIntl(LogInForm));
