import React from 'react';
import { Link } from 'react-router-dom';
import Panel from '../AuthPage/Panel';
import Content from '../AuthPage/Content';

const NotFoundPage = () => {
  return (
    <div className="account-pages">
      <Panel />
      <Content>
        <div className="text-center">
          <h1 className="text-error">404</h1>
          <h4 className="text-uppercase text-danger mt-3">Page Not Found</h4>
          <p className="text-muted mt-3">It's looking like you may have taken a wrong turn. Don't worry... it
          happens to the best of us. Here's a little tip that might help you get back on track.</p>
          <Link className="btn btn-md btn-block btn-custom waves-effect waves-light mt-3" to="/"> Return Home</Link>
        </div>
      </Content>
    </div>
  );
};

export default NotFoundPage;