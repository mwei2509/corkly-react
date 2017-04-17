import React, {PropTypes} from 'react';
import corkboardImage from '../imgs/corkboard.jpg'
import CorkboardElement from './CorkboardElement'

export default class Corkboard extends React.Component {

  render() {
    const corkboardStyle={
      width: "100vw",
      height: "100vh",
      background: `url(${corkboardImage})`
    }
    return (
      <div style={corkboardStyle} className="corkboard-container">
        <h1>I am a cockbard. Love me. Or not. It's up to you</h1>
        
      </div>
    );
  }
}
