import React, {PropTypes} from 'react';
import Draggable from 'react-draggable';

const CorkboardElement = (props) => {
  const elementStyle = {
    color: "#fff",
    position: "absolute",
    left: props.posX,
    top: props.posY
  }
  return (
  <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={{x: 0, y: 0}}
    position={{x: 200, y: 200}}
    grid={[1, 1]}
    zIndex={100}>
    <div>
      <div className="handle">Drag from here</div>
      <div>This readme is really dragging on...</div>
    </div>
  </Draggable>
);
}

export default CorkboardElement
