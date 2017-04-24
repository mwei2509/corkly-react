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
      melissa: false
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
      width: "100vw",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      padding: 0,
      margin: 0,
      background: `url(${corkboardImage})`,
      overflow: 'hidden',
      userSelect: 'none',
      zIndex: -1
    }

    let stickyStyle={
      width: 500,
      margin: "auto",
      marginTop: 25,
      padding: "0 !important",
      background: "#03a9f4",
      boxShadow: "0px 2px 2px rgba(0,0,0,0.4)",
      borderRadius: 5
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
        style={{
          fontSize: "30px",
          background: "none",
          border: "none",
          outline: "none",
          color: "#fff",
          borderBottom: "2px solid #000",
          fontFamily: "Lobster",
          textShadow: "1px 1px 1px #000",
          textAlign: "center",
          position: "relative",
          zIndex: "1000"
        }}
        className="title-text"
        type="text" value="About Corkly"
        />
        <div style={stickyStyle}>
          {operations}
          <img src="https://i.imgur.com/RrHf6rL.png" style={{width: 500}} className="postit-image" />
      </div>
      <div onMouseEnter={this.handleHover.bind(this, "holt")} onMouseLeave={this.handleHover.bind(this, "holt")} style={{...stickyStyle, position: "absolute", top: 350, left: 400, zIndex: 1, background: "#ff9800", height: 250, width: 250}}>
        {operations}
        {this.state.holt ? <span style={{padding: 10, fontSize: 20}}>Holt enjoys writing code, dancing, and the weird things in life</span> : <img src="https://i.imgur.com/l4IHDh3.png" style={{width: 250, height: 230}} className="postit-image" />}
      </div>
      <div onMouseEnter={this.handleHover.bind(this, "melissa")} onMouseLeave={this.handleHover.bind(this, "melissa")} style={{...stickyStyle, position: "absolute", top: 400, left: 620, zIndex: 2, background: "#9c27b0", height: 250, width: 250}}>
        {operations}
        {this.state.melissa ? <span style={{padding: 10, fontSize: 20}}>Her?  Is she funny?</span> : <img src="https://i.imgur.com/zE4cGfn.jpg" style={{width: 250, height: 230}} className="postit-image" />}
      </div>
      <div onMouseEnter={this.handleHover.bind(this, "jeff")} onMouseLeave={this.handleHover.bind(this, "jeff")} style={{...stickyStyle, position: "absolute", top: 300, left: 850, background: "#4caf50", height: 250, width: 250}}>
        {operations}
        {this.state.jeff ? <span style={{padding: 10, fontSize: 20}}>Jeff loves coding, writing music, and the normal thing in life.</span> : <img src="https://i.imgur.com/sStyVGj.png" style={{width: 250, height: 230}} className="postit-image" />}
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
