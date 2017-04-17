import React, {PropTypes} from 'react';
import Draggable from 'react-draggable';

const CorkboardElement = (props) => {

  return (
  <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={{x: 0, y: 0}}
    position={null}
    grid={[1, 1]}
    zIndex={100}>
    <div style={{position: "absolute", top: props.element.y, left: props.element.x}}>
      <div className="handle">
        <textarea value={props.element.content} onChange={(e) => {props.handleChange(e, props.element.id)}}></textarea>
      </div>
    </div>
  </Draggable>
);
}

export default CorkboardElement
