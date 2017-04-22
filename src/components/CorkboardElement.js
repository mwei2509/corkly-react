import React from 'react';
import Draggable from 'react-draggable';
import FontAwesome from 'react-fontawesome';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateElement  } from '../actions'
import {CirclePicker} from 'react-color'
import Dropzone from 'react-dropzone'


class CorkboardElement extends React.Component {
  constructor(props){
    super(props)
    this.state={
      colorOn: false,
      imageOn: false
    }
  }

  onStop(){
    let div = this.refs[this.props.element.EID]
    console.log(div.getBoundingClientRect().top)
    this.props.updateElement({
      element: {
        EID: this.props.element.EID,
        x: div.getBoundingClientRect().left,
        y: div.getBoundingClientRect().top,
      }
    })
  }

  onStart(){
    this.props.updateElement({
      element:{
        EID: this.props.element.EID,
        zIndex: Math.max.apply(Math, this.props.corkboardElements.map((el) => el.zIndex)) + 1
      }
    })
  }

  onFocus(e){
    this.props.updateElement({
      element:{
        EID: this.props.element.EID,
        zIndex: Math.max.apply(Math, this.props.corkboardElements.map((el) => el.zIndex)) + 1
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

  toggleThing(field){
    this.setState({
      [field]: !this.state[field]
    })
  }

  onDrop(files){
    var self = this
    var file = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload=()=>{
      self.props.updateElement({
        element:{
          EID: self.props.element.EID,
          is_image: true,
          image_blob: reader.result
        }
      })
    }
    this.setState({
      imageOn: false
    })
}

  onOpenClick(){
    this.refs.dropzone.open()
  }

  pickColor(color){
    console.log(color)
    this.props.updateElement({
      element:{
        EID: this.props.element.EID,
        bgcolor: color.hex
      }
    })
    this.setState({
      colorOn: false
    })
  }
  render(){
    let {width, height} = this.props.element

    let elementwidth = (typeof width === "string") ? parseInt(width.slice(0,-2))+20 : width+20
    let elementheight = (typeof height === "string") ? parseInt(height.slice(0,-2)) : height
    console.log(elementwidth)
    const colorPicker=(
      <div style={{position: "absolute", left: 50, top: -50}}>
        <CirclePicker
          width={100}
          circleSize={15}
          disableAlpha={true}
          colors={["#f44336", "#e91e63", "#9c27b0",
            "#03a9f4", "#009688", "#4caf50",
            "#8bc34a", "#cddc39", "#ffeb3b",
            "#ffc107", "#ff9800", "#ff5722"]}
          onChange={ this.pickColor.bind(this) }
         />
      </div>
    )
    let stickyStyle={
      position: "absolute",
      top: 0,
      left: 0,
      margin: 0,
      padding: "0 !important",
      background: this.props.element.bgcolor,
      boxShadow: "0px 2px 2px rgba(0,0,0,0.4)",
      borderRadius: 5,
      zIndex: this.props.zIndex
    }

    let inputStyle={
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

    let dropzoneStyle={
      position: "absolute",
      background: "rgba(255,255,255,0.3)",
      outline: "none",
      border: "1px dashed #000",
      margin: 5,
      padding: 5,
      width: elementwidth-17,
      height: elementheight-25,
      marginBottom: 10
    }

    const imageForm=<Dropzone style={{}} accept="image/jpeg, image/jpg, image/png, image/gif"
        ref="dropzone" onDrop={this.onDrop.bind(this)} >
        <div style={dropzoneStyle}
          onMouseUp={this.resizeSticky.bind(this, `textarea-${this.props.element.EID}`)}>
          <span style={{fontSize: 12}}>Drag and drop (or click to upload) photos to this sticky</span><br />
        </div>
      </Dropzone>
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={{x: this.props.element.x, y: this.props.element.y}}
        grid={null}
        zIndex={1}
        onStop={this.onStop.bind(this)}
        onStart={this.onStart.bind(this)}>
        <div ref={this.props.element.EID} style={stickyStyle}>
          <div className="handle" style={{minHeight: 20, width: "100%"}}>
            <button className="icon-button" onClick={this.props.deleteSticky} style={{float: "left"}}>
              <FontAwesome name="close" />
            </button>

            <button className="icon-button" style={{float: "right"}}>
              <FontAwesome name="thumb-tack" />
            </button>

            <button className="icon-button" onClick={this.toggleThing.bind(this, "imageOn")} style={{float: "right"}}>
              <FontAwesome name="image" />
            </button>

            <button className="icon-button" onClick={this.toggleThing.bind(this, "colorOn")} style={{float: "right"}}>
              <FontAwesome name="paint-brush" />
            </button>
          </div>
          {this.state.colorOn ? colorPicker : null}
          {this.state.imageOn ? imageForm : null}
          {(!this.state.imageOn && this.props.element.is_image) ? <img src={this.props.element.image_blob}
              style={{width: elementwidth+20}} className="postit-image" /> : <textarea
                  autoFocus
                  onFocus={this.onFocus.bind(this)}
                  ref={`textarea-${this.props.element.EID}`}
                  style={inputStyle}
                  value={this.state.imageOn ? "": this.props.element.content}
                  onChange={(e) => {this.props.contentChange(e, this.props.element.EID)}}
                  onMouseUp={this.resizeSticky.bind(this, `textarea-${this.props.element.EID}`)} />}

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

const mapStateToProps = (state) => {
  return ({
    corkboardElements: state.board.boardElements
  })
}

const ConnectedCorkboardElement = connect(mapStateToProps, mapDispatchToProps)(CorkboardElement)

export default ConnectedCorkboardElement
