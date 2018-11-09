import React from 'react';
import axios from 'axios';

class NewCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      image: '',
      type: '',
      isActive: '',
      message:'',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.create = this.create.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  create(event){
    this.toggleModal();
    event.preventDefault();
    axios.post('/api/category/add', {
      title: this.state.title,
      image: this.state.image,
      type: this.state.type,
    })
    .then(function (response) {
      console.log(response);
      if(response.data.msg === "success"){
        console.log("Created");
      }
    })
    .catch(function (error) {
      console.log("Error - "+error);
    });
  }

  render(){
    return(
      <div>
        <a className="button" onClick={this.toggleModal}>Create Category</a>
          <div className={"modal "+ this.state.isActive}>
            <div className="modal-background" onClick={this.toggleModal}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create new Category</p>
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
                    <label className="label">Image</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Description" name="image" onChange={this.handleInputChange} />
                    </div>
                    <p className="help">Path to Image.</p>
                  </div>
                  <div className="field">
                    <label className="label">Type</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Type" name="type" onChange={this.handleInputChange} />
                    </div>
                    <p className="help">Enter a Type here.</p>
                  </div>
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

export default NewCategory;
