import React, {PropTypes} from 'react';
import corkboardImage from '../imgs/corkboard.jpg'
import CorkboardElement from './CorkboardElement'
import TextBox from './TextBox'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addBoardElement, updateElement } from '../actions'

class Corkboard extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onStop = this.onStop.bind(this)
  }

  handleClick(e){
    this.props.addBoardElement({x: e.clientX, y: e.clientY, content: "Butts", id: this.props.boardElements.length})
  }

  handleChange(e, id){
    this.props.updateElement({element: {id: id, content: e.target.value}})
  }

  onStop(e, id){
    // let div = this.refs[id]
    // debugger
    let div = document.getElementById(`element-${id}`)

    this.props.updateElement({element: {id: id, x: div.getBoundingClientRect().left, y: div.getBoundingClientRect().top}})
  }

  render() {

    let showElements = this.props.boardElements.map((element) => {
        return <CorkboardElement key={element.id} element={element} onStop={(e) => this.onStop(e, element.id)} handleChange={this.handleChange} />
    })

    const corkboardStyle={
      width: "100vw",
      height: "100vh",
      position: "relative",
      top: 0,
      bottom: 0,
      margin: 0,
      padding: 0,
      background: `url(${corkboardImage})`,
      overflow: 'hidden',
      userSelect: 'none'
    }
    return (
      <div onDoubleClick={this.handleClick} style={corkboardStyle} className="corkboard-container">
        {showElements}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    boardElements: state.board.boardElements
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addBoardElement: addBoardElement,
    updateElement: updateElement
  }, dispatch)
}

const ConnectedCorkboard = connect(mapStateToProps, mapDispatchToProps)(Corkboard)

export default ConnectedCorkboard
