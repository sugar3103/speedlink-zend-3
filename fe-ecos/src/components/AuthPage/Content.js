import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {
  render() {
    return (
      <div className="wrapper-page account-page-full">
        <div className="card">
          <div className="card-block">
            <div className="account-box">
              <div className="card-box p-5">
                <h2 className="text-uppercase text-center pb-4">
                  <Link to="/" className="text-success">
                    <span><img src="/assets/images/logo.png" alt="" height={26} /></span>
                  </Link>
                </h2>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <div className="m-t-40 text-center">
          <p className="account-copyright">2018 © Highdmin. - Coderthemes.com</p>
        </div>
      </div>
    );
  }
}

export default Content;