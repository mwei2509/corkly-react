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
          <div style={elementStyle} className="boardElement">
            {props.content}
          </div>
  );
}

export default CorkboardElement
