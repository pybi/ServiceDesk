import React from 'react';
import axios from 'axios';
import ListServices from './ListServices';

class NewService extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      type: '',
      category: '',
      section: '',
      isActive: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.create = this.create.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateRootSections = this.updateRootSections.bind(this);
    this.flushRootSections = this.flushRootSections.bind(this);
  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  toggleModal(){
    this.setState({
      isActive: this.state.isActive === '' ? 'is-active' : ''
    });
  }

  updateRootSections(sectionId){
    if (this.selectedCheckboxes.has(sectionId)) {
      this.selectedCheckboxes.delete(sectionId);
    } else {
      this.selectedCheckboxes.add(sectionId);
    }
    console.log(this.selectedCheckboxes);
  }

  flushRootSections(){
    this.selectedCheckboxes.clear();
    console.log(this.selectedCheckboxes);
  }

  create(event){
    console.log(this.state.title);
    console.log(this.state.description);
    console.log(this.selectedCheckboxes);
    console.log(JSON.stringify(Array.from(this.selectedCheckboxes)));
    console.log("AAAAAAA");
    axios.post('/api/services/add', {
      title: this.state.title,
      description: this.state.description,
      sections: Array.from(this.selectedCheckboxes),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  render(){
    return(
      <div>
        <a className="button" onClick={this.toggleModal}>
          <span className="icon is-small">
            <i className="fa fa-plus"></i>
          </span>
          <span>Add Service</span>
        </a>
        <ListServices />
          <div className={"modal "+ this.state.isActive}>
            <div className="modal-background" onClick={this.toggleModal}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create new Service</p>
                <button className="delete" aria-label="close" onClick={this.toggleModal}></button>
              </header>
              <section className="modal-card-body">
                <form>
                  <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Title" name="title" onChange={this.handleInputChange} />
                    </div>
                    <p className="help">Enter a fitting Title here.</p>
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea className="textarea" type="text" placeholder="Description" name="description" onChange={this.handleInputChange}></textarea>
                    </div>
                    <p className="help">Enter some keywords and information about your Service.</p>
                  </div>
                  <CategoryAndSection flushRootSections={this.flushRootSections} updateRootSections={this.updateRootSections} />
               </form>
              </section>
              <footer className="modal-card-foot">
                <a className="button is-link" onClick={this.create}>Save changes</a>
                <a className="button" onClick={this.toggleModal}>Cancel</a>
              </footer>
            </div>
          </div>
      </div>
    );
  }
}

class CategoryAndSection extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      categoryId: '',
    }
    this.updateSections = this.updateSections.bind(this);
  }

  updateSections(categoryId){
    this.setState({
      categoryId: categoryId,
    });
  }

  render(){
    return(
      <div className="CategoryAndSection">
        <div className="field">
          <CategorySelector flushRootSections={this.props.flushRootSections} updateSections={this.updateSections}/>
          <SectionSelector categoryId={this.state.categoryId} updateRootSections={this.props.updateRootSections}/>
        </div>
      </div>
    );
  }
}

class SectionSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sections: [],
      selected: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(nextProps){
    var parent = this;
    axios.get('/api/sections/list/'+nextProps.categoryId)
    .then(function (res) {
      const sections = res.data.map(obj => ({id: obj._id, title: obj.title}));
      parent.setState({sections:sections})
    }).catch(function (error) {
      console.log(error);
    });
  }

  toggleCheckbox = e => {
    var sectionId = e.target.value;
    this.props.updateRootSections(sectionId);
    // if (this.selectedCheckboxes.has(sectionId)) {
    //   this.selectedCheckboxes.delete(sectionId);
    // } else {
    //   this.selectedCheckboxes.add(sectionId);
    // }
    // console.log(this.selectedCheckboxes);
  }

  handleChange(e){
    this.setState({
      selected: e.target.value
    });
  }

  render(){
    if(this.state.sections.length <= 0){
      return(
        <div className="margin10-topbottom">
          <span>There is no Section defined for this Category.</span>
        </div>
      );
    } else {
      return(
        <div className="SelectionSelector margin10-topbottom">
          <div className="control">
            <div className="columns">
              {this.state.sections.map(section => (
                <div className="column" key={section.id}>
                  <SectionCheckbox toggleCheckboxChange={this.toggleCheckbox} section={section} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

class SectionCheckbox extends React.Component {

  render(){
    return(
      <label className="checkbox">
        <input value={this.props.section.id} type="checkbox" onChange={this.props.toggleCheckboxChange} />
        <span>{this.props.section.title}</span>
      </label>
    );
  }
}

class CategorySelector extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      selected: '',
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var parent = this;
    axios.get('/api/category/list')
    .then(function (res) {
      const categories = res.data.map(obj => ({id: obj._id, title: obj.title}));
      parent.setState({ categories });
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleChange(e){
    this.props.updateSections(e.id);
    this.props.flushRootSections();
    this.setState({
      selected: e.id
    });
  }

  render(){
    return(
      <div className="CategorySelector">
        <label className="label">Category</label>
        <div className="tabs is-boxed is-centered">
          <ul>
            {this.state.categories.map(category => (
              <CategoryButtons key={category.id} value={category} onHeaderClick={this.handleChange} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class CategoryButtons extends React.Component{
  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  }

  render() {
    return (
      <li>
        <a value={this.props.value.id} onClick={this.handleClick}>
          <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
          <span>{this.props.value.title}</span>
        </a>
      </li>
    );
  }
}

export default NewService;
