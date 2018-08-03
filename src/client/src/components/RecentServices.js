import React from 'react';
import axios from 'axios';

class RecentlyAddedServices extends React.Component{
  render(){
    return(
      <aside className="menu">
        <p className="menu-label">
          Recently Added
        </p>
        <RecentServices />
      </aside>
    );
  }
}

class ListRecentServices extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      services: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var parent = this;
    axios.get('/api/services/list')
    .then(function (res) {
      const services = res.data.map(obj => ({
        id: obj._id,
        title: obj.title,
      }));
      parent.setState({ services });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return(
      <ul className="menu-list">
        {this.state.services.map(service => (
          <li key={service.id}>
            <a>
              <span className="icon is-medium">
                <i className='fa fa-file' style={{color: '#ddd'}}></i>
              </span>
              {service.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default RecentlyAddedServices;
