import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import LogInForm from '../../components/Auth/LoginForm';

class LogIn extends Component {

  handleSubmit = values => {
    console.log(values);
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

export default injectIntl(LogIn);
