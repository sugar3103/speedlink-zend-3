import React, { Component, Fragment } from "react";
import IntlMessages from "../../util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import createNotification from '../../util/notifications';

import { Colxx } from "../Layout/CustomBootstrap";

import { connect } from "react-redux";
import { loginUser, alertClear } from "../../redux/actions";

import PropTypes from 'prop-types';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidMount() {
    document.body.classList.add("background");
  }

  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.alert) {
      createNotification(nextProps.alert);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.alert)
      this.props.alertClear();
  }
    
  onUserLogin = () => {
    if (this.state.username !== "" && this.state.password !== "") {
      this.props.loginUser(this.state, this.props.history);
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <NotificationContainer />
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2"><IntlMessages id="user.title-page" /></p>
                    <p className="white mb-0">
                      <IntlMessages id="user.login-text-1" />
                      <br />
                      <IntlMessages id="user.login-text-2" /> &nbsp;
                      <NavLink to={`/register`} className="white">
                        <IntlMessages id="user.register-text" />
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <h5>
                      <CardTitle className="mb-4">
                        <IntlMessages id="user.login-title" />
                      </CardTitle>
                    </h5>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input 
                          type="text" 
                          name="username"
                          onChange={this.onChange}
                          defaultValue={this.state.username} 
                        />
                        <IntlMessages id="user.username" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input 
                          type="password" 
                          name="password"
                          onChange={this.onChange}
                          defaultValue={this.state.password}
                        />
                        <IntlMessages id="user.password" />
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={this.onUserLogin}
                        >
                          <IntlMessages id="user.login-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}

Login.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }).isRequired,
  loginUser: PropTypes.func.isRequired,
  alertClear: PropTypes.func.isRequired,
}

const mapStateToProps = ({ alert }) => {
  return {
    alert: alert
  }
};

export default connect(mapStateToProps,
  {
    loginUser,
    alertClear
  }
)(Login);
