import React from 'react';
import Draggable from 'react-draggable';
import FontAwesome from 'react-fontawesome';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateElement  } from '../actions'
import {CirclePicker} from 'react-color'
import Dropzone from 'react-dropzone'


class PublicCorkboardElement extends React.Component {

  render(){
    let {width, height} = this.props.element

    let elementwidth = (typeof width === "string") ? parseInt(width.slice(0,-2))+20 : width+20
    let elementheight = (typeof height === "string") ? parseInt(height.slice(0,-2)) : height
    console.log(elementwidth)

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

    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={{x: this.props.element.x, y: this.props.element.y}}
        grid={null}
        zIndex={1}>
        <div ref={this.props.element.EID} style={stickyStyle}>
          <div style={{minHeight: 20, width: "100%"}}>
            <button className="icon-button" style={{float: "left"}}>
              <FontAwesome name="close" />
            </button>

            <button className="icon-button" style={{float: "right"}}>
              <FontAwesome name="thumb-tack" />
            </button>

            <button className="icon-button" style={{float: "right"}}>
              <FontAwesome name="image" />
            </button>

            <button className="icon-button" style={{float: "right"}}>
              <FontAwesome name="paint-brush" />
            </button>
          </div>
          {this.props.element.is_image ? <img src={this.props.element.image_blob}
              style={{width: elementwidth+20}} className="postit-image" /> : <textarea
                  ref={`textarea-${this.props.element.EID}`}
                  style={inputStyle}
                  value={this.props.element.content} />}

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

const ConnectedPublicCorkboardElement = connect(mapStateToProps, mapDispatchToProps)(PublicCorkboardElement)

export default ConnectedPublicCorkboardElement
