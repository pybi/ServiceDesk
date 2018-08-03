import React from 'react';
import axios from 'axios';

class CategoryMenuList extends React.Component{

  constructor(props){
    super(props);
    this.state = ({
      categories: [],
    })
    this.headerClickHandler = this.headerClickHandler.bind(this);
  }

  componentDidMount(){
    var parent = this;
    axios.get('/api/category/list/')
    .then(function(res){
      const categories = res.data.map(obj => ({
        id: obj._id,
        title: obj.title,
        image: obj.image,
      }));
      parent.setState({ categories });
    })
    .catch(function(error){
      console.log(error);
    })
  }

  headerClickHandler(val){
    this.props.updateServices(val);
  }

  render(){
    if(this.state.categories.length > 0){
      return(
        <div className="tabs is-centered headList">
          <ul>
            {this.state.categories.map(category => (
              <ListCategories key={category.id} category={category} headerClickHandler={this.headerClickHandler} />
            ))}
          </ul>
        </div>
      );
    } else {
      return(
        <div className="tabs is-centered headList">
          <ul>
            <div className="errorNotification">
              <span className="icon has-text-danger">
                <i className="fa fa-exclamation-triangle"></i>
              </span>
              Keine Categorien Vorhanden!
            </div>
          </ul>
        </div>
      );
    }
  }
}

class ListCategories extends React.Component{
  constructor(props){
      super(props);
      this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    this.props.headerClickHandler(this.props.category.id)
  }

  render(){
    const category = this.props.category;
    return(
      <li key={category.id}><a onClick={this.clickHandler}>{category.title}</a></li>
    );
  }
}

export {CategoryMenuList, ListCategories};
