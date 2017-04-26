import React from 'react';
import corkboardImage from '../imgs/corkboard.jpg'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addError } from '../actions'

import FontAwesome from 'react-fontawesome';

class About extends React.Component {
  constructor(){
    super()
    this.state={
      holt: false,
      jeff: false,
      melissa: false,
      corkly: false
    }
  }

  handleHover(field, event){
    console.log(field)
    this.setState({
      [field]: !this.state[field]
    })
  }

  message(){
    this.props.addError("Thanks for visiting Corkly!")
    setTimeout(()=>{this.props.addError("")}, 2000)
  }

  render() {
    const corkboardStyle={
      background: `url(${corkboardImage})`,
    }

    const operations=<div style={{minHeight: 20, width: "100%"}}>
      <button className="icon-button" style={{float: "left"}} onClick={this.message.bind(this)}>
        <FontAwesome name="close" />
      </button>

      <button className="icon-button" style={{float: "right"}} onClick={this.message.bind(this)}>
        <FontAwesome name="thumb-tack" />
      </button>

      <button className="icon-button" style={{float: "right"}} onClick={this.message.bind(this)}>
        <FontAwesome name="image" />
      </button>

      <button className="icon-button" style={{float: "right"}} onClick={this.message.bind(this)}>
        <FontAwesome name="paint-brush" />
      </button>
    </div>

    return (
      <div style={corkboardStyle} className="corkboard-container">
      <input
        className="title-text"
        type="text" value="About Corkly"
        />
      <div onMouseEnter={this.handleHover.bind(this, "corkly")} onMouseLeave={this.handleHover.bind(this, "corkly")} className="about-sticky" style={{width: 500, height: 400}}>
        {operations}
        {this.state.corkly ? <span>Corkly is a place for fun, productivity, and sharing ideas. Place a sticky, import images, make collaboration easy!</span> : <img src="https://i.imgur.com/RrHf6rL.png" style={{width: 500}} className="postit-image" />}
      </div>
      <div onMouseEnter={this.handleHover.bind(this, "holt")} onMouseLeave={this.handleHover.bind(this, "holt")} className="about-sticky" style={{position: "absolute", top: "50%", left: "20%", zIndex: 1, background: "#ff9800"}}>
        {operations}
        {this.state.holt ? <span>Holt enjoys writing code, dancing, and the weird things in life</span> : <img src="https://i.imgur.com/l4IHDh3.png" className="postit-image" />}
      </div>
      <div onMouseEnter={this.handleHover.bind(this, "melissa")} onMouseLeave={this.handleHover.bind(this, "melissa")} className="about-sticky" style={{position: "absolute", top: "60%", left: "40%", zIndex: 2, background: "#9c27b0"}}>
        {operations}
        {this.state.melissa ? <span>Her? Is she funny?</span> : <img src="https://i.imgur.com/zE4cGfn.jpg" className="postit-image" />}
      </div>
      <div onMouseEnter={this.handleHover.bind(this, "jeff")} onMouseLeave={this.handleHover.bind(this, "jeff")} className="about-sticky" style={{position: "absolute", top: "50%", left: "60%", background: "#4caf50", zIndex: 1}}>
        {operations}
        {this.state.jeff ? <span>Jeff loves coding, writing music, and the normal thing in life.</span> : <img src="https://i.imgur.com/sStyVGj.png" className="postit-image" />}
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addError: addError
  }, dispatch)
}

const ConnectedAbout = connect(null, mapDispatchToProps)(About)

export default ConnectedAbout
