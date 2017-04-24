import React from 'react';
import corkboardImage from '../imgs/corkboard.jpg'

class About extends React.Component {

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

    return (
      <div style={corkboardStyle} className="corkboard-container">
        
          ABOUT PAGE WHAT
      </div>
    );
  }
}


export default About
