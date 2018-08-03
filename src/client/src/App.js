import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

// My Components
import NavigationBar from './components/NavBar.js'
import Admin from './components/Admin/Admin.js';
import ListSections from './components/ListSections.js';
import SearchBanner from './components/Search.js';
import {ListServices, ListServicesBySearch} from './components/Services.js';
import {CategoryMenuList, ListCategories} from './components/Categories.js';

import './allfontawesome.js';
import './style/bulma.min.css';
import './style/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <div>
            <NavigationBar />
          </div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/admin' component={Admin}/>
          </Switch>
      </div>
    );
  }
}

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchContent : "",
    }
    this.updateSearchContent = this.updateSearchContent.bind(this);
  }
  updateSearchContent(value){
    this.setState({searchContent:value});
  }

  render(){
    return(
      <div className="Home">
        <SearchBanner updateSearchContent={this.updateSearchContent} />
        <MainSection search={this.state.searchContent} />
      </div>
    );
  }
}

class MainSection extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      categoryId : "",
      sectionId : "",
    }
    this.updateServices = this.updateServices.bind(this);
    this.updateServicesBySection = this.updateServicesBySection.bind(this);
  }

  updateServices(val){
    console.log(val);
    this.setState({categoryId:val});
    this.setState({sectionId:""});
  }
  updateServicesBySection(val){
    console.log(val);
    this.setState({sectionId:val});
  }

  render(){
    console.log(this.props.search);
    if(this.props.search == ""){
      return(
        <div className="container">
          <CategoryMenuList updateServices={this.updateServices} />
          <div className="columns">
            <div className="column is-one-quarter">
              <SectionMenu updateServices={this.updateServicesBySection} category={this.state.categoryId} />
            </div>
            <div className="column">
              <ListServices section={this.state.sectionId} category={this.state.categoryId}/>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <ListServicesBySearch searchContent={this.props.search} />
      );
    }
  }
}

class SectionMenu extends React.Component{
  render(){
    return(
      <aside className="menu">
        <p className="menu-label">
          Departments
        </p>
        <ListSections updateServices={this.props.updateServices} category={this.props.category} />
      </aside>
    );
  }
}

export default App;
