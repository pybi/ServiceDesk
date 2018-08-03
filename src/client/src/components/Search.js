import React from 'react';

class SearchBanner extends React.Component{

  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    this.props.updateSearchContent(value);
  }

  render(){
    return(
      <section className="hero is-medium ServiceDeskHeaderImg">
        <div className="hero-body">
          <div className="container is-medium small-width">
            <h1 className="title white">Some Awesome Title!</h1>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-medium" type="email" placeholder="Search ..." onChange={this.handleInputChange} />
              <span className="icon is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SearchBanner;
