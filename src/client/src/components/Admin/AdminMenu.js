import React from 'react';
import { Link } from 'react-router-dom';

class AdminMenu extends React.Component{
  render(){
    return(
      <div className="column is-one-quarter">
        <aside className="menu">
          <p className="menu-label">
            Main Menu
          </p>
          <ul className="menu-list">
            <li>
              <Link to="/admin/dashboard">
                <span className="icon is-medium">
                  <i className="fa fa-tachometer-alt"></i>
                </span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/general">
                <span className="icon is-medium">
                  <i className="fa fa-cog"></i>
                </span>
                General Configuration
              </Link>
            </li>
            <li>
              <Link to="/admin/category">
                <span className="icon is-medium">
                  <i className="fa fa-folder"></i>
                </span>
                Category
              </Link>
            </li>
            <li>
              <Link to="/admin/sections">
                <span className="icon is-medium">
                  <i className="fa fa-list"></i>
                </span>
                Sections
              </Link>
            </li>
            <li>
              <Link to="/admin/service">
                <span className="icon is-medium">
                  <i className="fa fa-edit"></i>
                </span>
                Service
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default AdminMenu;
