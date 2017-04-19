import React from 'react';
import Draggable from 'react-draggable';
import FontAwesome from 'react-fontawesome';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateElement  } from '../actions'


class CorkboardElement extends React.Component {
  constructor(props){
    super(props)

  }

  onStop(){
    let div = this.refs[this.props.element.EID]
    console.log(div.getBoundingClientRect().top)
    this.props.updateElement({
      element: {
        EID: this.props.element.EID,
        x: div.getBoundingClientRect().left,
        y: div.getBoundingClientRect().top
      }
    })
  }

  resizeSticky(ref, event){
    let textarea = this.refs[ref]
    this.props.updateElement({
      element:{
        EID: this.props.element.EID,
        width: (textarea.getBoundingClientRect().width-20),
        height: textarea.getBoundingClientRect().height
      }
    })
  }

  render(){
    let stickyStyle={
      position: "absolute",
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      background: this.props.element.bgcolor,
      boxShadow: "0px 2px 2px rgba(0,0,0,0.4)",
      borderRadius: 5
    }

    let inputStyle={
      // background: "rgba(255, 255, 255, 0.3)",
      background: "none",
      outline: "none",
      border: "none",
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 0,
      paddingTop: 0,
      marginRight: 5,
      fontSize: "18px",
      width: this.props.element.width,
      height: this.props.element.height
    }

    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={{x: this.props.element.x, y: this.props.element.y}}
        grid={null}
        zIndex={0}
        onStop={this.onStop.bind(this)}>
        <div ref={this.props.element.EID} style={stickyStyle}>
          <div className="handle" style={{minHeight: 20, width: "100%"}}>
            <button className="icon-button" onClick={this.props.deleteSticky} style={{float: "left"}}>
              <FontAwesome name="close" />
            </button>
            <button className="icon-button" style={{float: "right"}}>
              <FontAwesome name="thumb-tack" />
            </button>
          </div>
          <textarea
            autoFocus
            ref={`textarea-${this.props.element.EID}`}
            style={inputStyle}
            value={this.props.element.content}
            onChange={(e) => {this.props.contentChange(e, this.props.element.EID)}}
            onMouseUp={this.resizeSticky.bind(this, `textarea-${this.props.element.EID}`)} />
        </div>
      </Draggable>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateElement: updateElement
  }, dispatch)
}

const ConnectedCorkboardElement = connect(null, mapDispatchToProps)(CorkboardElement)

export default ConnectedCorkboardElement
