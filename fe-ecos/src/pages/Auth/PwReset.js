import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PwReset extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="text-center m-b-20">
          <p className="text-muted m-b-0">Enter your email address and we'll send you an email with instructions to reset your password.</p>
        </div>
        <form className="form-horizontal" action="#">
          <div className="form-group row m-b-20">
            <div className="col-12">
              <label htmlFor="emailaddress">Email address</label>
              <input className="form-control" type="email" id="emailaddress" required placeholder="john@deo.com" />
            </div>
          </div>
          <div className="form-group row text-center m-t-10">
            <div className="col-12">
              <button className="btn btn-block btn-custom waves-effect waves-light" type="submit">Reset Password</button>
            </div>
          </div>
        </form>
        <div className="row m-t-50">
          <div className="col-sm-12 text-center">
            <p className="text-muted">Back to <Link to="/login" className="text-dark m-l-5"><b>Sign In</b></Link></p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PwReset;