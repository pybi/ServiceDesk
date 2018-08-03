import React from 'react';
import axios from 'axios';
import NewCategory from './NewCategory.js';
import Notifications from './Notifications.js';


class Categories extends React.Component {

  render() {
    return (
      <div className="Categorys">
        <h3 className="title is-3">New Category</h3>
        <NewCategory />
        <ListCategoriesToEdit />
      </div>
    );
  }
}

class ListCategoriesToEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      notifyMessage: "",
    }
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    var parent = this;
    axios.get('/api/category/list')
    .then(function (res) {
      const categories = res.data.map(obj => ({id: obj._id, title: obj.title, image: obj.image, type:obj.type}));
      parent.setState({ categories });
    }).catch(function (error) {
      console.log(error);
    });
  }

  remove(id){
    this.setState({
    	categories: this.state.categories.filter((el) => id !== el.id)
    })
  }

  render(){
    return(
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.categories.map(category => (
              <tr key={category.id}>
                <td>{category.title}</td>
                <td>{category.image}</td>
                <td>{category.type}</td>
                <td>
                  <p className="buttons">
                    <a className="button is-info is-outlined">
                      <span className="icon is-small">
                        <i className="fa fa-pencil-alt"></i>
                      </span>
                      <span>Edit</span>
                    </a>
                    <DeleteCategory categoryKey={category.id} remove={this.remove} />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Notifications message={this.state.notifyMessage} />
      </div>
    );
  }
}

class DeleteCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
    }
    this.delete = this.delete.bind(this);
  }

  delete(id){
    console.log(this.props.categoryKey);
    this.props.remove(this.props.categoryKey);
    axios.post('/api/category/delete', {
      id: this.props.categoryKey,
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
      <a className="button is-danger is-outlined" onClick={this.delete}>
        <span>Delete</span>
        <span className="icon is-small">
          <i className="fa fa-times"></i>
        </span>
      </a>
    );
  }
}

export default Categories;
