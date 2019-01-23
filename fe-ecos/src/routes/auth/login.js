import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import LogInForm from '../../components/Auth/LoginForm';
import { loginUser } from '../../redux/actions';
import PropTypes from 'prop-types';

class LogIn extends Component {

  handleSubmit = values => {
    this.props.loginUser(values);
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">{messages['login.welcome']}
                  <span className="account__logo"> Speed
                    <span className="account__logo-accent">LINK</span>
                </span>
              </h3>
              <h4 className="account__subhead subhead">{messages['login.note']}</h4>
            </div>
            <LogInForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    )
  }
};

LogIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default injectIntl(connect(null, {
  loginUser
})(LogIn));
