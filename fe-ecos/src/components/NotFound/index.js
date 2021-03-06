import React from 'react';
import { Link } from 'react-router-dom';

const Image404 = `${process.env.PUBLIC_URL}/img/404/404.png`;

const NotFound404 = () => (
  <div className="not-found">
    <div className="not-found__content">
      <img className="not-found__image" src={Image404} alt="404" />
      <h3 className="not-found__info">Ooops! The page you are looking for could not be found :(</h3>
      <Link className="btn btn-primary" to="/">Back Home</Link>
    </div>
  </div>
);

export default NotFound404;
