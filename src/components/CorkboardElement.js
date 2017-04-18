import React, {PropTypes} from 'react';
import Draggable from 'react-draggable';

const CorkboardElement = (props) => {

  return (
  <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={{x: 0, y: 0}}
    position={{x: props.element.x, y: props.element.y}}
    grid={[1, 1]}
    zIndex={100}
    onStop={props.onStop}>
    <div id={`element-${props.element.EID}`} style={{position: "absolute", padding: 0, margin: 0, top: 0, left: 0}}>
      <div className="handle" style={{minHeight: 20, padding: 10}}>
        <p onClick={props.handleClick} style={{display: "inline", marginRight: 25}}>x</p>
        HANDLE
      </div>
      <textarea value={props.element.content} onChange={(e) => {props.handleChange(e, props.element.EID)}}></textarea>
    </div>
  </Draggable>
);
}

export default CorkboardElement
