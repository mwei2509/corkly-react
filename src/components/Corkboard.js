import React, {PropTypes} from 'react';
import corkboardImage from '../imgs/corkboard.jpg'
import CorkboardElement from './CorkboardElement'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addBoardElement } from '../actions'

class Corkboard extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    this.props.addBoardElement({x: e.clientX, y: e.clientY, content: "Butts"})
  }

  render() {
    const corkboardStyle={
      width: "100vw",
      height: "100vh",
      background: `url(${corkboardImage})`
    }
    return (
      <div onDoubleClick={this.handleClick} style={corkboardStyle} className="corkboard-container">
        <h1>I am a cockbard. Love me. Or not. It's up to you</h1>
        {this.props.boardElements.map((element) => {return <CorkboardElement/>})}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    boardElements: state.boardElements
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addBoardElement: addBoardElement
  }, dispatch)
}

const ConnectedCorkboard = connect(mapStateToProps, mapDispatchToProps)(Corkboard)

export default ConnectedCorkboard
