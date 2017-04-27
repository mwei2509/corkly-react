import React from 'react';
import corkboardImage from '../imgs/corkboard.jpg'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addError } from '../actions'
import FlipCard from 'react-flipcard';

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

  handleClick(card){
    this.setState({
      [card]: !this.state[card]
    })
  }

  message(){
    this.props.addError("Thanks for visiting Corkly!")
    setTimeout(()=>{this.props.addError("")}, 2000)
  }

  handleLink(e){
    e.stopPropagation()
  }

  render() {
    const corkboardStyle={
      background: `url(${corkboardImage})`,
    }

    const operations=<div style={{minHeight: 20, width: "100%"}}>
      <button className="icon-button" style={{float: "left"}} onClick={this.message.bind(this)}>
        <FontAwesome name="close" />
      </button>
      <span className="click-to-flip">Click to Flip</span>
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

    const operationsMain=<div style={{minHeight: 20, width: "100%"}}>
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
          {operationsMain}
          {this.state.corkly ? <span>Corkly is a place for fun, productivity, and sharing ideas. Place a sticky, import images, make collaboration easy!</span> : <img src="https://i.imgur.com/RrHf6rL.png" style={{width: 500}} className="postit-image" />}
          <div className="socialIcons">
            <a target="_blank" onClick={this.handleLink.bind(this)} href="https://github.com/mwei2509/corkly-react"><FontAwesome className="iconItem" name="github" size="2x"/></a>
            <a target="_blank" onClick={this.handleLink.bind(this)} href="https://github.com/jef4490/corklyapi"><FontAwesome className="iconItem" name="github" size="2x"/></a>
          </div>
        </div>

        <div id="melissa-flipcard" style={{position: "absolute", top: "50%", left: "20%"}}>
          <FlipCard
            disabled={true}
            flipped={this.state.holt}
            onFlip={this.handleOnFlip}>
            <div className="about-sticky" onClick={this.handleClick.bind(this, "holt")} style={{zIndex: 1, background: "#ff9800"}}>
              {operations}
              <div id="holt-img" className="postit-image"></div>
            </div>
            <div className="about-sticky" onClick={this.handleClick.bind(this, "holt")} style={{zIndex: 1, background: "#ff9800"}}>
              {operations}
              <div className="about-author-text">
                <span>Holt enjoys writing code, dancing, and the weird things in life</span>
              </div>
              <div className="socialIcons">
                <a target="_blank" onClick={this.handleLink.bind(this)} href="https://github.com/hwalborn"><FontAwesome className="iconItem" name="github" size="2x"/></a>
                <a target="_blank" onClick={this.handleLink.bind(this)} href="https://www.linkedin.com/in/holt-walborn-666183129/"><FontAwesome className="iconItem" name="linkedin" size="2x"/></a>
              </div>
            </div>
          </FlipCard>
        </div>

      <div id="melissa-flipcard" style={{position: "absolute", top: "50%", left: "40%"}}>
        <FlipCard
          disabled={true}
          flipped={this.state.melissa}
          onFlip={this.handleOnFlip}>
          <div className="about-sticky" onClick={this.handleClick.bind(this, "melissa")} style={{zIndex: 1, background: "#9c27b0"}}>
            {operations}
            <div id="melissa-img" className="postit-image"></div>
          </div>
          <div className="about-sticky" onClick={this.handleClick.bind(this, "melissa")} style={{zIndex: 1, background: "#9c27b0"}}>
            {operations}
            <div className="about-author-text">
              <span>Her? Is she funny?</span>
            </div>
            <div className="socialIcons">
              <a target="_blank" onClick={this.handleLink.bind(this)} href="https://github.com/mwei2509"><FontAwesome className="iconItem" name="github" size="2x"/></a>
              <a target="_blank" onClick={this.handleLink.bind(this)} href="https://www.linkedin.com/in/melissa-wei"><FontAwesome className="iconItem" name="linkedin" size="2x"/></a>
            </div>
          </div>
        </FlipCard>
      </div>


      <div id="jeff-flipcard" style={{position: "absolute", top: "50%", left: "60%"}}>
        <FlipCard
          disabled={true}
          flipped={this.state.jeff}
          onFlip={this.handleOnFlip}>
          <div className="about-sticky" onClick={this.handleClick.bind(this, "jeff")} style={{zIndex: 1, background: "#4caf50"}}>
            {operations}
            <div id="jeff-img" className="postit-image"></div>
          </div>
          <div className="about-sticky" onClick={this.handleClick.bind(this, "jeff")} style={{zIndex: 1, background: "#4caf50"}}>
            {operations}
            <div className="about-author-text">
              <span>Jeff loves coding, writing music, and the normal things in life.</span>
            </div>
            <div className="socialIcons">
              <a target="_blank" onClick={this.handleLink.bind(this)} href="https://github.com/jef4490"><FontAwesome className="iconItem" name="github" size="2x"/></a>
              <a target="_blank" onClick={this.handleLink.bind(this)} href="https://www.linkedin.com/in/jeffrey-hechler"><FontAwesome className="iconItem" name="linkedin" size="2x"/></a>
            </div>
          </div>
        </FlipCard>
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
