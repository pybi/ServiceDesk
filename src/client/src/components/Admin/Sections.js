import React from 'react';
import axios from 'axios';
import ColorPicker from './ColorPicker.js';

class Sections extends React.Component {

  render() {
    return (
      <div className="Sections">
        <NewSection />
        <ListSectionsToEdit />
      </div>
    );
  }
}

class ListSectionsToEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sections: [],
    }
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    var parent = this;
    axios.get('/api/sections/list')
    .then(function (res) {
      const sections = res.data.map(obj => ({
        id: obj._id, title: obj.title,
        color: obj.color,
        icon:obj.icon,
        labels:obj.labels,
        category:obj.category
      }));
      parent.setState({ sections });
    }).catch(function (error) {
      console.log(error);
    });
  }

  remove(id){
    this.setState({
    	sections: this.state.sections.filter((el) => id !== el.id)
    })
  }

  getCategoryTitle(section){
    if(section.category){
      return section.category.title;
    } else {
      return 'DELETED';
    }

  }

  render(){
    return(
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Title</th>
            <th>Color</th>
            <th>Icon</th>
            <th>Labels</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.sections.map(section => (
            <tr key={section.id}>
              <td>{section.title}</td>
              <td>
                <span className="icon">
                  <i className="fa fa-circle" style={{color: section.color}}></i>
                </span>
                {section.color}</td>
              <td>{section.icon}</td>
              <td><span className="tag is-info">{section.labels}</span></td>
              <td>{this.getCategoryTitle(section)}</td>
              <td>
                <p className="buttons">
                  <a className="button is-info is-outlined">
                    <span className="icon is-small">
                      <i className="fa fa-pencil-alt"></i>
                    </span>
                    <span>Edit</span>
                  </a>
                  <DeleteSection sectionKey={section.id} remove={this.remove} />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class DeleteSection extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
    }
    this.delete = this.delete.bind(this);
  }

  delete(id){
    this.props.remove(this.props.sectionKey);
    axios.post('/api/sections/delete', {
      id: this.props.sectionKey,
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

class NewSection extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      icon: '',
      color: '',
      labels: '',
      category: '',
      isActive: '',
      categories: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createSection = this.createSection.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }

  componentDidMount(){
    this.getCategories();
  }

  toggleModal(){
    this.setState({
      isActive: this.state.isActive === '' ? 'is-active' : ''
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  updateColor(color){
    console.log(color);
    this.setState({
      color: color,
    });
  }

  getCategories(){
    var parent = this;
    axios.get('/api/category/list')
    .then(function (res) {
      const categories = res.data.map(obj => ({id: obj._id, title: obj.title}));
      parent.setState({ categories });
    }).catch(function (error) {
      console.log(error);
    });
  }

  createSection(event){
    axios.post('/api/sections/add', {
      title: this.state.title,
      icon: this.state.icon,
      color: this.state.color,
      labels: this.state.labels,
      category: this.state.category,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
    this.toggleModal();
  }

  render(){
    return(
      <div className="NewSection">
        <h3 className="title is-3">New Section</h3>
        <p className="buttons">
          <a className="button is-outlined" onClick={this.toggleModal}>
            <span className="icon is-small">
              <i className="fa fa-plus"></i>
            </span>
            <span>Add Section</span>
          </a>
        </p>

        <div className={"modal "+ this.state.isActive}>
          <div className="modal-background" onClick={this.toggleModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Create new Section</p>
              <button className="delete" aria-label="close" onClick={this.toggleModal}></button>
            </header>
            <section className="modal-card-body">
              <form>
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">Title</label>
                      <div className="control">
                        <input className="input" type="text" placeholder="Title" name="title" onChange={this.handleInputChange} />
                      </div>
                      <p className="help">Enter a fitting Title here.</p>
                    </div>
                  </div>
                  <div className="column is-one-third">
                    <div className="field">
                      <label className="label">Category</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select name="category" onChange={this.handleInputChange}>
                            {this.state.categories.map(category => (
                              <option value={category.id} key={category.id}>{category.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <p className="help">Category ID</p>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">Icon</label>
                      <div className="control">
                        <input className="input" type="text" placeholder="Title" name="icon" onChange={this.handleInputChange} />
                      </div>
                      <p className="help">Choose from free Fontawesome Icons: <a target="_blank" rel="noopener noreferrer" href="https://fontawesome.com/icons">fontawesome.com</a></p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Color</label>
                      <ColorPicker updateColor={this.updateColor} />
                      <p className="help">Enter a Type here.</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Labels</label>
                      <div className="control">
                        <input className="input" type="text" placeholder="Type" name="labels" onChange={this.handleInputChange} />
                      </div>
                      <p className="help">Enter a Label here.</p>
                    </div>
                  </div>
                </div>
             </form>
            </section>
            <footer className="modal-card-foot">
              <a className="button is-link" onClick={this.createSection}>Save changes</a>
              <a className="button" onClick={this.toggleModal}>Cancel</a>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Sections;
