import React from 'react';
import axios from 'axios';

class ListServices extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      services: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getServiceList = this.getServiceList.bind(this);
  }
  componentDidMount() {
    this.getServiceList("", "");
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.getServiceList(nextProps.category, nextProps.section);
  }

  buildSectionUrl(categoryId, sectionId){
    var url;
    if(categoryId !== ""){
      if(sectionId !== ""){
          url = categoryId+"/"+sectionId;
      } else {
        url = categoryId;
      }
    }
    console.log(url);
    return url;
  }

  getServiceList(categoryId, sectionId){
    console.log('catID - '+ categoryId);
    console.log('secId - '+ sectionId);
    var urlExtension = this.buildSectionUrl(categoryId, sectionId);
    var parent = this;
    axios.get('/api/services/list/'+urlExtension)
    .then(function (res) {
      const services = res.data.map(obj => ({
        id: obj._id,
        title: obj.title,
        description: obj.description,
        sections:obj.sections
      }));
      parent.setState({ services });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return(
      <div>
        {this.state.services.map(service => (
          <div className="box" key={service.id}>
            <article className="media">
              <div className="media-left">
                <h4><i className="fas fa-file gray"></i></h4>
              </div>
              <div className="media-content">
                <div className="content">
                  <div className="headerContent">
                    <strong>{service.title}</strong>
                    <ServiceLabels sections={service.sections} />
                  </div>
                  <div className="bodyContent">
                    <p>
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="serviceActions">
                <div className="IconWrapper">
                  <DeleteService serviceKey={service.id} />
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  }
}


class ListServicesBySearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      services: [],
    }
    this.getServiceList = this.getServiceList.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.getServiceList(nextProps.searchContent);
  }

  getServiceList(searchContent){
    var parent = this;
    axios.get('/api/services/search/'+searchContent)
    .then(function (res) {
      const services = res.data.map(obj => ({
        id: obj._id,
        title: obj.title,
        description: obj.description,
        sections:obj.sections
      }));
      parent.setState({ services });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return(
      <div className="container">
        <div className="headList searchResults">
          <span>Search Results ({this.state.services.length})</span>
        </div>
        {this.state.services.map(service => (
          <div className="box" key={service.id} >
            <article className="media">
              <div className="media-left">
                <h4><i className="fas fa-file gray"></i></h4>
              </div>
              <div className="media-content">
                <div className="content">
                  <div className="headerContent">
                    <strong>{service.title}</strong>
                    <ServiceLabels sections={service.sections} />
                  </div>
                  <div className="bodyContent">
                    <p>
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="serviceActions">
                <div className="IconWrapper">
                  <DeleteService serviceKey={service.id} />
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  }
}

class ServiceLabels extends React.Component{
  render(){
    return(
      <div className="serviceTags">
        {this.props.sections.map(category => (
          <span key={category._id} style={{'color': category.color}}>
            <small>@{category.title} </small>
          </span>
        ))}
      </div>
    );
  }
}

class DeleteService extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
    }
    this.deleteService = this.deleteService.bind(this);
  }

  deleteService(id){
    console.log(this.props.serviceKey);

    axios.post('api/services/delete', {
      id: this.props.serviceKey,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return(
      <a onClick={this.deleteService} >
        <span className="icon is-medium">
          <span className="fa-stack">
            <i className="fas fa-circle fa-stack-2x red"></i>
            <i className="fas fa-trash fa-stack-1x fa-inverse"></i>
          </span>
        </span>
      </a>
    );
  }
}

export {ListServicesBySearch, ListServices};
