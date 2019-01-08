import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember_me: false,
      submitted: false
    }
  }

  handleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, remember_me } = this.state;
    this.props.onLogin(username, password, remember_me)
  }
  
  
  render() {
    const { username, password, remember_me } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group m-b-20 row">
            <div className="col-12">
              <label htmlFor="emailaddress">Email address</label>
              <input 
                className="form-control" 
                name="username"
                type="text" 
                id="emailaddress" 
                placeholder="Enter your email" 
                value={username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row m-b-20">
            <div className="col-12">
              <Link to="/password_reset" className="text-muted float-right"><small>Forgot your password?</small></Link>
              <label htmlFor="password">Password</label>
              <input 
                className="form-control" 
                name="password"
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row m-b-20">
            <div className="col-12">
              <div className="checkbox checkbox-custom">
                <input 
                  name="remember_me"
                  id="remember_me" 
                  type="checkbox" 
                  value={remember_me}
                  checked={remember_me}
                  onChange={this.handleChange}
                />
                <label htmlFor="remember_me">
                  Remember me
          </label>
              </div>
            </div>
          </div>
          <div className="form-group row text-center m-t-10">
            <div className="col-12">
              <button className="btn btn-block btn-custom waves-effect waves-light" type="submit">Sign In</button>
            </div>
          </div>
        </form>
        <div className="row m-t-50">
          <div className="col-sm-12 text-center">
            <p className="text-muted">Don't have an account? <Link to="/register" className="text-dark m-l-5"><b>Sign Up</b></Link></p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogin: (username, password, remember_me) => {
      return dispatch(userActions.login(username, password, remember_me))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);