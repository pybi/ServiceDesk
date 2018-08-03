import React from 'react';

class ColorPicker extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedColor: "",
      rows: "3",
      allColors: ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#f1c40f','#e67e22','#e74c3c','#c0392b' ],
    }
    this.colorChanger = this.colorChanger.bind(this);
  }

  colorChanger(color){
    this.setState({
      selectedColor:color,
    });
    this.props.updateColor(color);
  }

  render(){
    return(
      <div>
        <div className="dropdown is-hoverable">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span className="icon is-medium" style={{color: this.state.selectedColor}}>
                <i className="fa fa-circle"></i>
              </span>
              <span>Select Color</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu4" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <div className="columns">
                  {this.state.allColors.map(color => (
                    <ListColors key={color} color={color} headerClickHandler={this.colorChanger} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ListColors extends React.Component{
  constructor(props){
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(){
    this.props.headerClickHandler(this.props.color);
  }
  render(){
    return(
      <div className="column">
        <div className="pickerColor" onClick={this.clickHandler} value={this.props.color} style={{background: this.props.color}}></div>
      </div>
    );
  }
}

export default ColorPicker;
