import React, {PropTypes} from 'react';
import corkboardImage from '../imgs/corkboard.jpg'
import CorkboardElement from './CorkboardElement'
import TextBox from './TextBox'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addBoardElement, updateElement, createBoard, deleteElement, updateBoard } from '../actions'


class Corkboard extends React.Component {
  constructor(){
    super()
    this.handleElementClick = this.handleElementClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onStop = this.onStop.bind(this)
    this.createBoard = this.createBoard.bind(this)
    this.saveBoard = this.saveBoard.bind(this)

    this.state={
      boardTitle: ''
    }
  }

  handleElementClick(EID){
    this.props.deleteElement(EID)
  }

  handleClick(e){
    const max = this.props.boardElements.reduce(function(prev, current) {
    return (prev.EID > current.EID) ? prev.EID : current.EID
  }, 0)
    console.log(max+1)
    this.props.addBoardElement({x: e.clientX, y: e.clientY, content: "Butts", EID: (max+1)})
  }

  handleChange(e, EID){
    this.props.updateElement({element: {EID: EID, content: e.target.value}})
  }

  titleChange(event){
    this.setState({
      boardTitle: event.target.value
    })
  }
  createBoard(event){
    event.preventDefault()
    this.props.createBoard({board: {title: this.state.boardTitle, elements_attributes: this.props.boardElements, id: this.props.boardId}})
    this.setState({
      boardTitle: ''
    })
  }

  saveBoard(){
    this.props.updateBoard({board: {id: this.props.boardId, boardElements: this.props.boardElements}})
  }

  onStop(e, EID){
    let div = document.getElementById(`element-${EID}`)
    this.props.updateElement({element: {EID: EID, x: div.getBoundingClientRect().left, y: div.getBoundingClientRect().top}})
  }

  render() {

    let showElements = this.props.boardElements.map((element) => {
        return <CorkboardElement key={element.EID} element={element} onStop={(e) => this.onStop(e, element.EID)} handleClick={() => this.handleElementClick(element.EID)} handleChange={this.handleChange} />
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
        <form onSubmit={this.createBoard}>
          Title: <input type="text" value={this.state.boardTitle} onChange={this.titleChange.bind(this)}/>
          <button type="submit">Create Board</button>
        </form>
        <button onClick={this.saveBoard}>Save Bard</button>
        {showElements}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    boardElements: state.board.boardElements,
    boardId: state.board.boardId
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addBoardElement: addBoardElement,
    updateElement: updateElement,
    createBoard: createBoard,
    deleteElement: deleteElement,
    updateBoard: updateBoard
  }, dispatch)
}

const ConnectedCorkboard = connect(mapStateToProps, mapDispatchToProps)(Corkboard)

export default ConnectedCorkboard
