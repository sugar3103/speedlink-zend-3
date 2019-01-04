import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
      <React.Fragment>
        <form className="form-horizontal" action="#">
          <div className="form-group row m-b-20">
            <div className="col-12">
              <label htmlFor="username">Full Name</label>
              <input className="form-control" type="email" id="username" required placeholder="Michael Zenaty" />
            </div>
          </div>
          <div className="form-group row m-b-20">
            <div className="col-12">
              <label htmlFor="emailaddress">Email address</label>
              <input className="form-control" type="email" id="emailaddress" required placeholder="john@deo.com" />
            </div>
          </div>
          <div className="form-group row m-b-20">
            <div className="col-12">
              <label htmlFor="password">Password</label>
              <input className="form-control" type="password" required id="password" placeholder="Enter your password" />
            </div>
          </div>
          <div className="form-group row m-b-20">
            <div className="col-12">
              <div className="checkbox checkbox-custom">
                <input id="remember" type="checkbox" defaultChecked />
                <label htmlFor="remember">
                  I accept <a href="333" className="text-custom">Terms and Conditions</a>
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row text-center m-t-10">
            <div className="col-12">
              <button className="btn btn-block btn-custom waves-effect waves-light" type="submit">Sign Up Free</button>
            </div>
          </div>
        </form>
        <div className="row m-t-50">
          <div className="col-sm-12 text-center">
            <p className="text-muted">Already have an account?  <Link to="/login" className="text-dark m-l-5"><b>Sign In</b></Link></p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;