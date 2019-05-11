import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import LogInForm from '../../components/Auth/LoginForm';
import { loginUser } from '../../redux/actions';
import PropTypes from 'prop-types';
import createNotification from '../../util/notifications';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      from: ''
    }
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.from) {
      this.setState({
        from: this.props.location.state.from
      });
      createNotification({ type: 'warning', message: 'login.login-again' });
    }
  }
  

  handleSubmit = values => {
    this.props.loginUser(values, this.state.from);
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
