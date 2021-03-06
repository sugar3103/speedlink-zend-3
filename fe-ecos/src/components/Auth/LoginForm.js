import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import renderCheckBoxField from '../../containers/Shared/form/CheckBox';
import { injectIntl } from 'react-intl';
import validate from './validateLoginForm';
import CustomField from '../../containers/Shared/form/CustomField';
import { connect } from 'react-redux';
import LoadingIcon from 'mdi-react/LoadingIcon';
import { getSystemInfo } from '../../redux/actions';

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
  componentWillMount() {
    this.props.getSystemInfo();    
  }
  
  showPassword = e => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handleKeyDown = function (e, cb) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      cb();
    }
  };

  render() {
    const { handleSubmit, loading } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit} onKeyDown={(e) => { this.handleKeyDown(e, handleSubmit); }}>
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
          <Button 
            color="success" 
            outline 
            className={`account__btn expand ${loading && 'expand--load'}`} 
            type="submit"
            disabled={loading}
          >{loading && <LoadingIcon />}{messages['login.login']}</Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { loading } = authUser;
  return {
    loading
  }
}

export default connect(mapStateToProps, {
  getSystemInfo
})(reduxForm({ 
  form: 'log_in_form', 
  validate
})(injectIntl(LogInForm)));
