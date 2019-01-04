import React from 'react';

const Logo = () => {
  return (
    <div className="topbar-left">
      <a href="index.html" className="logo">
        <span>
          <img src="/assets/images/logo.png" alt="" height={22} />
        </span>
        <i>
          <img src="/assets/images/logo_sm.png" alt="" height={28} />
        </i>
      </a>
      <div className="clearfix"></div>
    </div>
  );
};

export default Logo;