import React from 'react';
import axios from 'axios';

class ListServices extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      services: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.listServices = this.listServices.bind(this);
  }

  componentDidMount() {
    this.listServices();
  }

  listServices(){
    var parent = this;
    axios.get('/api/services/list/')
    .then(function (res) {
      const services = res.data.map(obj => ({
        id: obj._id,
        title: obj.title,
        description: obj.icon
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
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  }
}

export default ListServices;
