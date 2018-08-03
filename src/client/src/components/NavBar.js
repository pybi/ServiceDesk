import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/confluence-logo.png';

class NavigationBar extends React.Component {

  render() {
    return (
      <nav className="navbar navigationBorder">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} width="150" alt="Confluence Logo" />
          </a>
          <Link className="navbar-item" to="/">
            <span className="icon is-medium">
              <i className="fas fa-home"></i>
            </span>
            Home
          </Link>
          <a className="navbar-item">
            Request Help
          </a>
          <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to="/admin">
            <span className="icon is-medium">
              <i className="fas fa-lock"></i>
            </span>
            Admin
          </Link>
        </div>
      </nav>
    );
  }
}


export default NavigationBar;
