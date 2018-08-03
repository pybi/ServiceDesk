import React from 'react';
import axios from 'axios';

class ListSections extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sections: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.listSections = this.listSections.bind(this);
    this.clickSection = this.clickSection.bind(this);
  }

  componentDidMount() {
    this.listSections("");
  }

  componentWillReceiveProps(nextProps){
    this.listSections(nextProps.category);
  }

  listSections(category){
    var parent = this;
    axios.get('/api/sections/list/'+category)
    .then(function (res) {
      const sections = res.data.map(obj => ({
        id: obj._id,
        title: obj.title,
        icon: obj.icon,
        color:obj.color,
        labels:obj.labels
      }));
      parent.setState({ sections });
    }).catch(function (error) {
      console.log(error);
    });
  }

  clickSection(value){
    this.props.updateServices(value);
  }

  render(){
    if(this.state.sections.length > 0){
      return(
        <ul className="menu-list">
          {this.state.sections.map(section => (
            <li key={section.id}>
              <SectionLinks section={section} headerClickHandler={this.clickSection} />
            </li>
          ))}
        </ul>
      );
    } else {
      return(
        <div className="errorNotification">
          <span className="icon has-text-danger">
            <i className="fa fa-exclamation-triangle"></i>
          </span>
          Keine Sektion Vorhanden!
        </div>
      );
    }
  }
}

class SectionLinks extends React.Component{
  constructor(props){
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(){
    this.props.headerClickHandler(this.props.section.id);
  }
  render(){
    const section = this.props.section;
    return(
      <a value={section.id} onClick={this.clickHandler}>
        <span className="icon is-medium">
          <i className={'fa ' + section.icon} style={{color: section.color}}></i>
        </span>
        {section.title}
      </a>
    );
  }
}

export default ListSections;
