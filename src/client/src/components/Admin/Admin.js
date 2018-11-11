import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminMenu from './AdminMenu.js';
import NewService from './NewService.js';
import Category from './Category/CategoryList.js';
import Sections from './Sections.js';
import Dashboard from './Dashboard.js';
import '../../style/admin.css';
//import { Link } from 'react-router-dom';

class Admin extends React.Component {

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <AdminMenu />
            <div className="column">
              <Switch>
                <Route exact path='/admin/dashboard' component={Dashboard}/>
                <Route path='/admin/category' component={Category}/>
                <Route path='/admin/sections' component={Sections}/>
                <Route path='/admin/service' component={NewService}/>
              </Switch>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Admin;
